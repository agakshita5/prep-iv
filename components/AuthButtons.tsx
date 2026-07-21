"use client";

import { SignUpButton, UserButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function AuthButtons() {
  const { userId } = useAuth();

  return (
    <div className="flex items-center gap-3">
      {!userId ? (
        <SignUpButton mode="modal" forceRedirectUrl="/onboarding">
          <button className="rounded-full bg-coral px-4 py-2 text-sm font-medium text-surface transition hover:bg-coral-deep">
            Get started
          </button>
        </SignUpButton>
      ) : (
        <>
          <Link
            href="/onboarding"
            className="rounded-full bg-coral px-4 py-2 text-sm font-medium text-surface transition hover:bg-coral-deep"
          >
            Enter PrepIV
          </Link>
          <UserButton />
        </>
      )}
    </div>
  );
}
