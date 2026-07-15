import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { getInterviewById } from "@/lib/db/interview";
import { claimAndStart } from "../actions";
import ClaimForm from "@/components/invite/ClaimForm";

export default async function InvitePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ taken?: string }>;
}) {
  const { id } = await params;
  const { taken } = await searchParams;

  const { userId } = await auth();
  if (!userId) redirect("/"); // proxy already forces sign-in; belt and suspenders

  const interview = await getInterviewById(id);
  // only recruiter-created screenings are claimable via an invite link
  if (!interview || interview.recruiter_id === null) notFound();

  // already claimed by me -> go straight to the room
  if (interview.candidate_id === userId) redirect(`/interview/${id}`);

  const alreadyTaken = interview.candidate_id !== null;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-lg flex-col justify-center px-6 py-16">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-600">
        Interview invitation
      </p>
      <h1 className="mt-2 text-2xl font-semibold">{interview.role_title}</h1>
      <p className="mt-2 text-sm text-zinc-600">
        You’ve been invited to a screening interview for this role.
      </p>

      <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6">
        {alreadyTaken ? (
          <div className="text-center">
            <h2 className="text-lg font-semibold">This invite is no longer available</h2>
            <p className="mt-2 text-sm text-zinc-500">
              {taken
                ? "Someone else just started this interview."
                : "This interview has already been taken."}
            </p>
          </div>
        ) : (
          <>
            <h2 className="mb-4 text-base font-semibold">Ready to begin?</h2>
            <ClaimForm interviewId={id} action={claimAndStart} />
          </>
        )}
      </div>
    </main>
  );
}
