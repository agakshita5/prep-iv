import { auth, currentUser } from "@clerk/nextjs/server";
import { getInterviewById, isParticipant } from "@/lib/db/interview";
import { notFound, redirect } from "next/navigation";
import { createInterviewToken } from "@/lib/livekit";
import InterviewRoom from "@/components/interview/InterviewRoom";

export default async function InterviewRoomPage({params}:
  {params: Promise<{roomId: string}> }) {
  const { roomId } = await params;
  const { userId } = await auth();

  if(!userId) return redirect('/');

  const interview = await getInterviewById(roomId);
  if(!interview || !isParticipant(interview, userId)) notFound();

  const serverUrl = process.env.LIVEKIT_URL;
  if (!serverUrl) throw new Error("LIVEKIT_URL is not set");

  const user = await currentUser();
  const displayName = user?.firstName ?? "You";
  const token = await createInterviewToken(roomId, userId, displayName);

  // where disconnect returns the user
  const returnTo = interview.candidate_id === userId ? "/candidate" : "/recruiter";

  return(
    <>
      <InterviewRoom 
        token={token} 
        serverUrl={serverUrl} 
        interviewId={roomId}
        roleTitle={interview.role_title}
        returnTo={returnTo}
      />
    </>
  );
}