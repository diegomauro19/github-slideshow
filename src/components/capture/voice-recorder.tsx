"use client";

import * as React from "react";
import { Mic, Square, Loader2, Pencil } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type RecorderState = "idle" | "recording" | "transcribing" | "complete";

export function VoiceRecorder() {
  const [state, setState] = React.useState<RecorderState>("idle");
  const [transcription, setTranscription] = React.useState("");
  const [isEditing, setIsEditing] = React.useState(false);
  const [elapsed, setElapsed] = React.useState(0);

  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const analyserRef = React.useRef<AnalyserNode | null>(null);
  const animationRef = React.useRef<number | null>(null);
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const audioContextRef = React.useRef<AudioContext | null>(null);

  const drawWaveform = React.useCallback(() => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = "#111114";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / 40) * 0.8;
      const gap = canvas.width / 40 * 0.2;
      const centerY = canvas.height / 2;

      for (let i = 0; i < 40; i++) {
        const dataIndex = Math.floor((i / 40) * bufferLength);
        const value = dataArray[dataIndex] / 255;
        const barHeight = Math.max(2, value * centerY * 0.9);

        const alpha = 0.4 + value * 0.6;
        ctx.fillStyle = `rgba(212, 168, 67, ${alpha})`;
        ctx.fillRect(
          i * (barWidth + gap),
          centerY - barHeight,
          barWidth,
          barHeight * 2
        );
      }
    };

    draw();
  }, []);

  const startRecording = React.useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();

      setState("recording");
      setElapsed(0);

      timerRef.current = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);

      drawWaveform();

      mediaRecorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop());
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        if (timerRef.current) clearInterval(timerRef.current);
        audioContext.close();
      };
    } catch {
      console.error("Microphone access denied");
    }
  }, [drawWaveform]);

  const stopRecording = React.useCallback(() => {
    if (mediaRecorderRef.current && state === "recording") {
      mediaRecorderRef.current.stop();
      setState("transcribing");

      // Mock Whisper API call
      setTimeout(() => {
        setTranscription("Voice transcription placeholder");
        setState("complete");
      }, 2000);
    }
  }, [state]);

  const resetRecorder = React.useCallback(() => {
    setState("idle");
    setTranscription("");
    setIsEditing(false);
    setElapsed(0);
  }, []);

  React.useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mic className="h-5 w-5 text-[#d4a843]" />
          Voice Capture
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-5">
        {/* Mic Button */}
        {(state === "idle" || state === "recording") && (
          <button
            onClick={state === "idle" ? startRecording : stopRecording}
            className={cn(
              "relative flex items-center justify-center rounded-full transition-all duration-300",
              "h-24 w-24 md:h-28 md:w-28",
              state === "idle"
                ? "border-2 border-[#d4a843]/60 bg-[#18181c] hover:border-[#d4a843] hover:bg-[#1e1e22]"
                : "border-2 border-[#d4a843] bg-[#d4a843]/10"
            )}
          >
            {state === "recording" && (
              <span className="absolute inset-0 animate-ping rounded-full border border-[#d4a843]/30" />
            )}
            {state === "idle" ? (
              <Mic className="h-10 w-10 text-[#d4a843]" />
            ) : (
              <Square className="h-8 w-8 text-[#d4a843]" />
            )}
          </button>
        )}

        {/* Timer */}
        {state === "recording" && (
          <span className="font-mono text-lg text-[#d4a843]">
            {formatTime(elapsed)}
          </span>
        )}

        {/* Waveform */}
        {state === "recording" && (
          <canvas
            ref={canvasRef}
            width={320}
            height={64}
            className="w-full max-w-xs rounded-md"
          />
        )}

        {/* Transcribing */}
        {state === "transcribing" && (
          <div className="flex flex-col items-center gap-3 py-4">
            <Loader2 className="h-10 w-10 animate-spin text-[#d4a843]" />
            <span className="text-sm text-[#9e9890]">
              Transcribing audio...
            </span>
          </div>
        )}

        {/* Complete */}
        {state === "complete" && (
          <div className="w-full space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium uppercase tracking-wider text-[#9e9890]">
                Transcription
              </span>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-1 text-xs text-[#d4a843] hover:text-[#e0b854]"
              >
                <Pencil className="h-3 w-3" />
                {isEditing ? "Done" : "Edit"}
              </button>
            </div>
            {isEditing ? (
              <textarea
                value={transcription}
                onChange={(e) => setTranscription(e.target.value)}
                className="w-full rounded-md border border-[#2a2a2e] bg-[#18181c] p-3 text-sm text-[#e8e4df] focus:border-[#d4a843]/40 focus:outline-none focus:ring-2 focus:ring-[#d4a843]/50"
                rows={4}
              />
            ) : (
              <p className="rounded-md border border-[#1e1e22] bg-[#18181c] p-3 text-sm leading-relaxed text-[#e8e4df]">
                {transcription}
              </p>
            )}
            <div className="flex gap-2">
              <Button size="sm" className="flex-1">
                Save Insight
              </Button>
              <Button size="sm" variant="ghost" onClick={resetRecorder}>
                Record Again
              </Button>
            </div>
          </div>
        )}

        {state === "idle" && (
          <p className="text-center text-xs text-[#9e9890]">
            Tap the mic to start recording
          </p>
        )}
      </CardContent>
    </Card>
  );
}
