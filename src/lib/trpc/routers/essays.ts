import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { createServerClient } from "@/lib/supabase/server";

export const essaysRouter = router({
  list: publicProcedure.query(async () => {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("essays")
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
        .from("essays")
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
        subtitle: z.string().nullable().optional(),
        thesis: z.string().nullable().optional(),
        tags: z.array(z.string()).optional(),
        target_word_count: z.number().nullable().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const supabase = createServerClient();
      const { data, error } = await supabase
        .from("essays")
        .insert({
          title: input.title,
          subtitle: input.subtitle ?? null,
          thesis: input.thesis ?? null,
          tags: input.tags ?? [],
          target_word_count: input.target_word_count ?? null,
          status: "idea",
          slug: input.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, ""),
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
        subtitle: z.string().nullable().optional(),
        slug: z.string().nullable().optional(),
        content: z.string().nullable().optional(),
        summary: z.string().nullable().optional(),
        thesis: z.string().nullable().optional(),
        tags: z.array(z.string()).optional(),
        target_word_count: z.number().nullable().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...updates } = input;
      const supabase = createServerClient();
      const { data, error } = await supabase
        .from("essays")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    }),

  updateStatus: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        status: z.enum([
          "idea",
          "research",
          "drafting",
          "editing",
          "ready",
          "published",
        ]),
      })
    )
    .mutation(async ({ input }) => {
      const supabase = createServerClient();
      const updatePayload: Record<string, unknown> = {
        status: input.status,
        updated_at: new Date().toISOString(),
      };

      if (input.status === "published") {
        updatePayload.published_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from("essays")
        .update(updatePayload)
        .eq("id", input.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    }),
});
