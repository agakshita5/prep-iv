'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LiveKitRoom, RoomAudioRenderer } from "@livekit/components-react";
import "@livekit/components-styles";
import TopBar from "./TopBar";
import Stage from "./Stage";
import ControlBar from "./ControlBar";
import TranscriptPanel from "./TranscriptPanel";

type Props = {
  token: string;
  serverUrl: string;
  interviewId: string;
  roleTitle: string;
  returnTo: string;
};

export default function InterviewRoom({token,serverUrl,interviewId,roleTitle,returnTo}: Props) {
  const [showTranscript, setShowTranscript] = useState(false);
  const router = useRouter();

  return (
    <LiveKitRoom
      token={token}
      serverUrl={serverUrl}
      connect
      video
      audio
      data-lk-theme="default"
      className="relative flex h-[100dvh] flex-col overflow-hidden bg-zinc-950 text-zinc-100"
      onDisconnected={() => router.push(returnTo)}
    >
      {/* plays the audio coming from remote participants (agent's audio) */}
      <RoomAudioRenderer />

      <TopBar interviewId={interviewId} roleTitle={roleTitle} />
      <Stage />
      <ControlBar transcriptOpen={showTranscript} onToggleTranscript={() => setShowTranscript((s) => !s)} />
      <TranscriptPanel
        open={showTranscript}
        onClose={() => setShowTranscript(false)}
      />
    </LiveKitRoom>
  );
}
