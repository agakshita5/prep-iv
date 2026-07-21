"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createPracticeInterview } from "@/lib/db/interview";
import { parseResumePdf } from "@/lib/ingest";

// Candidate starts a solo practice: role + JD + optional resume -> interview -> room.
export async function createPractice(formData: FormData) {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const roleTitle = String(formData.get("role_title") ?? "").trim();
  const jdText = String(formData.get("jd_text") ?? "").trim();
  if (!roleTitle) return;

  let resumeText = "";
  const file = formData.get("resume");
  if (file instanceof File && file.size > 0) {
    resumeText = await parseResumePdf(file);
  }

  const interview = await createPracticeInterview(userId, roleTitle, jdText, resumeText);
  redirect(`/interview/${interview.id}`);
}
