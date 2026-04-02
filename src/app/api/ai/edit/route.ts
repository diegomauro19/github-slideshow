import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/ai/edit - Copy edit an essay draft
 *
 * Real implementation would:
 * - Call Anthropic API with claude-sonnet-4-20250514 (chosen for speed)
 * - Analyze draft for grammar, clarity, tone, structure
 * - Return actionable suggestions with line references
 * - Adapt suggestions to essay type (newsletter, analysis, opinion, etc.)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { draft, essayType } = body;

    if (!draft) {
      return NextResponse.json(
        { error: 'draft is required' },
        { status: 400 }
      );
    }

    const mockSuggestions = {
      essayType: essayType || 'newsletter',
      model: 'claude-sonnet-4-20250514',
      suggestions: [
        {
          id: 'sug_001',
          type: 'clarity',
          severity: 'medium',
          location: { paragraph: 1, sentence: 2 },
          original: 'This framing contains a dangerous assumption.',
          suggested: 'This framing rests on a dangerous assumption.',
          rationale: 'Using "rests on" better conveys that the assumption is foundational to the argument.',
        },
        {
          id: 'sug_002',
          type: 'structure',
          severity: 'high',
          location: { paragraph: 3, sentence: 1 },
          original: 'When we examine the deployment of algorithmic systems...',
          suggested: 'Consider splitting this paragraph. The transition from institutional deployment to equity metrics needs a clearer bridge.',
          rationale: 'The paragraph covers two distinct ideas that would each benefit from fuller development.',
        },
        {
          id: 'sug_003',
          type: 'tone',
          severity: 'low',
          location: { paragraph: 5, sentence: 3 },
          original: 'nobody chose',
          suggested: 'no one deliberately chose',
          rationale: 'For a newsletter audience, "no one deliberately chose" adds nuance — the current phrasing implies complete absence of agency rather than lack of intentionality.',
        },
        {
          id: 'sug_004',
          type: 'grammar',
          severity: 'low',
          location: { paragraph: 2, sentence: 4 },
          original: 'the systems that perform best on narrow metrics often perform worst',
          suggested: 'systems that perform best on narrow metrics often perform worst',
          rationale: 'Dropping the article tightens the prose without changing meaning.',
        },
        {
          id: 'sug_005',
          type: 'strengthening',
          severity: 'medium',
          location: { paragraph: 4, sentence: 1 },
          original: 'The solution is not to abandon algorithmic tools...',
          suggested: 'Add a concrete example here — e.g., reference the Dutch childcare benefits scandal or the UK A-level algorithm controversy to ground the argument.',
          rationale: 'The essay is strong on abstraction but could use a vivid case study at this pivot point.',
        },
      ],
      summary: {
        totalSuggestions: 5,
        bySeverity: { high: 1, medium: 2, low: 2 },
        byType: { clarity: 1, structure: 1, tone: 1, grammar: 1, strengthening: 1 },
        overallAssessment: 'Strong draft with clear thesis. Main opportunities: add concrete examples and tighten paragraph transitions.',
        readabilityScore: 72,
      },
      tokensUsed: { input: 1520, output: 890 },
    };

    return NextResponse.json(mockSuggestions);
  } catch (error) {
    console.error('Edit suggestions error:', error);
    return NextResponse.json(
      { error: 'Failed to generate edit suggestions' },
      { status: 500 }
    );
  }
}
