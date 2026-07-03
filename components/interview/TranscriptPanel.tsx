"use client";

import { useEffect, useRef } from "react";
import {
  useTranscriptions,
  useLocalParticipant,
} from "@livekit/components-react";

export default function TranscriptPanel({ onClose }: { onClose: () => void }) {
  const transcriptions = useTranscriptions();
  const { localParticipant } = useLocalParticipant();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcriptions.length]);

  return (
    <aside className="flex h-full w-[340px] shrink-0 flex-col border-l border-white/10 bg-zinc-900/80 backdrop-blur">
      <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <h2 className="text-sm font-semibold">Transcript</h2>
        <button
          onClick={onClose}
          aria-label="Close transcript"
          className="text-zinc-400 transition hover:text-zinc-100"
        >
          ✕
        </button>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {transcriptions.length === 0 ? (
          <p className="text-sm text-zinc-500">
            Transcript will appear here as you speak.
          </p>
        ) : (
          transcriptions.map((t, i) => {
            const isYou =
              t.participantInfo.identity === localParticipant.identity;
            return (
              <div
                key={i}
                className={`flex ${isYou ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                    isYou
                      ? "bg-emerald-500/15 text-emerald-100"
                      : "bg-white/5 text-zinc-200"
                  }`}
                >
                  <div className="mb-0.5 text-[10px] uppercase tracking-wide text-zinc-400">
                    {isYou ? "You" : "AI"}
                  </div>
                  {t.text}
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>
    </aside>
  );
}
