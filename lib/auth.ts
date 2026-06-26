import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export type Role = "candidate" | "recruiter";

// Returns the signed-in user's role, or null if they haven't onboarded.
export async function getRole(): Promise<Role | null> {
  const { sessionClaims } = await auth();
  const claimRole = sessionClaims?.metadata?.role;
  if (claimRole) return claimRole; // read from the session JWT

  const user = await currentUser();
  return user?.publicMetadata.role ?? null; // fallback: read from the user record
}

export async function requireRole(role: Role): Promise<void> {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const current = await getRole();
  if (!current) redirect("/onboarding");
  if (current !== role) {
    redirect(current === "candidate" ? "/candidate" : "/recruiter"); // wrong role, stay on their dashboard
  }
}
