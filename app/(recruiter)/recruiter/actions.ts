"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { createInterview } from "@/lib/db/interview";

export async function createScreening(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const roleTitle = String(formData.get("role_title") ?? "").trim();
  const jdText = String(formData.get("jd_text") ?? "").trim();
  if (!roleTitle) return;

  await createInterview(userId, roleTitle, jdText);
  revalidatePath("/recruiter");
}