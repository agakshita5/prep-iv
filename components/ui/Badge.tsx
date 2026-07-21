import type { ReactNode } from "react";

type Tone = "neutral" | "coral" | "amber" | "rose";

const tones: Record<Tone, string> = {
  neutral: "bg-ink/5 text-muted",
  coral: "bg-coral/12 text-coral-deep",
  amber: "bg-amber/15 text-amber-700",
  rose: "bg-rose/12 text-rose",
};

export default function Badge({ children, tone = "neutral", className = "" }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${tones[tone]} ${className}`} >
      {children}
    </span>
  );
}
