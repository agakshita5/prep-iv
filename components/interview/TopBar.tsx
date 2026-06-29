"use client";

import { useEffect, useState } from "react";
import { useConnectionState } from "@livekit/components-react";
import { ConnectionState } from "livekit-client";

// Counts up once per second while the room is connected.
function useElapsedSeconds(active: boolean) {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [active]);
  return seconds;
}

export default function TopBar({ interviewId, roleTitle }: { interviewId: string, roleTitle: string }) {
    // useConnectionState() : this hook tells current connection status
    // ConnectionState: set of predefined values from livekit client; comparing hook's value against it; [connecting, connected, disconnected]
    const connected = useConnectionState() === ConnectionState.Connected;  
    const elapsed = useElapsedSeconds(connected);
    const mm = String(Math.floor(elapsed / 60)).padStart(2, "0"); // minutes format
    const ss = String(elapsed % 60).padStart(2, "0"); // seconds format

    return (
    <header className="flex items-center justify-between border-b border-white/10 bg-white/5 px-5 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
        <span className="text-lg text-zinc-300 font-extrabold mr-2">PrepIV</span>
        <span className="rounded-full bg-white/5 px-3 py-1 font-mono text-xs text-zinc-300">
            Interview · {interviewId.slice(0, 8)}
        </span>
        <span className="hidden text-sm text-zinc-400 sm:inline">{roleTitle}</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-sm tabular-nums text-zinc-200">
        <span
            className={`h-2 w-2 rounded-full ${
            connected ? "animate-pulse bg-emerald-500" : "bg-zinc-600"
            }`}
        />
        {mm}:{ss}
        </div>
    </header>
    );
}
