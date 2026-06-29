"use client";

import { useEffect, useRef } from "react";
import { useTranscriptions, useLocalParticipant } from "@livekit/components-react";

export default function TranscriptPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const transcriptions = useTranscriptions(); // gives live speech-to-text results that are published in the room
  const { localParticipant } = useLocalParticipant();

  // automatically scrolls as new chat/transcript arrives
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcriptions.length]);

  return (
    <aside
      className={`absolute right-0 top-0 z-20 flex h-full w-[360px] flex-col border-l border-white/10 bg-zinc-900/95 backdrop-blur transition-transform duration-300 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <h2 className="text-sm font-semibold">Transcript</h2>
        <button
          onClick={onClose}
          aria-label="Close transcript"
          className="text-zinc-400 transition hover:text-zinc-100"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {transcriptions.length === 0 ? (
          <p className="text-sm text-zinc-500">
            Transcript will appear here once the interview starts.
          </p>
        ) : (
          transcriptions.map((t, i) => {
            const isYou = t.participantInfo.identity === localParticipant.identity;
            return (
              <div key={i} className={`flex ${isYou ? "justify-end" : "justify-start"}`} >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
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
