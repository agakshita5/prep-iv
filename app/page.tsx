// landing page (public)

import { MicrophoneStageIcon, MagicWandIcon, ChartLineUpIcon, SparkleIcon, WaveformIcon } from "@phosphor-icons/react/dist/ssr";
import AuthButtons from "@/components/AuthButtons";
import Display from "@/components/ui/Display";

const FEATURES = [
  {
    icon: MicrophoneStageIcon,
    title: "Real-time voice",
    desc: "A natural spoken interview with barge-in — not a text box.",
  },
  {
    icon: MagicWandIcon,
    title: "Adaptive questions",
    desc: "Tailored to the job description and your resume, live.",
  },
  {
    icon: ChartLineUpIcon,
    title: "Evidence-backed reports",
    desc: "Scored competencies, speaking insights, and next steps.",
  },
];

export default function Home() {
  return (
    <div className="bg-textured grain relative flex min-h-screen flex-col bg-bg text-ink">
      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-baseline gap-1">
          <Display as="span" className="text-2xl font-semibold">
            PrepIV
          </Display>
        </div>
        <AuthButtons />
      </header>

      <main className="relative z-10 mx-auto grid w-full max-w-6xl flex-1 items-center gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-muted">
            <SparkleIcon weight="fill" size={14} className="text-coral" />
            AI interview preparation & screening
          </span>
          <Display
            as="h1"
            className="mt-6 text-5xl font-semibold leading-[1.02] text-balance sm:text-6xl"
          >
            Practice sharper interviews and screen candidates with{" "}
            <span className="text-coral">confidence</span>.
          </Display>
          <p className="mt-6 max-w-lg text-lg leading-8 text-muted">
            Rehearse real, adaptive AI voice interviews — or run screenings and
            get evidence-backed hiring reports. All in one clean workspace.
          </p>
          <div className="mt-8">
            <AuthButtons />
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title}>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-coral/12">
                  <Icon weight="duotone" size={22} className="text-coral" />
                </span>
                <h3 className="mt-3 text-sm font-semibold">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="rotate-[1.5deg] rounded-3xl bg-zinc-950 p-5 shadow-[0_40px_80px_-30px_rgba(28,25,23,0.5)]">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span className="rounded-full bg-white/5 px-2.5 py-1 font-mono">
                Interview · a1b2c3
              </span>
              <span className="flex items-center gap-1.5 font-mono tabular-nums text-zinc-200">
                <span className="h-2 w-2 animate-pulse rounded-full bg-coral" />
                04:21
              </span>
            </div>
            <div className="mt-4 grid grid-cols-[1.6fr_1fr] gap-3">
              <div className="flex h-44 items-end rounded-2xl bg-gradient-to-b from-zinc-800 to-zinc-900 p-3 ring-1 ring-white/10">
                <span className="rounded-md bg-black/50 px-2 py-1 text-[10px] text-zinc-200">
                  You
                </span>
              </div>
              <div className="flex h-44 flex-col items-center justify-center gap-3 rounded-2xl bg-gradient-to-b from-coral/20 to-zinc-900 ring-1 ring-white/10">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-coral/15">
                  <WaveformIcon weight="duotone" size={26} className="text-coral" />
                </span>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] text-zinc-200">
                  Listening…
                </span>
              </div>
            </div>
          </div>

          {/* floating score chip */}
          <div className="absolute -bottom-5 -left-4 rotate-[-3deg] rounded-2xl border border-line bg-surface px-4 py-3 shadow-[0_20px_40px_-20px_rgba(28,25,23,0.4)]">
            <div className="flex items-center gap-2">
              <ChartLineUpIcon weight="duotone" size={18} className="text-coral" />
              <span className="font-display text-2xl font-semibold leading-none">82</span>
              <span className="text-xs text-muted">/ 100</span>
            </div>
            <div className="mt-1 text-[10px] text-muted">Overall score</div>
          </div>
        </div>
      </main>
    </div>
  );
}
