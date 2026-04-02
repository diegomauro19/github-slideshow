// ============================================================================
// Lumen Command Center - Database Types
// Matches the Supabase/Postgres schema
// ============================================================================

// --- Enum Types ---

export type EssayStatus =
  | "idea"
  | "research"
  | "drafting"
  | "editing"
  | "ready"
  | "published";

export type InsightStatus = "captured" | "developing" | "mature" | "archived";

export type InsightSource =
  | "conversation"
  | "research"
  | "reflection"
  | "external";

export type ResearchSessionStatus =
  | "active"
  | "paused"
  | "completed"
  | "abandoned";

export type WargameSessionStatus =
  | "setup"
  | "active"
  | "paused"
  | "completed"
  | "archived";

export type WargameMoveType =
  | "action"
  | "reaction"
  | "analysis"
  | "escalation"
  | "de-escalation";

export type CalendarItemStatus =
  | "planned"
  | "in-progress"
  | "ready"
  | "published"
  | "skipped";

export type ContentType =
  | "essay"
  | "newsletter"
  | "thread"
  | "short-form"
  | "video-script";

export type GrowthActionStatus =
  | "planned"
  | "in-progress"
  | "completed"
  | "cancelled";

export type GrowthActionCategory =
  | "content"
  | "outreach"
  | "collaboration"
  | "paid"
  | "seo"
  | "community";

export type AIOperationStatus = "pending" | "running" | "completed" | "failed";

export type AIOperationType =
  | "essay-draft"
  | "research-synthesis"
  | "insight-extraction"
  | "wargame-analysis"
  | "editorial-planning"
  | "growth-recommendation";

// --- Table Types ---

