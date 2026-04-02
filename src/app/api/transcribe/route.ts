import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/transcribe - Voice transcription via audio file upload
 *
 * Real implementation would:
 * - Accept audio file via FormData (mp3, wav, m4a, webm)
 * - Call OpenAI Whisper API (whisper-1 model) for transcription
 * - Optionally run post-processing for punctuation and formatting
 * - Return transcribed text with timestamps and confidence scores
 * - Store transcription result linked to insight or essay
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio');

    if (!audioFile) {
      return NextResponse.json(
        { error: 'audio file is required (FormData field: "audio")' },
        { status: 400 }
      );
    }

    // In production: validate file type (mp3, wav, m4a, webm), check size limits,
    // send to OpenAI Whisper API, return transcription.

    const fileName = audioFile instanceof File ? audioFile.name : 'unknown';
    const fileSize = audioFile instanceof File ? audioFile.size : 0;

    const mockTranscription = {
      transcription: {
        text: 'I\'ve been thinking about this idea around algorithmic governance and how it relates to democratic legitimacy. The core tension is that when we automate government decisions, we gain efficiency but we lose something harder to measure — the sense that decisions are being made by people who are accountable to us. The Dutch childcare benefits scandal is the perfect case study here. You had an algorithm that was flagging families as fraudulent based on criteria that nobody fully understood, and when people tried to appeal, there was no human in the loop who could actually override the system. It wasn\'t that the system was broken — it was working exactly as designed. The problem was in the design itself, in the assumption that fraud detection is a pure optimization problem.',
        duration: 47.3,
        language: 'en',
        confidence: 0.96,
      },
      segments: [
        { start: 0.0, end: 8.2, text: 'I\'ve been thinking about this idea around algorithmic governance and how it relates to democratic legitimacy.', confidence: 0.97 },
        { start: 8.2, end: 22.1, text: 'The core tension is that when we automate government decisions, we gain efficiency but we lose something harder to measure — the sense that decisions are being made by people who are accountable to us.', confidence: 0.95 },
        { start: 22.1, end: 30.5, text: 'The Dutch childcare benefits scandal is the perfect case study here.', confidence: 0.98 },
        { start: 30.5, end: 42.8, text: 'You had an algorithm that was flagging families as fraudulent based on criteria that nobody fully understood, and when people tried to appeal, there was no human in the loop who could actually override the system.', confidence: 0.94 },
        { start: 42.8, end: 47.3, text: 'It wasn\'t that the system was broken — it was working exactly as designed. The problem was in the design itself, in the assumption that fraud detection is a pure optimization problem.', confidence: 0.96 },
      ],
      metadata: {
        fileName,
        fileSize,
        model: 'whisper-1',
        processedAt: new Date().toISOString(),
      },
    };

    return NextResponse.json(mockTranscription);
  } catch (error) {
    console.error('Transcription error:', error);
    return NextResponse.json(
      { error: 'Failed to transcribe audio' },
      { status: 500 }
    );
  }
}
