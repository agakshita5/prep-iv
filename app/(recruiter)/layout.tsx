import { requireRole } from "@/lib/auth";
import AppHeader from "@/components/AppHeader";

export default async function RecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole("recruiter");
  return (
    <div className="bg-textured grain relative flex min-h-screen flex-col bg-bg text-ink">
      <AppHeader role="recruiter" />
      {children}
    </div>
  );
}
