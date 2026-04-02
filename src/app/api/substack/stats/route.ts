import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/substack/stats - Substack analytics and subscriber stats
 *
 * Real implementation would:
 * - Authenticate with Substack API
 * - Fetch subscriber counts, growth rates, and churn data
 * - Fetch per-essay performance (opens, clicks, shares)
 * - Aggregate and return formatted analytics
 */
export async function GET(request: NextRequest) {
  try {
    const mockStats = {
      subscribers: {
        total: 4_832,
        free: 3_946,
        paid: 886,
        trialActive: 42,
        growthRate: 0.034,
        churnRate: 0.012,
        netNew30d: 187,
      },
      revenue: {
        mrr: 4_430,
        arr: 53_160,
        avgRevenuePerPaid: 5.0,
        lifetimeValue: 127.5,
      },
      essayPerformance: [
        {
          id: 'essay_001',
          title: 'The Accountability Gap in Algorithmic Governance',
          publishedAt: '2026-03-25T09:00:00Z',
          opens: 2_847,
          openRate: 0.589,
          clicks: 412,
          clickRate: 0.145,
          shares: 89,
          comments: 34,
          newSubscribers: 28,
        },
        {
          id: 'essay_002',
          title: 'Why Your Strategy Memo Is a Fiction',
          publishedAt: '2026-03-18T09:00:00Z',
          opens: 3_102,
          openRate: 0.642,
          clicks: 567,
          clickRate: 0.183,
          shares: 142,
          comments: 51,
          newSubscribers: 45,
        },
        {
          id: 'essay_003',
          title: 'The Middle Manager Trap',
          publishedAt: '2026-03-11T09:00:00Z',
          opens: 2_634,
          openRate: 0.546,
          clicks: 389,
          clickRate: 0.148,
          shares: 76,
          comments: 28,
          newSubscribers: 19,
        },
        {
          id: 'essay_004',
          title: 'Institutional Rot Starts in the Calendar',
          publishedAt: '2026-03-04T09:00:00Z',
          opens: 2_981,
          openRate: 0.618,
          clicks: 498,
          clickRate: 0.167,
          shares: 104,
          comments: 39,
          newSubscribers: 33,
        },
      ],
      topReferrers: [
        { source: 'Twitter/X', subscribers: 1_240, percentage: 0.257 },
        { source: 'LinkedIn', subscribers: 986, percentage: 0.204 },
        { source: 'Direct', subscribers: 874, percentage: 0.181 },
        { source: 'Google Search', subscribers: 612, percentage: 0.127 },
        { source: 'Substack Recommendations', subscribers: 543, percentage: 0.112 },
      ],
      fetchedAt: new Date().toISOString(),
    };

    return NextResponse.json(mockStats);
  } catch (error) {
    console.error('Substack stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Substack stats' },
      { status: 500 }
    );
  }
}
