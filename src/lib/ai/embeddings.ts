/**
 * Embedding Generation & Similarity Search
 *
 * Generates vector embeddings for text content and searches for similar
 * insights using cosine similarity via Supabase's pgvector extension.
 */

import { createClient, SupabaseClient } from "@supabase/supabase-js";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const EMBEDDING_MODEL = "text-embedding-ada-002";
const EMBEDDING_DIMENSIONS = 1536;
const OPENAI_EMBEDDINGS_URL = "https://api.openai.com/v1/embeddings";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface EmbeddingResult {
  embedding: number[];
  model: string;
  tokenCount: number;
}

export interface SimilarInsight {
  id: string;
  content: string;
  similarity: number;
  metadata: Record<string, unknown>;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Supabase Client
// ---------------------------------------------------------------------------

let _supabase: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      throw new Error(
        "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables",
      );
    }

    _supabase = createClient(url, key);
  }
  return _supabase;
}

// ---------------------------------------------------------------------------
// generateEmbedding
// ---------------------------------------------------------------------------

/**
 * Generate a vector embedding for the given text using OpenAI's ada-002 model.
 *
 * @param text  The text to embed (will be truncated if too long)
 * @returns     The embedding vector and metadata
 */
export async function generateEmbedding(
  text: string,
): Promise<EmbeddingResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY environment variable");
  }

  // Truncate very long texts to stay within token limits (~8191 tokens for ada-002)
  const truncated = text.length > 30000 ? text.slice(0, 30000) : text;

  const response = await fetch(OPENAI_EMBEDDINGS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: EMBEDDING_MODEL,
      input: truncated,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI embeddings API error (${response.status}): ${error}`);
  }

  const data = (await response.json()) as {
    data: Array<{ embedding: number[] }>;
    usage: { prompt_tokens: number; total_tokens: number };
  };

  return {
    embedding: data.data[0].embedding,
    model: EMBEDDING_MODEL,
    tokenCount: data.usage.total_tokens,
  };
}

// ---------------------------------------------------------------------------
// searchSimilar
// ---------------------------------------------------------------------------

/**
 * Search for insights similar to the query using cosine similarity.
 * Relies on a Supabase RPC function `match_insights` backed by pgvector.
 *
 * Expected Supabase function signature:
 * ```sql
 * CREATE OR REPLACE FUNCTION match_insights(
 *   query_embedding vector(1536),
 *   match_threshold float DEFAULT 0.7,
 *   match_count int DEFAULT 10
 * ) RETURNS TABLE (
 *   id uuid,
 *   content text,
 *   similarity float,
 *   metadata jsonb,
 *   created_at timestamptz
 * )
 * ```
 *
 * @param query  The search query text
 * @param limit  Maximum number of results to return (default 10)
 * @param threshold  Minimum similarity score (default 0.7)
 */
export async function searchSimilar(
  query: string,
  limit: number = 10,
  threshold: number = 0.7,
): Promise<SimilarInsight[]> {
  // Generate embedding for the query
  const { embedding } = await generateEmbedding(query);

  const supabase = getSupabaseClient();

  const { data, error } = await supabase.rpc("match_insights", {
    query_embedding: embedding,
    match_threshold: threshold,
    match_count: limit,
  });

  if (error) {
    throw new Error(`Supabase similarity search failed: ${error.message}`);
  }

  return (data ?? []).map(
    (row: {
      id: string;
      content: string;
      similarity: number;
      metadata: Record<string, unknown>;
      created_at: string;
    }) => ({
      id: row.id,
      content: row.content,
      similarity: row.similarity,
      metadata: row.metadata ?? {},
      createdAt: row.created_at,
    }),
  );
}

// ---------------------------------------------------------------------------
// Batch Embedding Helper
// ---------------------------------------------------------------------------

/**
 * Generate embeddings for multiple texts in a single API call.
 * More efficient than calling generateEmbedding in a loop.
 */
export async function generateEmbeddingsBatch(
  texts: string[],
): Promise<EmbeddingResult[]> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY environment variable");
  }

  const truncated = texts.map((t) =>
    t.length > 30000 ? t.slice(0, 30000) : t,
  );

  const response = await fetch(OPENAI_EMBEDDINGS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: EMBEDDING_MODEL,
      input: truncated,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI embeddings API error (${response.status}): ${error}`);
  }

  const data = (await response.json()) as {
    data: Array<{ embedding: number[]; index: number }>;
    usage: { prompt_tokens: number; total_tokens: number };
  };

  // Sort by index to maintain input order
  const sorted = data.data.sort((a, b) => a.index - b.index);
  const tokensPerItem = Math.ceil(
    data.usage.total_tokens / texts.length,
  );

  return sorted.map((item) => ({
    embedding: item.embedding,
    model: EMBEDDING_MODEL,
    tokenCount: tokensPerItem,
  }));
}

// ---------------------------------------------------------------------------
// Utility: Cosine Similarity (client-side fallback)
// ---------------------------------------------------------------------------

/**
 * Compute cosine similarity between two vectors.
 * Useful for client-side re-ranking or when Supabase is unavailable.
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error(
      `Vector dimension mismatch: ${a.length} vs ${b.length}`,
    );
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  return denominator === 0 ? 0 : dotProduct / denominator;
}
