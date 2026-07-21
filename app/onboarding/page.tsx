// role selection

import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getRole, type Role } from "@/lib/auth";
import Display from "@/components/ui/Display";

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
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-1 flex-col justify-center gap-8 px-6 py-20">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted">
          Welcome
        </p>
        <Display as="h1" className="mt-2 text-3xl font-semibold">
          How would you like to use PrepIV?
        </Display>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <form action={selectRole} className="flex-1">
          <input type="hidden" name="role" value="candidate" />
          <button
            type="submit"
            className="w-full rounded-2xl border border-line bg-surface p-6 text-left transition hover:border-coral"
          >
            <b className="block text-lg">Candidate</b>
            <span className="mt-1 block text-sm text-muted">
              Practice interviews · Get feedback
            </span>
          </button>
        </form>

        <form action={selectRole} className="flex-1">
          <input type="hidden" name="role" value="recruiter" />
          <button
            type="submit"
            className="w-full rounded-2xl border border-line bg-surface p-6 text-left transition hover:border-coral"
          >
            <b className="block text-lg">Recruiter</b>
            <span className="mt-1 block text-sm text-muted">
              Create interviews · Evaluate talent
            </span>
          </button>
        </form>
      </div>
    </main>
  );
}
