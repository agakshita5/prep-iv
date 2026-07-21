// candidate dashboard
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { MicrophoneStageIcon, CheckCircleIcon, StudentIcon, ArrowRightIcon, ClockIcon } from "@phosphor-icons/react/dist/ssr";
import { getCandidateInterviews } from "@/lib/db/candidate";
import PageHeader from "@/components/ui/PageHeader";
import StatTile from "@/components/ui/StatTile";
import Badge from "@/components/ui/Badge";
import NewPracticeModal from "@/components/candidate/NewPracticeModal";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function Candidate() {
  const { userId } = await auth();
  if (!userId) return null;

  const interviews = await getCandidateInterviews(userId);
  const completed = interviews.filter((i) => i.status === "completed").length;
  const practice = interviews.filter((i) => i.recruiter_id === null).length;

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-10">
      <PageHeader
        title="Your interviews"
        subtitle="Practice sessions and screenings you've taken."
        action={<NewPracticeModal />}
      />

      {/* stat row */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <StatTile icon={MicrophoneStageIcon} value={interviews.length} label="Interviews" />
        <StatTile icon={CheckCircleIcon} value={completed} label="Completed" accent="amber" />
        <StatTile icon={StudentIcon} value={practice} label="Practice sessions" accent="neutral" />
      </div>

      {interviews.length === 0 ? (
        <div className="mt-8 flex flex-col items-center rounded-2xl border border-line bg-surface p-12 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-coral/12">
            <MicrophoneStageIcon weight="duotone" size={26} className="text-coral" />
          </span>
          <h2 className="mt-4 font-display text-lg font-semibold">
            Ready for your first interview?
          </h2>
          <p className="mt-1 max-w-sm text-sm text-muted">
            Start a practice session — pick a role, drop in a job description, and
            let the AI interviewer take it from there.
          </p>
          <div className="mt-5">
            <NewPracticeModal />
          </div>
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          {interviews.map((interview) => {
            const isCompleted = interview.status === "completed";
            const hasReport = isCompleted && interview.recruiter_id === null;
            const href = hasReport
              ? `/candidate/reports/${interview.id}`
              : `/interview/${interview.id}`;

            return (
              <Link
                key={interview.id}
                href={href}
                className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 shadow-[0_1px_2px_rgba(28,25,23,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-18px_rgba(251,90,60,0.35)]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-coral/10">
                  <MicrophoneStageIcon weight="duotone" size={22} className="text-coral" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium">{interview.role_title}</h3>
                  <div className="mt-1 flex items-center gap-2">
                    {isCompleted ? (
                      <Badge tone="coral">
                        <CheckCircleIcon weight="fill" size={12} /> Completed
                      </Badge>
                    ) : (
                      <Badge tone="neutral">
                        <ClockIcon size={12} /> {interview.status}
                      </Badge>
                    )}
                    <span className="text-xs text-muted">
                      {formatDate(interview.created_at)}
                    </span>
                  </div>
                </div>
                {hasReport && (
                  <span className="flex shrink-0 items-center gap-1 text-sm font-medium text-coral">
                    Report
                    <ArrowRightIcon
                      size={15}
                      weight="bold"
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
