export type InterviewStatus = "pending" | "in_progress" | "completed";

export type Interview = {
  id: string; // interview's own uuid (used in /interview/[id])
  candidate_id: string; // Clerk userId of the candidate
  recruiter_id: string | null; // Clerk userId of the recruiter, or null for solo practice
  role_title: string;
  status: InterviewStatus;
  created_at: string;
};
