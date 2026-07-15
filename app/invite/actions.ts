"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getInterviewById, claimInterview } from "@/lib/db/interview";
import { getRole } from "@/lib/auth";
import { parseResumePdf } from "@/lib/ingest";

// parse resume -> claim -> set candidate role if unset -> enter the room
export async function claimAndStart(formData: FormData) {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const interviewId = String(formData.get("interview_id") ?? "");
  const interview = await getInterviewById(interviewId);

  if (!interview || interview.recruiter_id === null) redirect("/");

  // candidate verified goes to interview room
  if (interview.candidate_id === userId) redirect(`/interview/${interviewId}`);
  // taken by someone else -> bounce back with a flag
  if (interview.candidate_id) redirect(`/invite/${interviewId}?taken=1`);

  const file = formData.get("resume");
  if (!(file instanceof File) || file.size === 0) return; // resume required

  const resumeText = await parseResumePdf(file);

  const claimed = await claimInterview(interviewId, userId, resumeText);
  if (!claimed) redirect(`/invite/${interviewId}?taken=1`); 

  // give new users the candidate role so no overwriting an existing role
  const role = await getRole();
  if (!role) {
    const client = await clerkClient();
    await client.users.updateUser(userId, {
      publicMetadata: { role: "candidate" },
    });
  }

  redirect(`/interview/${interviewId}`);
}
