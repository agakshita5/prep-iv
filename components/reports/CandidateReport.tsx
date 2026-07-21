"use client";

import { useState } from "react";
import type { CandidateReport as Report, Competency } from "@/lib/db/evaluation";
import ScoreComponent from "./ScoreComp";
import CompetencyRadar from "./CompetencyRadar";

function label(name: string) {
  return name.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function Card({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5">
      {title && (
        <h3 className="mb-3 text-sm font-semibold text-ink">{title}</h3>
      )}
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

function Stat({
  value,
  unit,
  label,
}: {
  value: number | string;
  unit: string;
  label: string;
}) {
  return (
    <div className="rounded-xl bg-bg p-3">
      <div className="text-xl font-semibold">
        {value}
        {unit && <span className="ml-0.5 text-xs text-muted">{unit}</span>}
      </div>
      <div className="mt-1 text-xs text-muted">{label}</div>
    </div>
  );
}

export default function CandidateReport({ report }: { report: Report }) {
  const [tab, setTab] = useState<"overview" | "questions">("overview");

  const competencies = report.competencies ?? [];
  const insights = report.speaking_insights;
  const questions = report.questions ?? [];

  return (
    <div>
      {/* Tabs */}
      <div className="mb-6 flex gap-2 border-b border-line">
        {(["overview", "questions"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium capitalize transition ${
              tab === t
                ? "border-coral text-coral-deep"
                : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {t === "questions" ? `Questions (${questions.length})` : t}
          </button>
        ))}
      </div>

      {tab === "overview" ? (
        <div className="grid gap-5 sm:grid-cols-2">
          <Card title="Overall score">
            <div className="flex items-center gap-6">
              <ScoreComponent score={report.overall_score ?? 0} />
              <p className="flex-1 text-sm text-muted">
                {report.personalized_feedback ?? "—"}
              </p>
            </div>
          </Card>

          <Card title="Competency profile">
            <CompetencyRadar competencies={competencies} />
          </Card>

          <Card title="Competency scores">
            <CompetencyBars items={competencies} />
          </Card>

          <Card title="Speaking insights">
            {insights ? (
              <div className="grid grid-cols-3 gap-3 text-center">
                <Stat value={insights.words_per_minute ?? "—"} unit="wpm" label="Pace" />
                <Stat value={insights.filler_words?.count ?? 0} unit="" label="Filler words" />
                <Stat value={insights.interruptions ?? "—"} unit="" label="Interruptions" />
              </div>
            ) : (
              <p className="text-sm text-muted">No speaking data.</p>
            )}
          </Card>

          <Card title="Strengths">
            <ul className="list-disc space-y-1 pl-5 text-sm text-ink">
              {(report.strengths ?? []).map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </Card>

          <Card title="Areas to improve">
            <ul className="list-disc space-y-1 pl-5 text-sm text-ink">
              {(report.improvement_areas ?? []).map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </Card>

          <div className="sm:col-span-2">
            <Card title="Improvement plan">
              <ol className="space-y-3">
                {(report.improvement_plan ?? []).map((p, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-coral/15 text-xs font-semibold text-coral-deep">
                      {i + 1}
                    </span>
                    <div>
                      <div className="text-sm font-medium">{p.action}</div>
                      <div className="text-sm text-muted">{p.why}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </Card>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {questions.length === 0 ? (
            <p className="text-sm text-muted">No questions recorded.</p>
          ) : (
            questions.map((qa, i) => (
              <div key={i} className="rounded-2xl border border-line bg-surface p-5">
                <div className="mb-2 flex items-start justify-between gap-4">
                  <div className="text-sm font-medium text-ink">
                    Q{i + 1}. {qa.question}
                  </div>
                  {qa.response_seconds != null && (
                    <span className="shrink-0 rounded-full bg-ink/5 px-2.5 py-1 text-xs text-muted">
                      {qa.response_seconds}s to respond
                    </span>
                  )}
                </div>
                <p className="rounded-xl bg-bg p-3 text-sm text-ink">{qa.answer}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
