import { requireRole } from "@/lib/auth";

// Server component: gates everything under (candidate). Non-candidates are
// redirected before any child page renders.
export default async function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole("candidate");
  return <>{children}</>;
}
