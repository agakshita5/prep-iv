"use client";

import { useState, useTransition } from "react";
import { createScreening } from "@/app/(recruiter)/recruiter/actions";

export default function NewScreeningModal() {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  // client action wrapper: run the server action, then close on success
  function onCreate(formData: FormData) {
    startTransition(async () => {
      await createScreening(formData);
      setOpen(false);
    });
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-full bg-coral px-4 py-2 text-sm font-medium text-surface transition hover:bg-coral-deep"
      >
        + New screening
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-line bg-surface p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">
                New screening interview
              </h2>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-muted transition hover:text-ink"
              >
                ✕
              </button>
            </div>

            <form action={onCreate} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-ink">
                  Role title
                </label>
                <input
                  name="role_title"
                  required
                  placeholder="e.g. Frontend Engineer"
                  className="w-full rounded-lg border border-line bg-bg px-3 py-2 text-sm outline-none focus:border-coral"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-ink">
                  Job description
                </label>
                <textarea
                  name="jd_text"
                  rows={6}
                  placeholder="Paste the job description"
                  className="w-full resize-none rounded-lg border border-line bg-bg px-3 py-2 text-sm outline-none focus:border-coral"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full px-4 py-2 text-sm text-muted transition hover:bg-ink/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={pending}
                  className="rounded-full bg-coral px-4 py-2 text-sm font-medium text-surface transition hover:bg-coral-deep disabled:opacity-60"
                >
                  {pending ? "Creating…" : "Create & get link"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
