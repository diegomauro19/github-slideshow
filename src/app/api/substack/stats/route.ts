import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/substack/stats - Fetch Substack analytics
 *
 * Real implementation would:
 * - Authenticate with Substack API
 * - Fetch subscriber counts, growth metrics, and engagement data
 * - If essayId provided, fetch specific essay performance metrics
 * - Cache results to avoid API rate limits
 * - Store snapshots in Supabase for historical tracking
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const essayId = searchParams.get('essayId');

    if (essayId) {
      // Return essay-specific stats
      const mockEssayStats = {
        essayId,
        performance: {
          views: 4287,
          reads: 2943,
          readRatio: 0.686,
          likes: 187,
          comments: 34,
          shares: 89,
          emailOpenRate: 0.62,
          emailClickRate: 0.14,
          newSubscribersFromPost: 47,
          publishedAt: '2026-03-28T10:00:00Z',
          daysSincePublished: 5,
        },
        benchmarks: {
          avgViews: 3200,
          avgReadRatio: 0.58,
          avgLikes: 120,
          avgComments: 22,
          performanceVsAvg: '+34% views, +18% read ratio, +56% likes',
        },
        topReferrers: [
          { source: 'email', percentage: 58 },
          { source: 'twitter', percentage: 22 },
          { source: 'linkedin', percentage: 11 },
          { source: 'direct', percentage: 6 },
          { source: 'other', percentage: 3 },
        ],
        fetchedAt: new Date().toISOString(),
      };

      return NextResponse.json(mockEssayStats);
    }

    // Return overall subscriber stats
    const mockOverallStats = {
      subscribers: {
        total: 12847,
        free: 10203,
        paid: 2644,
        trialActive: 187,
        churnRate30d: 0.023,
        growthRate30d: 0.047,
      },
      growth: {
        last7Days: { newSubscribers: 213, unsubscribes: 31, netGrowth: 182 },
        last30Days: { newSubscribers: 892, unsubscribes: 134, netGrowth: 758 },
        last90Days: { newSubscribers: 2341, unsubscribes: 387, netGrowth: 1954 },
      },
      engagement: {
        avgOpenRate: 0.58,
        avgClickRate: 0.12,
        avgReadRatio: 0.61,
        topPerformingEssays: [
          { title: 'The Paradox of Algorithmic Governance', views: 4287, readRatio: 0.686 },
          { title: 'Why Every Productivity System Fails', views: 6102, readRatio: 0.72 },
          { title: 'The Institutional Memory Crisis', views: 3891, readRatio: 0.65 },
        ],
      },
      revenue: {
        mrr: 13220,
        arr: 158640,
        avgRevenuePerPaidSubscriber: 5.0,
        conversionRate: 0.206,
      },
      fetchedAt: new Date().toISOString(),
    };

    return NextResponse.json(mockOverallStats);
  } catch (error) {
    console.error('Substack stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Substack stats' },
      { status: 500 }
    );
  }
}
