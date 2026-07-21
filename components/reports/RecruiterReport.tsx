import type { RecruiterReport as Report, Competency } from "@/lib/db/evaluation";
import CompetencyRadar from "./CompetencyRadar";
import Badge from "@/components/ui/Badge";

function label(name: string) {
  return name.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function Card({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      {title && <h3 className="mb-3 text-sm font-semibold text-ink">{title}</h3>}
      {children}
    </div>
  );
}

function CompetencyBars({ items }: { items: Competency[] }) {
  return (
    <div className="space-y-3">
      {items.map((c) => (
        <div key={c.name}>
          <div className="mb-1 flex justify-between text-sm">
            <span>{label(c.name)}</span>
            <span className="text-muted">
              {c.score == null ? "N/A" : `${c.score}/5`}
            </span>
          </div>
          <div className="h-2 rounded-full bg-ink/5">
            <div
              className="h-2 rounded-full bg-coral"
              style={{ width: `${((c.score ?? 0) / 5) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

const REC = {
  hire: { text: "Hire", cls: "bg-coral/15 text-coral-deep" },
  maybe: { text: "Maybe", cls: "bg-amber/15 text-amber-700" },
  reject: { text: "Reject", cls: "bg-rose/12 text-rose" },
} as const;

function SkillChips({ items, tone }: { items: string[]; tone: "coral" | "amber" | "neutral" }) {
  if (!items.length) return <p className="text-sm text-muted">—</p>;
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((s, i) => (
        <Badge key={i} tone={tone}>
          {s}
        </Badge>
      ))}
    </div>
  );
}

export default function RecruiterReport({ report }: { report: Report }) {
  const competencies = report.competencies ?? [];
  const rec = report.recommendation ? REC[report.recommendation] : null;
  const confidence = report.confidence ?? 0;

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {/* Recommendation + confidence */}
      <Card title="Recommendation">
        <div className="flex items-center gap-4">
          {rec ? (
            <span
              className={`rounded-full px-4 py-1.5 text-lg font-semibold ${rec.cls}`}
            >
              {rec.text}
            </span>
          ) : (
            <span className="text-muted">—</span>
          )}
        </div>
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-xs text-muted">
            <span>Confidence</span>
            <span>{confidence}%</span>
          </div>
          <div className="h-2 rounded-full bg-ink/5">
            <div
              className="h-2 rounded-full bg-coral"
              style={{ width: `${confidence}%` }}
            />
          </div>
        </div>
      </Card>

      <Card title="Competency profile">
        <CompetencyRadar competencies={competencies} />
      </Card>

      <Card title="Competency scores">
        <CompetencyBars items={competencies} />
      </Card>

      <Card title="Summary">
        <p className="text-sm text-ink">{report.summary ?? "—"}</p>
        {report.role_alignment && (
          <>
            <h4 className="mt-4 mb-1 text-xs font-semibold uppercase tracking-wide text-muted">
              Role alignment
            </h4>
            <p className="text-sm text-ink">{report.role_alignment}</p>
          </>
        )}
      </Card>

      <div className="sm:col-span-2">
        <Card title="Evidence-backed strengths">
          <ul className="space-y-2">
            {(report.strengths ?? []).map((s, i) => (
              <li key={i} className="text-sm">
                <span className="font-medium text-ink">{s.point}</span>
                {s.evidence && (
                  <span className="text-muted"> — “{s.evidence}”</span>
                )}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Skills matrix */}
      <div className="sm:col-span-2">
        <Card title="Skills matrix">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                Demonstrated
              </h4>
              <SkillChips items={report.skills_demonstrated ?? []} tone="coral" />
            </div>
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                Limited evidence
              </h4>
              <SkillChips items={report.skills_limited_evidence ?? []} tone="amber" />
            </div>
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                Not assessed
              </h4>
              <SkillChips items={report.skills_not_assessed ?? []} tone="neutral" />
            </div>
          </div>
        </Card>
      </div>

      <Card title="Areas to probe next round">
        <ul className="list-disc space-y-1 pl-5 text-sm text-ink">
          {(report.areas_to_probe ?? []).map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </Card>

      <Card title="Hiring rationale">
        <p className="text-sm text-ink">{report.hiring_rationale ?? "—"}</p>
      </Card>
    </div>
  );
}
