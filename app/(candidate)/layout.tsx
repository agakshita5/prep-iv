import { requireRole } from "@/lib/auth";

export default async function CandidateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole("candidate");
  return <>{children}</>;
}

