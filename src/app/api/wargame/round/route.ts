import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/wargame/round - Execute a single wargame round
 *
 * Real implementation would:
 * - For each actor, call Claude Opus with the actor's mental model as prompt injection
 * - Include the scenario context and previous rounds for continuity
 * - Each actor "moves" independently based on their worldview
 * - Detect interactions and conflicts between actor moves
 * - Return all actor moves for this round
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionId, roundNum, actors, previousRounds } = body;

    if (!sessionId || roundNum === undefined || !actors) {
      return NextResponse.json(
        { error: 'sessionId, roundNum, and actors are required' },
        { status: 400 }
      );
    }

    const mockRound = {
      sessionId,
      roundNum,
      executedAt: new Date().toISOString(),
      moves: [
        {
          actorId: 'actor_1',
          actorName: actors[0]?.name || 'Technology Optimist',
          mentalModel: 'techno-optimist',
          action: 'Propose rapid deployment of AI-powered case management across all federal agencies, with a 12-month implementation timeline and performance metrics tied to processing speed.',
          reasoning: 'Efficiency gains compound over time. Delaying deployment means accumulating waste. Performance metrics create accountability. The longer we wait, the more citizens are harmed by slow, inconsistent human decision-making.',
          assumptions: [
            'Technology is net positive when deployed at scale',
            'Speed of implementation correlates with total benefit',
            'Measurable outcomes are the best proxy for governance quality',
          ],
          blindSpots: ['Does not account for transition costs or displacement effects', 'Assumes metrics capture what matters'],
          confidence: 0.85,
        },
        {
          actorId: 'actor_2',
          actorName: actors[1]?.name || 'Civil Liberties Advocate',
          mentalModel: 'rights-based',
          action: 'File legal challenge against the deployment, arguing it violates due process by removing meaningful human review from consequential decisions. Simultaneously launch public awareness campaign.',
          reasoning: 'Due process is not a luxury — it is a constitutional requirement. Automated systems that determine benefits, custody, or freedom without meaningful human review violate the fundamental right to be heard. Public awareness shifts the Overton window.',
          assumptions: [
            'Legal frameworks can meaningfully constrain technological deployment',
            'Public opinion matters for policy outcomes',
            'Human review is inherently more legitimate than algorithmic review',
          ],
          blindSpots: ['Legal challenges take years; deployment continues in the interim', 'Assumes current human review process is actually meaningful'],
          confidence: 0.72,
        },
        {
          actorId: 'actor_3',
          actorName: actors[2]?.name || 'Pragmatic Regulator',
          mentalModel: 'institutional-pragmatist',
          action: 'Propose a phased pilot program with mandatory impact assessments, third-party auditing, and sunset clauses. Require agencies to maintain human appeal processes alongside automated systems.',
          reasoning: 'Outright opposition is politically unfeasible given efficiency pressures. But unregulated deployment creates liability. The best path is structured experimentation with off-ramps. Impact assessments create evidence for future policy.',
          assumptions: [
            'Regulatory frameworks can keep pace with deployment',
            'Pilot programs generate transferable insights',
            'Institutional incentives can be aligned through oversight requirements',
          ],
          blindSpots: ['Pilot programs often become permanent before evaluation completes', 'Impact assessments may become compliance theater'],
          confidence: 0.78,
        },
      ],
      interactions: [
        {
          actors: ['actor_1', 'actor_2'],
          type: 'conflict',
          description: 'Direct opposition on deployment speed. Technology Optimist\'s 12-month timeline is incompatible with Civil Liberties Advocate\'s legal challenge.',
        },
        {
          actors: ['actor_2', 'actor_3'],
          type: 'partial_alignment',
          description: 'Both value oversight but disagree on mechanism. Advocate prefers judicial review; Regulator prefers administrative process.',
        },
        {
          actors: ['actor_1', 'actor_3'],
          type: 'negotiation_potential',
          description: 'Phased pilot could satisfy Optimist\'s desire for deployment while addressing some concerns. Key tension: sunset clauses vs. scaling commitments.',
        },
      ],
      roundSummary: `Round ${roundNum}: Three distinct strategies emerge. The Technology Optimist pushes for rapid full deployment, the Civil Liberties Advocate moves to block through legal channels, and the Pragmatic Regulator attempts to find middle ground with a structured pilot. Key tension: the speed of deployment vs. the speed of accountability infrastructure.`,
      previousRoundsConsidered: previousRounds?.length || 0,
      model: 'claude-opus-4-20250514',
      tokensUsed: { input: 4200, output: 3100 },
    };

    return NextResponse.json(mockRound);
  } catch (error) {
    console.error('Wargame round error:', error);
    return NextResponse.json(
      { error: 'Failed to execute wargame round' },
      { status: 500 }
    );
  }
}
