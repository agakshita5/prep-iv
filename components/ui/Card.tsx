import type { ReactNode } from "react";

export default function Card({ children, className = "", hover = false }: { children: ReactNode; className?: string; hover?: boolean }) {
  return (
    <div
      className={`rounded-2xl border border-line bg-surface p-5 shadow-[0_1px_2px_rgba(28,25,23,0.04),0_8px_24px_-12px_rgba(28,25,23,0.12)] ${
        hover
          ? "transition hover:-translate-y-0.5 hover:shadow-[0_1px_2px_rgba(28,25,23,0.04),0_16px_36px_-16px_rgba(251,90,60,0.35)]"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
