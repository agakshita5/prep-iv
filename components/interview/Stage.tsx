"use client";

import { Track } from "livekit-client"; // represent media track types
import { useTracks, useLocalParticipant, useVoiceAssistant, VideoTrack, BarVisualizer, isTrackReference } from "@livekit/components-react";

export default function Stage() {
  const { localParticipant } = useLocalParticipant(); // information about current user
  const cameraTracks = useTracks([Track.Source.Camera]);
  const localCamera = cameraTracks.find(
    (t) => t.participant.identity === localParticipant.identity
  );

  const { state, audioTrack } = useVoiceAssistant(); // gives access to the AI voice assistant in the room
  const waiting = state === "disconnected" || state === "connecting";

  return (
    <main className="flex flex-1 items-center justify-center gap-4 overflow-hidden p-4">
      {/* candidate camera */}
      <div className="relative h-full max-h-[72vh] flex-1 overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-white/10">
        {localCamera && isTrackReference(localCamera) ? (
          <VideoTrack
            trackRef={localCamera}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-zinc-500">
            Starting camera…
          </div>
        )}
        <span className="absolute bottom-3 left-3 rounded-md bg-black/50 px-2 py-1 text-xs">
          You
        </span>
      </div>

      {/* AI interviewer orb */}
      <div className="flex h-full max-h-[72vh] w-[280px] flex-col items-center justify-center gap-4 rounded-2xl bg-gradient-to-b from-emerald-500/10 to-zinc-900 ring-1 ring-white/10">
        <BarVisualizer
          state={state}
          track={audioTrack}
          barCount={5}
          className="h-24 w-32"
          options={{ minHeight: 8 }}
        />
        <div className="text-sm font-medium">AI Interviewer</div>
        <span className="rounded-full bg-white/5 px-3 py-1 text-xs capitalize text-zinc-300">
          {waiting ? "Waiting for interviewer…" : state}
        </span>
      </div>
    </main>
  );
}
