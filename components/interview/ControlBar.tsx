'use client';

import { useRoomContext } from "@livekit/components-react";

export default function ControlBar({ transcriptOpen, onToggleTranscript }: { transcriptOpen: boolean, onToggleTranscript: () => void }) {
  const room = useRoomContext(); // gives Room object that LiveKitRoom created

  return (
    <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
      {/* disconnect() triggers LiveKitRoom.onDisconnected -> redirect */}
      <button
        onClick={() => room.disconnect()}
        className="rounded-full bg-red-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-red-600"
      >
        End interview
      </button>
      <button
        onClick={onToggleTranscript}
        aria-pressed={transcriptOpen}
        className={`rounded-full px-4 py-2 text-sm font-medium transition ${
          transcriptOpen
            ? "bg-coral/25 text-coral"
            : "bg-white/5 text-zinc-300 hover:bg-white/10"
        }`}
      >
        Chat
      </button>
    </div>
  );
}