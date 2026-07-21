import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import Display from "./ui/Display";

export default function AppHeader({
  role,
}: {
  role?: "candidate" | "recruiter";
}) {
  return (
    <header className="border-b border-line bg-surface/60 backdrop-blur">
      <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-4">
        <Link href={'/'} className="flex items-baseline gap-2">
          <Display as="span" className="text-2xl font-semibold">
            PrepIV
          </Display>
        </Link>
        <div className="flex items-center gap-4">
          {role && (
            <span className="hidden text-xs uppercase tracking-[0.16em] text-muted sm:inline">
              {role}
            </span>
          )}
          <UserButton />
        </div>
      </div>
    </header>
  );
}
