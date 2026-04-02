import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { createServerClient } from "@/lib/supabase/server";

export const growthRouter = router({
  getSubscriberMetrics: publicProcedure.query(async () => {
    const supabase: any = createServerClient();
    const { data, error } = await supabase
      .from("subscriber_snapshots")
      .select("*")
      .order("date", { ascending: false })
      .limit(30);

    if (error) throw error;
    return data;
  }),

  getEssayPerformance: publicProcedure.query(async () => {
    const supabase: any = createServerClient();
    const { data, error } = await supabase
      .from("essays")
      .select("id, title, status, published_at, word_count, tags")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error) throw error;
    return data;
  }),

  listGrowthActions: publicProcedure.query(async () => {
    const supabase: any = createServerClient();
    const { data, error } = await supabase
      .from("growth_actions")
      .select("*")
      .order("priority", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }),

  createGrowthAction: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().nullable().optional(),
        category: z.enum([
          "content",
          "outreach",
          "collaboration",
          "paid",
          "seo",
          "community",
        ]),
        priority: z.number().min(1).max(10).optional(),
        impact_estimate: z.string().nullable().optional(),
        effort_estimate: z.string().nullable().optional(),
        due_date: z.string().nullable().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const supabase: any = createServerClient();
      const { data, error } = await supabase
        .from("growth_actions")
        .insert({
          title: input.title,
          description: input.description ?? null,
          category: input.category,
          status: "planned",
          priority: input.priority ?? 5,
          impact_estimate: input.impact_estimate ?? null,
          effort_estimate: input.effort_estimate ?? null,
          due_date: input.due_date ?? null,
          completed_at: null,
          results: null,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    }),

  listCsuiteTargets: publicProcedure.query(async () => {
    const supabase: any = createServerClient();
    const { data, error } = await supabase
      .from("csuite_targets")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }),

  createCsuiteTarget: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        title: z.string().min(1),
        company: z.string().min(1),
        industry: z.string().nullable().optional(),
        linkedin_url: z.string().nullable().optional(),
        email: z.string().nullable().optional(),
        notes: z.string().nullable().optional(),
        tags: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const supabase: any = createServerClient();
      const { data, error } = await supabase
        .from("csuite_targets")
        .insert({
          name: input.name,
          title: input.title,
          company: input.company,
          industry: input.industry ?? null,
          linkedin_url: input.linkedin_url ?? null,
          email: input.email ?? null,
          notes: input.notes ?? null,
          engagement_status: "identified",
          tags: input.tags ?? [],
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    }),

  updateCsuiteTarget: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        name: z.string().optional(),
        title: z.string().optional(),
        company: z.string().optional(),
        industry: z.string().nullable().optional(),
        linkedin_url: z.string().nullable().optional(),
        email: z.string().nullable().optional(),
        notes: z.string().nullable().optional(),
        engagement_status: z.string().optional(),
        last_contacted_at: z.string().nullable().optional(),
        tags: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...updates } = input;
      const supabase: any = createServerClient();
      const { data, error } = await supabase
        .from("csuite_targets")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    }),
});
