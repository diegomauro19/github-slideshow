import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/wargame/start - Initialize a wargame session
 *
 * Real implementation would:
 * - Create a wargame session record in Supabase
 * - Initialize actor profiles with their mental models
 * - Set up the scenario context for multi-round simulation
 * - Configure adversarial mode settings if enabled
 * - Return session ID for subsequent round execution
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { scenario, mentalModels, actors, numRounds, adversarialMode } = body;

    if (!scenario || !actors || actors.length === 0) {
      return NextResponse.json(
        { error: 'scenario and at least one actor are required' },
        { status: 400 }
      );
    }

    const sessionId = `wg_${Date.now()}`;

    const mockSession = {
      sessionId,
      status: 'initialized',
      createdAt: new Date().toISOString(),
      config: {
        scenario,
        numRounds: numRounds || 3,
        adversarialMode: adversarialMode || false,
        mentalModels: mentalModels || [],
      },
      actors: (actors as string[]).map((actor: string, index: number) => ({
        id: `actor_${index + 1}`,
        name: actor,
        mentalModel: mentalModels?.[index] || 'default_rational_actor',
        initialized: true,
      })),
      rounds: [],
      metadata: {
        estimatedDuration: `${(numRounds || 3) * 2} minutes`,
        totalActors: actors.length,
        model: 'claude-opus-4-20250514',
      },
    };

    return NextResponse.json(mockSession, { status: 201 });
  } catch (error) {
    console.error('Wargame start error:', error);
    return NextResponse.json(
      { error: 'Failed to initialize wargame session' },
      { status: 500 }
    );
  }
}
