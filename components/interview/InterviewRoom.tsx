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
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-zinc-950 text-zinc-100">
      <LiveKitRoom
        token={token}
        serverUrl={serverUrl}
        connect
        video
        audio
        data-lk-theme="default"
        onDisconnected={() => router.push(returnTo)}
        style={{ display: "contents" }}
      >
        <RoomAudioRenderer />
        <TopBar interviewId={interviewId} roleTitle={roleTitle} />

       <div className="flex min-h-0 flex-1">
          <div className="relative flex min-h-0 flex-1 flex-col">
            <Stage />
            <ControlBar
              transcriptOpen={showTranscript}
              onToggleTranscript={() => setShowTranscript((s) => !s)}
            />
          </div>

          {showTranscript && (
            <TranscriptPanel onClose={() => setShowTranscript(false)} />
          )}
        </div>
      </LiveKitRoom>
    </div>
  );
}
