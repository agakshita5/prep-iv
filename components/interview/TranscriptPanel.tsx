"use client";

import { useEffect, useMemo, useRef } from "react";
import { useTranscriptions, useLocalParticipant } from "@livekit/components-react";

type Group = { isUser: boolean; text: string };

function groupByTurn(
  items: { text: string; participantInfo: { identity: string } }[],
  myIdentity: string,
): Group[] {
  const groups: Group[] = [];
  for (const it of items) {
    const isUser = it.participantInfo.identity === myIdentity;
    const last = groups[groups.length - 1];
    if (last && last.isUser === isUser) {
      last.text = `${last.text} ${it.text}`.trim();
    } else {
      groups.push({ isUser, text: it.text });
    }
  }
  return groups;
}

export default function TranscriptPanel({ onClose }: { onClose: () => void }) {
  const transcriptions = useTranscriptions();
  const { localParticipant } = useLocalParticipant();
  const bottomRef = useRef<HTMLDivElement>(null);

  const groups = useMemo(
    () => groupByTurn(transcriptions, localParticipant.identity),
    [transcriptions, localParticipant.identity],
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [groups.length]);

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
        {groups.length === 0 ? (
          <p className="text-sm text-zinc-500">
            Transcript will appear here as you speak.
          </p>
        ) : (
          groups.map((g, i) => (
            <div
              key={i}
              className={`flex ${g.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                  g.isUser
                    ? "bg-coral/20 text-zinc-100"
                    : "bg-white/5 text-zinc-200"
                }`}
              >
                <div className="mb-0.5 text-[10px] uppercase tracking-wide text-zinc-400">
                  {g.isUser ? "You" : "AI"}
                </div>
                {g.text}
              </div>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>
    </aside>
  );
}
