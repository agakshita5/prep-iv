import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "outline" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-coral text-white shadow-sm shadow-coral/30 hover:bg-coral-deep hover:-translate-y-0.5",
  outline: "border border-line bg-surface text-ink hover:border-ink/30",
  ghost: "text-muted hover:bg-ink/5",
};

export default function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition disabled:opacity-60 disabled:translate-y-0 ${styles[variant]} ${className}`}
      {...props}
    />
  );
}
