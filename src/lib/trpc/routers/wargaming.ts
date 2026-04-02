import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { createServerClient } from "@/lib/supabase/server";

export const wargamingRouter = router({
  listSessions: publicProcedure.query(async () => {
    const supabase: any = createServerClient();
    const { data, error } = await supabase
      .from("wargame_sessions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }),

  getSession: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ input }) => {
      const supabase: any = createServerClient();
      const [sessionResult, movesResult] = await Promise.all([
        supabase
          .from("wargame_sessions")
          .select("*")
          .eq("id", input.id)
          .single(),
        supabase
          .from("wargame_moves")
          .select("*")
          .eq("session_id", input.id)
          .order("move_number", { ascending: true }),
      ]);

      if (sessionResult.error) throw sessionResult.error;
      if (movesResult.error) throw movesResult.error;

      return {
        ...sessionResult.data,
        moves: movesResult.data,
      };
    }),

  createSession: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        scenario: z.string().min(1),
        participants: z.array(
          z.object({
            name: z.string(),
            role: z.string(),
            description: z.string().nullable().optional(),
          })
        ),
        objectives: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const supabase: any = createServerClient();
      const { data, error } = await supabase
        .from("wargame_sessions")
        .insert({
          title: input.title,
          scenario: input.scenario,
          status: "setup",
          participants: input.participants,
          objectives: input.objectives ?? [],
          summary: null,
          started_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    }),

  executeRound: publicProcedure
    .input(
      z.object({
        sessionId: z.string().uuid(),
        participant: z.string(),
        moveType: z.enum([
          "action",
          "reaction",
          "analysis",
          "escalation",
          "de-escalation",
        ]),
        content: z.string().min(1),
        rationale: z.string().nullable().optional(),
        impactAssessment: z.string().nullable().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const supabase: any = createServerClient();

      // Get the current max move number for this session
      const { data: existing } = await supabase
        .from("wargame_moves")
        .select("move_number")
        .eq("session_id", input.sessionId)
        .order("move_number", { ascending: false })
        .limit(1);

      const nextMoveNumber = existing && existing.length > 0
        ? existing[0].move_number + 1
        : 1;

      // Update session status to active if it was in setup
      await supabase
        .from("wargame_sessions")
        .update({
          status: "active",
          updated_at: new Date().toISOString(),
        })
        .eq("id", input.sessionId)
        .eq("status", "setup");

      const { data, error } = await supabase
        .from("wargame_moves")
        .insert({
          session_id: input.sessionId,
          participant: input.participant,
          move_type: input.moveType,
          content: input.content,
          rationale: input.rationale ?? null,
          impact_assessment: input.impactAssessment ?? null,
          move_number: nextMoveNumber,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    }),

  synthesize: publicProcedure
    .input(z.object({ sessionId: z.string().uuid() }))
    .mutation(async ({ input }) => {
      const supabase: any = createServerClient();

      // Fetch all moves for synthesis
      const { data: moves, error: movesError } = await supabase
        .from("wargame_moves")
        .select("*")
        .eq("session_id", input.sessionId)
        .order("move_number", { ascending: true });

      if (movesError) throw movesError;

      // TODO: Call AI to generate synthesis from moves
      const summary = `Wargame synthesis: ${moves?.length ?? 0} moves analyzed. AI synthesis pending implementation.`;

      const { data, error } = await supabase
        .from("wargame_sessions")
        .update({
          summary,
          status: "completed",
          completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", input.sessionId)
        .select()
        .single();

      if (error) throw error;
      return data;
    }),
});
