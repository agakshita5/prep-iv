// recruiter dashboard
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { BriefcaseIcon, HourglassIcon, CheckCircleIcon, ClockIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { getRecruiterInterviews } from "@/lib/db/recruiter";
import NewScreeningModal from "@/components/recruiter/NewScreeningModal";
import CopyLinkButton from "@/components/recruiter/CopyLinkButton";
import PageHeader from "@/components/ui/PageHeader";
import StatTile from "@/components/ui/StatTile";
import Badge from "@/components/ui/Badge";

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
  const pending = interviews.filter((i) => i.candidate_id === null).length;
  const completed = interviews.filter((i) => i.status === "completed").length;

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-10">
      <PageHeader
        title="Screenings"
        subtitle="Create a screening and share the link with a candidate."
        action={<NewScreeningModal />}
      />

      <div className="mt-6 grid grid-cols-3 gap-4">
        <StatTile icon={BriefcaseIcon} value={interviews.length} label="Screenings" />
        <StatTile icon={HourglassIcon} value={pending} label="Awaiting candidate" accent="amber" />
        <StatTile icon={CheckCircleIcon} value={completed} label="Completed" accent="neutral" />
      </div>

      {interviews.length === 0 ? (
        <div className="mt-8 flex flex-col items-center rounded-2xl border border-line bg-surface p-12 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-coral/12">
            <BriefcaseIcon weight="duotone" size={26} className="text-coral" />
          </span>
          <h2 className="mt-4 font-display text-lg font-semibold">No screenings yet</h2>
          <p className="mt-1 max-w-sm text-sm text-muted">
            Create a screening interview and share the link with a candidate.
          </p>
          <div className="mt-5">
            <NewScreeningModal />
          </div>
        </div>
      ) : (
        <div className="mt-8 space-y-3">
          {interviews.map((interview) => {
            const unclaimed = interview.candidate_id === null;
            const isCompleted = interview.status === "completed";
            return (
              <div
                key={interview.id}
                className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 shadow-[0_1px_2px_rgba(28,25,23,0.04)]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-coral/10">
                  <BriefcaseIcon weight="duotone" size={22} className="text-coral" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium">{interview.role_title}</h3>
                  <div className="mt-1 flex items-center gap-2">
                    {unclaimed ? (
                      <Badge tone="amber">
                        <HourglassIcon size={12} /> Awaiting candidate
                      </Badge>
                    ) : isCompleted ? (
                      <Badge tone="coral">
                        <CheckCircleIcon weight="fill" size={12} /> Completed
                      </Badge>
                    ) : (
                      <Badge tone="neutral">
                        <ClockIcon size={12} /> In progress
                      </Badge>
                    )}
                    <span className="text-xs text-muted">
                      {formatDate(interview.created_at)}
                    </span>
                  </div>
                </div>

                <div className="shrink-0">
                  {unclaimed && <CopyLinkButton interviewId={interview.id} />}
                  {isCompleted && (
                    <Link
                      href={`/recruiter/evaluations/${interview.id}`}
                      className="inline-flex items-center gap-1 rounded-full bg-coral px-4 py-2 text-xs font-medium text-white transition hover:bg-coral-deep"
                    >
                      View report <ArrowRightIcon size={13} weight="bold" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
