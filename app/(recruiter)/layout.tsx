import { requireRole } from "@/lib/auth";

export default async function RecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole("recruiter");
  return <>{children}</>;
}
