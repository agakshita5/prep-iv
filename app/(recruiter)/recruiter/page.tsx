// recruiter dashboard
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { getRecruiterInterviews } from "@/lib/db/recruiter";

export default async function Recruiter() {
  const { userId } = await auth();
  if (!userId) return null;

  // userId here is the recruiter
  const interviews = await getRecruiterInterviews(userId);

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-10">
      <h1 className="text-2xl font-semibold">Recruiter dashboard</h1>

      {interviews.length === 0 ? (
        <div className="mt-6 rounded-xl border p-8 text-center">
          <h2 className="text-lg font-semibold">No interviews yet</h2>
          <p className="mt-2 text-sm text-gray-500">
            Create a screening interview to see it here.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {interviews.map((interview) => (
            <Link
              key={interview.id}
              href={`/interview/${interview.id}`}
              className="block rounded-xl border p-4 transition hover:bg-gray-50"
            >
              <h3 className="font-semibold">{interview.role_title}</h3>
              <p className="text-sm text-gray-500">{interview.status}</p>
              <p className="text-xs text-gray-400">
                {new Date(interview.created_at).toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