export interface Essay {
  id: string;
  title: string;
  subtitle: string | null;
  slug: string | null;
  status: EssayStatus;
  content: string | null;
  summary: string | null;
  thesis: string | null;
  tags: string[];
  word_count: number;
  target_word_count: number | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Insight {
  id: string;
  title: string;
  content: string;
  source: InsightSource;
  status: InsightStatus;
  tags: string[];
  connections: string[];
  essay_id: string | null;
  strength: number;
  created_at: string;
  updated_at: string;
}

export interface ResearchSession {
  id: string;
  title: string;
  topic: string;
  status: ResearchSessionStatus;
  notes: string | null;
  sources: ResearchSource[];
  findings: string[];
  essay_id: string | null;
  started_at: string;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ResearchSource {
  url: string;
  title: string;
  type: string;
  notes: string | null;
}

export interface WargameSession {
  id: string;
  title: string;
  scenario: string;
  status: WargameSessionStatus;
  participants: WargameParticipant[];
  objectives: string[];
  summary: string | null;
  started_at: string;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface WargameParticipant {
  name: string;
  role: string;
  description: string | null;
}

export interface WargameMove {
  id: string;
  session_id: string;
  participant: string;
  move_type: WargameMoveType;
  content: string;
  rationale: string | null;
  impact_assessment: string | null;
  move_number: number;
  created_at: string;
}

export interface EditorialCalendarItem {
  id: string;
  title: string;
  content_type: ContentType;
  status: CalendarItemStatus;
  scheduled_date: string | null;
  published_date: string | null;
  essay_id: string | null;
  description: string | null;
  tags: string[];
  platform: string | null;
  created_at: string;
  updated_at: string;
}

export interface SubscriberSnapshot {
  id: string;
  date: string;
  total_subscribers: number;
  new_subscribers: number;
  churned_subscribers: number;
  open_rate: number | null;
  click_rate: number | null;
  source_breakdown: Record<string, number> | null;
  created_at: string;
}

export interface GrowthAction {
  id: string;
  title: string;
  description: string | null;
  category: GrowthActionCategory;
  status: GrowthActionStatus;
  priority: number;
  impact_estimate: string | null;
  effort_estimate: string | null;
  due_date: string | null;
  completed_at: string | null;
  results: string | null;
  created_at: string;
  updated_at: string;
}

export interface CSuiteTarget {
  id: string;
  name: string;
  title: string;
  company: string;
  industry: string | null;
  linkedin_url: string | null;
  email: string | null;
  notes: string | null;
  engagement_status: string;
  last_contacted_at: string | null;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface AIOperation {
  id: string;
  operation_type: AIOperationType;
  status: AIOperationStatus;
  input: Record<string, unknown>;
  output: Record<string, unknown> | null;
  error: string | null;
  model: string;
  tokens_used: number | null;
  cost_cents: number | null;
  duration_ms: number | null;
  triggered_by: string | null;
  created_at: string;
  completed_at: string | null;
}

// --- Insert Types (omit auto-generated fields) ---

export type EssayInsert = Omit<Essay, "id" | "created_at" | "updated_at" | "word_count"> & {
  id?: string;
  word_count?: number;
};

export type InsightInsert = Omit<Insight, "id" | "created_at" | "updated_at"> & {
  id?: string;
};

export type ResearchSessionInsert = Omit<ResearchSession, "id" | "created_at" | "updated_at"> & {
  id?: string;
};

export type WargameSessionInsert = Omit<WargameSession, "id" | "created_at" | "updated_at"> & {
  id?: string;
};

export type WargameMoveInsert = Omit<WargameMove, "id" | "created_at"> & {
  id?: string;
};

export type EditorialCalendarItemInsert = Omit<EditorialCalendarItem, "id" | "created_at" | "updated_at"> & {
  id?: string;
};

export type SubscriberSnapshotInsert = Omit<SubscriberSnapshot, "id" | "created_at"> & {
  id?: string;
};

export type GrowthActionInsert = Omit<GrowthAction, "id" | "created_at" | "updated_at"> & {
  id?: string;
};

export type CSuiteTargetInsert = Omit<CSuiteTarget, "id" | "created_at" | "updated_at"> & {
  id?: string;
};

export type AIOperationInsert = Omit<AIOperation, "id" | "created_at"> & {
  id?: string;
};

// --- Update Types (all fields optional except id) ---

export type EssayUpdate = Partial<Omit<Essay, "id" | "created_at">> & { id: string };
export type InsightUpdate = Partial<Omit<Insight, "id" | "created_at">> & { id: string };
export type ResearchSessionUpdate = Partial<Omit<ResearchSession, "id" | "created_at">> & { id: string };
export type WargameSessionUpdate = Partial<Omit<WargameSession, "id" | "created_at">> & { id: string };
export type WargameMoveUpdate = Partial<Omit<WargameMove, "id" | "created_at">> & { id: string };
export type EditorialCalendarItemUpdate = Partial<Omit<EditorialCalendarItem, "id" | "created_at">> & { id: string };
export type GrowthActionUpdate = Partial<Omit<GrowthAction, "id" | "created_at">> & { id: string };
export type CSuiteTargetUpdate = Partial<Omit<CSuiteTarget, "id" | "created_at">> & { id: string };
export type AIOperationUpdate = Partial<Omit<AIOperation, "id" | "created_at">> & { id: string };

// --- Database Schema (for Supabase typed client) ---

export interface Database {
  public: {
    Tables: {
      essays: {
        Row: Essay;
        Insert: EssayInsert;
        Update: Partial<EssayInsert>;
      };
      insights: {
        Row: Insight;
        Insert: InsightInsert;
        Update: Partial<InsightInsert>;
      };
      research_sessions: {
        Row: ResearchSession;
        Insert: ResearchSessionInsert;
        Update: Partial<ResearchSessionInsert>;
      };
      wargame_sessions: {
        Row: WargameSession;
        Insert: WargameSessionInsert;
        Update: Partial<WargameSessionInsert>;
      };
      wargame_moves: {
        Row: WargameMove;
        Insert: WargameMoveInsert;
        Update: Partial<WargameMoveInsert>;
      };
      editorial_calendar: {
        Row: EditorialCalendarItem;
        Insert: EditorialCalendarItemInsert;
        Update: Partial<EditorialCalendarItemInsert>;
      };
      subscriber_snapshots: {
        Row: SubscriberSnapshot;
        Insert: SubscriberSnapshotInsert;
        Update: Partial<SubscriberSnapshotInsert>;
      };
      growth_actions: {
        Row: GrowthAction;
        Insert: GrowthActionInsert;
        Update: Partial<GrowthActionInsert>;
      };
      csuite_targets: {
        Row: CSuiteTarget;
        Insert: CSuiteTargetInsert;
        Update: Partial<CSuiteTargetInsert>;
      };
      ai_operations: {
        Row: AIOperation;
        Insert: AIOperationInsert;
        Update: Partial<AIOperationInsert>;
      };
    };
  };
}
