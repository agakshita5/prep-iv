import { requireRole } from "@/lib/auth";
import AppHeader from "@/components/AppHeader";

export default async function CandidateLayout({children}: {children: React.ReactNode}) {
  await requireRole("candidate");
  return (
    <div className="bg-textured grain relative flex min-h-screen flex-col bg-bg text-ink">
      <AppHeader role="candidate" />
      {children}
    </div>
  );
}
