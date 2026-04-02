import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { createServerClient } from "@/lib/supabase/server";

export const researchRouter = router({
  list: publicProcedure.query(async () => {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("research_sessions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ input }) => {
      const supabase = createServerClient();
      const { data, error } = await supabase
        .from("research_sessions")
        .select("*")
        .eq("id", input.id)
        .single();

      if (error) throw error;
      return data;
    }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        topic: z.string().min(1),
        essay_id: z.string().uuid().nullable().optional(),
        notes: z.string().nullable().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const supabase = createServerClient();
      const { data, error } = await supabase
        .from("research_sessions")
        .insert({
          title: input.title,
          topic: input.topic,
          status: "active",
          notes: input.notes ?? null,
          sources: [],
          findings: [],
          essay_id: input.essay_id ?? null,
          started_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    }),

  attachToEssay: publicProcedure
    .input(
      z.object({
        sessionId: z.string().uuid(),
        essayId: z.string().uuid(),
      })
    )
    .mutation(async ({ input }) => {
      const supabase = createServerClient();
      const { data, error } = await supabase
        .from("research_sessions")
        .update({
          essay_id: input.essayId,
          updated_at: new Date().toISOString(),
        })
        .eq("id", input.sessionId)
        .select()
        .single();

      if (error) throw error;
      return data;
    }),
});
