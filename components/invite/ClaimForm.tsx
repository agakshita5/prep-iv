"use client";

import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:opacity-60"
    >
      {pending ? "Preparing your interview…" : "Upload resume & start interview"}
    </button>
  );
}

export default function ClaimForm({interviewId, action}: { interviewId: string; action: (formData: FormData) => Promise<void> }) {
  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="interview_id" value={interviewId} />
      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700">
          Your resume (PDF)
        </label>
        <input
          type="file"
          name="resume"
          accept="application/pdf"
          required
          className="block w-full text-sm text-zinc-600 file:mr-3 file:rounded-lg file:border-0 file:bg-zinc-100 file:px-3 file:py-2 file:text-sm file:font-medium hover:file:bg-zinc-200"
        />
        <p className="mt-1 text-xs text-zinc-400">
          We extract the text to tailor your interview. The file isn't stored.
        </p>
      </div>
      <SubmitButton />
    </form>
  );
}
