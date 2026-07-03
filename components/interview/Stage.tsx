"use client";

import { Track } from "livekit-client"; // represent media track types
import { useTracks, useLocalParticipant, useVoiceAssistant, useIsSpeaking, VideoTrack, BarVisualizer, isTrackReference } from "@livekit/components-react";

const GLOW = "ring-2 ring-emerald-400 shadow-[0_0_45px_-8px_rgba(16,185,129,0.55)]";
const IDLE = "ring-1 ring-white/10";

export default function Stage() {
    const { localParticipant } = useLocalParticipant(); // information about current user
    const userSpeaking = useIsSpeaking(localParticipant);

    const cameraTracks = useTracks([Track.Source.Camera]);
    const localCamera = cameraTracks.find(
    (t) => t.participant.identity === localParticipant.identity
    );

    const { state, audioTrack } = useVoiceAssistant(); // gives access to the AI voice assistant in the room
    const aiSpeaking = state === "speaking";
    const waiting = state === "disconnected" || state === "connecting";

    return (
    <main className="flex flex-1 flex-col items-stretch justify-center gap-4 overflow-hidden p-4 sm:flex-row sm:gap-6 sm:p-6">
        <div
        className={`relative flex-[2] overflow-hidden rounded-3xl bg-zinc-900 transition sm:max-w-4xl ${
            userSpeaking ? GLOW : IDLE
        }`}
        >
        {localCamera && isTrackReference(localCamera) ? (
            <VideoTrack trackRef={localCamera} className="h-full w-full object-cover" />
        ) : (
            <div className="flex h-full min-h-48 items-center justify-center text-sm text-zinc-500">
            Starting camera…
            </div>
        )}
        <span className="absolute bottom-3 left-3 rounded-lg bg-black/50 px-2.5 py-1 text-xs backdrop-blur">
            You
        </span>
        </div>

        <div
        className={`relative flex flex-[1] flex-col items-center justify-center gap-5 overflow-hidden rounded-3xl bg-gradient-to-b from-emerald-500/10 to-zinc-900 transition sm:max-w-sm ${
            aiSpeaking ? GLOW : IDLE
        }`}
        >
        <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-emerald-500/10">
            {aiSpeaking && (
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/20" />
            )}
            <BarVisualizer
            state={state}
            track={audioTrack}
            barCount={5}
            className="h-14 w-20"
            options={{ minHeight: 6 }}
            />
        </div>
        <div className="text-center">
            <div className="text-sm font-medium">AI Interviewer</div>
            <span className="mt-1 inline-block rounded-full bg-white/5 px-3 py-1 text-xs capitalize text-zinc-300">
            {waiting ? "waiting…" : state}
            </span>
        </div>
        </div>
    </main>
    );
}
