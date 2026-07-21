// recruiter evaluated report page
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getInterviewById } from "@/lib/db/interview";
import { getEvaluation } from "@/lib/db/evaluation";
import RecruiterReport from "@/components/reports/RecruiterReport";
import Display from "@/components/ui/Display";

export default async function RecruiterEvaluationPage({params}: {params: Promise<{ id: string }>}) {
  const { id } = await params;
  const { userId } = await auth();
  if (!userId) redirect("/");

  const interview = await getInterviewById(id);
  // only the recruiter who owns this screening may see the hiring report
  if (!interview || interview.recruiter_id !== userId) notFound();

  const evaluation = await getEvaluation(id);
  const report = evaluation?.recruiter_report ?? null;

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-10">
      <div className="mb-6">
        <Link href="/recruiter" className="text-sm text-muted hover:text-ink">
          ← Dashboard
        </Link>
        <Display as="h1" className="mt-1 text-2xl font-semibold">
          {interview.role_title} — hiring report
        </Display>
      </div>

      {report ? (
        <RecruiterReport report={report} />
      ) : (
        <div className="rounded-2xl border border-line bg-surface p-10 text-center">
          <h2 className="font-display text-lg font-semibold">Report not ready yet</h2>
          <p className="mt-2 text-sm text-muted">
            The report is generated after the candidate finishes the interview.
          </p>
        </div>
      )}
    </div>
  );
}
