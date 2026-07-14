"use client";

import { useState } from "react";

// copies the shareable invite link for a pending interview to the clipboard.
export default function CopyLinkButton(interviewId: {interviewId: string}) {
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
      className="rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 transition hover:bg-emerald-100"
    >
      {copied ? "Copied!" : "Copy invite link"}
    </button>
  );
}
