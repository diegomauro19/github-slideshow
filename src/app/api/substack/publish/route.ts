import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/substack/publish - Publish or schedule an essay to Substack
 *
 * Real implementation would:
 * - Authenticate with Substack API using stored credentials
 * - Convert essay content to Substack-compatible HTML format
 * - Create a draft or schedule a post on Substack
 * - Handle image uploads and embedding
 * - Return the Substack draft/post ID and URL
 * - Update the essay record in Supabase with publication status
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { essayId, title, content, scheduledAt } = body;

    if (!essayId || !title || !content) {
      return NextResponse.json(
        { error: 'essayId, title, and content are required' },
        { status: 400 }
      );
    }

    const isScheduled = !!scheduledAt;
    const postId = `substack_${Date.now()}`;

    const mockPublishResult = {
      success: true,
      essayId,
      substack: {
        postId,
        status: isScheduled ? 'scheduled' : 'draft',
        title,
        url: `https://yourlumen.substack.com/p/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`,
        scheduledAt: scheduledAt || null,
        createdAt: new Date().toISOString(),
        wordCount: content.split(/\s+/).length,
        estimatedReadTime: `${Math.ceil(content.split(/\s+/).length / 250)} min`,
      },
      metadata: {
        contentLength: content.length,
        hasImages: false,
        audienceType: 'everyone', // or 'paid_only'
        publishedVia: 'lumen_command_center',
      },
    };

    return NextResponse.json(mockPublishResult, { status: 201 });
  } catch (error) {
    console.error('Substack publish error:', error);
    return NextResponse.json(
      { error: 'Failed to publish to Substack' },
      { status: 500 }
    );
  }
}
