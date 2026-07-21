import type { ComponentType, ReactNode } from "react";
import type { IconProps } from "@phosphor-icons/react";

type Accent = "coral" | "amber" | "neutral";

const accents: Record<Accent, { chip: string; icon: string }> = {
  coral: { chip: "bg-coral/12", icon: "text-coral" },
  amber: { chip: "bg-amber/15", icon: "text-amber-600" },
  neutral: { chip: "bg-ink/5", icon: "text-muted" },
};

export default function StatTile({ icon: Icon, value, label, accent = "coral" }: { icon: ComponentType<IconProps>; value: ReactNode; label: string; accent?: Accent }) {
  const a = accents[accent];
  return (
    <div className="rounded-2xl border border-line bg-surface p-4 shadow-[0_1px_2px_rgba(28,25,23,0.04),0_8px_24px_-14px_rgba(28,25,23,0.12)]">
      <span
        className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${a.chip}`}
      >
        <Icon weight="duotone" size={20} className={a.icon} />
      </span>
      <div className="mt-3 font-display text-2xl font-semibold leading-none">
        {value}
      </div>
      <div className="mt-1 text-xs text-muted">{label}</div>
    </div>
  );
}
