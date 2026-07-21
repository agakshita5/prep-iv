// candidate report page
import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getInterviewById } from "@/lib/db/interview";
import { getEvaluation } from "@/lib/db/evaluation";
import CandidateReport from "@/components/reports/CandidateReport";
import Display from "@/components/ui/Display";
import { ArrowLeftIcon } from "@phosphor-icons/react";

export default async function CandidateReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { userId } = await auth();
  if (!userId) redirect("/");

  const interview = await getInterviewById(id);
  // only the candidate of this interview may see their report
  if (!interview || interview.candidate_id !== userId) notFound();

  const evaluation = await getEvaluation(id);
  const report = evaluation?.candidate_report ?? null;

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-10">
      <div className="mb-6">
        <Link href="/candidate" className="text-sm text-muted hover:text-ink">
        <ArrowLeftIcon>Dashboard</ArrowLeftIcon> 
        </Link>
        <Display as="h1" className="mt-1 text-2xl font-semibold">
          {interview.role_title} — interview report
        </Display>
      </div>

      {report ? (
        <CandidateReport report={report} />
      ) : (
        <div className="rounded-2xl border border-line bg-surface p-10 text-center">
          <h2 className="font-display text-lg font-semibold">Report not ready yet</h2>
          <p className="mt-2 text-sm text-muted">
            Your report is generated right after the interview ends. If you just
            finished, give it a few seconds and refresh.
          </p>
        </div>
      )}
    </div>
  );
}
