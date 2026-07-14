// recruiter dashboard
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { getRecruiterInterviews } from "@/lib/db/recruiter";
import NewScreeningModal from "@/components/recruiter/NewScreeningModal";
import CopyLinkButton from "@/components/recruiter/CopyLinkButton";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function Recruiter() {
  const { userId } = await auth();
  if (!userId) return null;

  const interviews = await getRecruiterInterviews(userId);

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Recruiter dashboard</h1>
        <NewScreeningModal />
      </div>

      {interviews.length === 0 ? (
        <div className="mt-6 rounded-xl border p-8 text-center">
          <h2 className="text-lg font-semibold">No screenings yet</h2>
          <p className="mt-2 text-sm text-gray-500">
            Create a screening interview and share the link with a candidate.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {interviews.map((interview) => {
            const unclaimed = interview.candidate_id === null;
            const completed = interview.status === "completed";
            return (
              <div
                key={interview.id}
                className="rounded-xl border p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{interview.role_title}</h3>
                    <p className="text-sm text-gray-500">
                      {unclaimed
                        ? "Pending · waiting on candidate"
                        : completed
                          ? "Completed"
                          : "In progress"}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      {formatDate(interview.created_at)}
                    </p>
                  </div>

                  <div className="shrink-0">
                    {unclaimed && <CopyLinkButton interviewId={interview.id} />}
                    {completed && (
                      <Link
                        href={`/recruiter/evaluations/${interview.id}`}
                        className="rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-zinc-700"
                      >
                        View report
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
