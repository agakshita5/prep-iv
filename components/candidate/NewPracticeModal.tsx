"use client";

import { useState, useTransition } from "react";
import { PlusIcon, XIcon } from "@phosphor-icons/react";
import { createPractice } from "@/app/(candidate)/candidate/actions";

export default function NewPracticeModal() {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  // action redirects into the room on success, so no manual close needed
  function onCreate(formData: FormData) {
    startTransition(async () => {
      await createPractice(formData);
    });
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full bg-coral px-4 py-2 text-sm font-medium text-white shadow-sm shadow-coral/30 transition hover:-translate-y-0.5 hover:bg-coral-deep"
      >
        <PlusIcon weight="bold" size={16} /> New practice
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-line bg-surface p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">
                New practice interview
              </h2>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-muted transition hover:text-ink"
              >
                <XIcon size={18} />
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
                  Job description{" "}
                  <span className="font-normal text-muted">(optional)</span>
                </label>
                <textarea
                  name="jd_text"
                  rows={5}
                  placeholder="Paste a job description to tailor your questions…"
                  className="w-full resize-none rounded-lg border border-line bg-bg px-3 py-2 text-sm outline-none focus:border-coral"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-ink">
                  Resume <span className="font-normal text-muted">(optional PDF)</span>
                </label>
                <input
                  type="file"
                  name="resume"
                  accept="application/pdf"
                  className="block w-full text-sm text-muted file:mr-3 file:rounded-full file:border-0 file:bg-ink/5 file:px-3 file:py-2 file:text-sm file:font-medium hover:file:bg-ink/10"
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
                  className="rounded-full bg-coral px-4 py-2 text-sm font-medium text-white transition hover:bg-coral-deep disabled:opacity-60"
                >
                  {pending ? "Starting…" : "Start interview"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
