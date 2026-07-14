// used in Interview table
export type InterviewStatus = "pending" | "in_progress" | "completed";

export type Interview = {
  id: string; // interview's own uuid (used in /interview/[id])
  candidate_id: string | null; // Clerk userId of the candidate, or null until an invite is claimed
  recruiter_id: string | null; // Clerk userId of the recruiter, or null for solo practice
  role_title: string;
  status: InterviewStatus;
  created_at: string;
};

// used in transcript_turns table
export type Speaker = 'ai' | 'user';
export type TranscriptTurn = {
  id: string;
  interview_id: string;
  speaker: Speaker;
  text: string;
  created_at: string;
}
