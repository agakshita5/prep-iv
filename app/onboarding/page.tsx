// role selection

import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getRole, type Role } from "@/lib/auth";

// Server Action: runs on the server when a role form is submitted.
async function selectRole(formData: FormData) {
  "use server";

  const role = formData.get("role");
  if (role !== "candidate" && role !== "recruiter") return;

  const { userId } = await auth();
  if (!userId) redirect("/");

  const client = await clerkClient();
  await client.users.updateUser(userId, {
    publicMetadata: { role: role as Role },
  });

  redirect(role === "candidate" ? "/candidate" : "/recruiter");
}

export default async function Onboarding() {
  const role = await getRole();
  if (role) redirect(role === "candidate" ? "/candidate" : "/recruiter");

  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center gap-6 px-6 py-20">
      <h3 className="text-2xl font-semibold">How would you like to use PrepIV?</h3>
      <div className="flex gap-4">
        <form action={selectRole} className="flex-1">
          <input type="hidden" name="role" value="candidate" />
          <button
            type="submit"
            className="w-full rounded-xl border p-5 text-left transition hover:border-zinc-900"
          >
            <b className="block">Candidate</b>
            <span className="text-sm text-zinc-600">
              Practice interviews · Get feedback
            </span>
          </button>
        </form>

        <form action={selectRole} className="flex-1">
          <input type="hidden" name="role" value="recruiter" />
          <button
            type="submit"
            className="w-full rounded-xl border p-5 text-left transition hover:border-zinc-900"
          >
            <b className="block">Recruiter</b>
            <span className="text-sm text-zinc-600">
              Create interviews · Evaluate talent
            </span>
          </button>
        </form>
      </div>
    </main>
  );
}
