import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { createServerClient } from "@/lib/supabase/server";

export const insightsRouter = router({
  list: publicProcedure
    .input(
      z
        .object({
          source: z
            .enum(["conversation", "research", "reflection", "external"])
            .optional(),
          tag: z.string().optional(),
          status: z
            .enum(["captured", "developing", "mature", "archived"])
            .optional(),
        })
        .optional()
    )
    .query(async ({ input }) => {
      const supabase = createServerClient();
      let query = supabase
        .from("insights")
        .select("*")
        .order("created_at", { ascending: false });

      if (input?.source) {
        query = query.eq("source", input.source);
      }
      if (input?.status) {
        query = query.eq("status", input.status);
      }
      if (input?.tag) {
        query = query.contains("tags", [input.tag]);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().min(1),
        source: z.enum(["conversation", "research", "reflection", "external"]),
        tags: z.array(z.string()).optional(),
        connections: z.array(z.string()).optional(),
        essay_id: z.string().uuid().nullable().optional(),
        strength: z.number().min(0).max(100).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const supabase = createServerClient();
      const { data, error } = await supabase
        .from("insights")
        .insert({
          title: input.title,
          content: input.content,
          source: input.source,
          status: "captured",
          tags: input.tags ?? [],
          connections: input.connections ?? [],
          essay_id: input.essay_id ?? null,
          strength: input.strength ?? 50,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        title: z.string().optional(),
        content: z.string().optional(),
        source: z
          .enum(["conversation", "research", "reflection", "external"])
          .optional(),
        status: z
          .enum(["captured", "developing", "mature", "archived"])
          .optional(),
        tags: z.array(z.string()).optional(),
        connections: z.array(z.string()).optional(),
        essay_id: z.string().uuid().nullable().optional(),
        strength: z.number().min(0).max(100).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...updates } = input;
      const supabase = createServerClient();
      const { data, error } = await supabase
        .from("insights")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    }),

  linkToEssay: publicProcedure
    .input(
      z.object({
        insightId: z.string().uuid(),
        essayId: z.string().uuid(),
      })
    )
    .mutation(async ({ input }) => {
      const supabase = createServerClient();
      const { data, error } = await supabase
        .from("insights")
        .update({
          essay_id: input.essayId,
          updated_at: new Date().toISOString(),
        })
        .eq("id", input.insightId)
        .select()
        .single();

      if (error) throw error;
      return data;
    }),

  search: publicProcedure
    .input(z.object({ text: z.string().min(1) }))
    .query(async ({ input }) => {
      const supabase = createServerClient();
      // Semantic search via pgvector - requires embedding generation
      // For now, fall back to text search on title and content
      const { data, error } = await supabase
        .from("insights")
        .select("*")
        .or(`title.ilike.%${input.text}%,content.ilike.%${input.text}%`)
        .order("strength", { ascending: false })
        .limit(20);

      if (error) throw error;
      return data;
    }),
});
