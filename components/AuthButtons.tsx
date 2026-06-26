"use client";

import { SignUpButton, UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function AuthButtons() {
  const { userId } = useAuth();

  return (
    <div className="flex items-center gap-3">
      {!userId ? (
        <SignUpButton mode="modal" forceRedirectUrl="/onboarding">
          <button className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 transition hover:bg-zinc-700">
            Get started
          </button>
        </SignUpButton>
      ) : (
        <>
          <Link
            href="/onboarding"
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 transition hover:bg-zinc-700"
          >
            Enter PrepIV
          </Link>
          <UserButton />
        </>
      )}
    </div>
  );
}
