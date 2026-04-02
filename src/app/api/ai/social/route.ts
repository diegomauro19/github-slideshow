import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/ai/social - Generate social media assets from essay content
 *
 * Real implementation would:
 * - Call Anthropic API to generate platform-specific content
 * - Optimize each asset for platform constraints (character limits, tone)
 * - Use pull quotes as anchors for social content
 * - Generate LinkedIn post, X thread (5 tweets), Instagram caption, social teaser
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { essayTitle, essayContent, pullQuotes } = body;

    if (!essayTitle || !essayContent) {
      return NextResponse.json(
        { error: 'essayTitle and essayContent are required' },
        { status: 400 }
      );
    }

    const mockAssets = {
      essayTitle,
      generatedAt: new Date().toISOString(),
      assets: {
        linkedin: {
          post: `The promise of algorithmic governance is seductive: replace messy human decision-making with clean computational systems.\n\nBut after months of research, I've concluded this framing is dangerously wrong.\n\nGovernance isn't an optimization problem. It's a legitimacy problem.\n\nIn my latest essay, I explore how the systems that score highest on efficiency metrics often score lowest on what actually matters: equity, accountability, and democratic legitimacy.\n\nThree key insights:\n\n→ The Dutch childcare benefits scandal wasn't a bug — it was the system working exactly as designed\n→ When we automate decisions, we don't remove bias — we launder it\n→ The path forward isn't less technology, but differently accountable technology\n\nThe question isn't whether algorithms should play a role in governance. They already do.\n\nThe question is whether we'll design that role thoughtfully.\n\n🔗 Full essay in comments\n\n#AlgorithmicGovernance #Technology #Democracy #PublicPolicy`,
          characterCount: 812,
        },
        xThread: {
          tweets: [
            {
              position: 1,
              text: `New essay: "The Paradox of Algorithmic Governance"\n\nThe promise: replace messy human decisions with clean, fast, objective computation.\n\nThe reality: we're building systems that optimize for the wrong things.\n\nA thread on why efficiency is undermining democracy 🧵`,
              characterCount: 258,
            },
            {
              position: 2,
              text: `The systems that perform best on narrow metrics often perform worst on the measures that actually matter.\n\nConsider: an algorithm that reduces welfare fraud by 40% sounds great — until you discover it does so by denying benefits to 15,000 legitimate families.`,
              characterCount: 256,
            },
            {
              position: 3,
              text: `${pullQuotes?.[0] || 'When we automate decisions, we don\'t remove bias. We launder it through a system that\'s harder to question, harder to appeal, and harder to hold accountable.'}`,
              characterCount: 178,
            },
            {
              position: 4,
              text: `The path forward isn't abandoning algorithmic tools.\n\nIt's subordinating them to democratic processes:\n\n• Design for augmentation, not replacement\n• Build in transparency and contestability\n• Maintain meaningful human oversight\n• Default to explainability`,
              characterCount: 250,
            },
            {
              position: 5,
              text: `The question isn't whether algorithms should play a role in governance — they already do.\n\nThe question is whether we'll design that role thoughtfully, or sleepwalk into a technocratic future no one deliberately chose.\n\nFull essay: [link]`,
              characterCount: 237,
            },
          ],
          totalTweets: 5,
        },
        instagram: {
          caption: `The promise of algorithmic governance is seductive in its simplicity.\n\nBut governance isn't an optimization problem. It's a legitimacy problem.\n\nNew essay exploring how the pursuit of computational efficiency is quietly undermining democratic accountability — and what we can do about it.\n\nThe systems that score highest on efficiency often score lowest on equity, accountability, and legitimacy.\n\nLink in bio for the full piece.\n\n.\n.\n.\n#AlgorithmicGovernance #TechPolicy #Democracy #CriticalThinking #SystemsThinking #PublicPolicy #AlgorithmicBias #DigitalGovernance`,
          characterCount: 537,
          suggestedImagePrompt: 'Abstract visualization of interconnected nodes forming a balance scale, one side labeled "efficiency" glowing blue, the other "legitimacy" glowing warm gold, dark background',
        },
        socialTeaser: {
          shortTeaser: 'When algorithms govern, efficiency and democracy collide. My new essay on why we need to rethink algorithmic governance.',
          emailPreheader: 'The systems that score highest on efficiency often score lowest on what actually matters.',
          ogDescription: 'How automated decision-making systems are reshaping institutional power structures — and why the pursuit of efficiency may be undermining democratic legitimacy.',
        },
      },
      model: 'claude-sonnet-4-20250514',
      tokensUsed: { input: 2100, output: 1650 },
    };

    return NextResponse.json(mockAssets);
  } catch (error) {
    console.error('Social asset generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate social assets' },
      { status: 500 }
    );
  }
}
