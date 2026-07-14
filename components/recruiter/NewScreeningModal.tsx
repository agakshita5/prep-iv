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
        className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
      >
        + New screening
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">New screening interview</h2>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="text-zinc-400 transition hover:text-zinc-700"
              >
                ✕
              </button>
            </div>

            <form action={onCreate} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-700">
                  Role title
                </label>
                <input
                  name="role_title"
                  required
                  placeholder="e.g. Frontend Engineer"
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-zinc-700">
                  Job description
                </label>
                <textarea
                  name="jd_text"
                  rows={6}
                  placeholder="Paste the job description"
                  className="w-full resize-none rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-2 text-sm text-zinc-600 transition hover:bg-zinc-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={pending}
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:opacity-60"
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
