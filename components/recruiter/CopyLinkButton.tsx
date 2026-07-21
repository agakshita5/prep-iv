"use client";

import { useState } from "react";

// copies the shareable invite link for a pending interview to the clipboard.
export default function CopyLinkButton({ interviewId }: { interviewId: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    const url = `${window.location.origin}/invite/${interviewId}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      onClick={copy}
      className="rounded-full border border-coral/40 bg-coral/10 px-3 py-1.5 text-xs font-medium text-coral-deep transition hover:bg-coral/20"
    >
      {copied ? "Copied!" : "Copy invite link"}
    </button>
  );
}
