import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { createServerClient } from "@/lib/supabase/server";

export const calendarRouter = router({
  list: publicProcedure.query(async () => {
    const supabase: any = createServerClient();
    const { data, error } = await supabase
      .from("editorial_calendar")
      .select("*")
      .order("scheduled_date", { ascending: true });

    if (error) throw error;
    return data;
  }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content_type: z.enum([
          "essay",
          "newsletter",
          "thread",
          "short-form",
          "video-script",
        ]),
        scheduled_date: z.string().nullable().optional(),
        essay_id: z.string().uuid().nullable().optional(),
        description: z.string().nullable().optional(),
        tags: z.array(z.string()).optional(),
        platform: z.string().nullable().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const supabase: any = createServerClient();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any)
        .from("editorial_calendar")
        .insert({
          title: input.title,
          content_type: input.content_type,
          status: "planned",
          scheduled_date: input.scheduled_date ?? null,
          published_date: null,
          essay_id: input.essay_id ?? null,
          description: input.description ?? null,
          tags: input.tags ?? [],
          platform: input.platform ?? null,
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
        content_type: z
          .enum(["essay", "newsletter", "thread", "short-form", "video-script"])
          .optional(),
        status: z
          .enum(["planned", "in-progress", "ready", "published", "skipped"])
          .optional(),
        scheduled_date: z.string().nullable().optional(),
        published_date: z.string().nullable().optional(),
        essay_id: z.string().uuid().nullable().optional(),
        description: z.string().nullable().optional(),
        tags: z.array(z.string()).optional(),
        platform: z.string().nullable().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...updates } = input;
      const supabase: any = createServerClient();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { data, error } = await (supabase as any)
        .from("editorial_calendar")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    }),

  suggestTopics: publicProcedure
    .input(
      z.object({
        count: z.number().min(1).max(10).optional(),
        themes: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ input }) => {
      // TODO: Call AI to generate topic suggestions based on
      // existing essays, insights, and provided themes
      const count = input.count ?? 5;
      const suggestions = Array.from({ length: count }, (_, i) => ({
        title: `Suggested Topic ${i + 1}`,
        description: "AI-generated topic suggestion - implementation pending",
        relevance_score: Math.round(Math.random() * 100),
        related_insights: [] as string[],
        suggested_date: null as string | null,
      }));

      return suggestions;
    }),
});
