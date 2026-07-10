import { supabaseAdmin } from "../supabase/server";

export type Competency = {
  name: string;
  score: number | null;
  evidence?: string | null;
  comment?: string;
};

export type QA = {
  question: string;
  answer: string;
  response_seconds: number | null;
};

export type SpeakingInsights = {
  words_per_minute: number | null;
  total_words: number;
  answers: number;
  filler_words: { count: number; examples: Record<string, number> };
  interruptions: number | null;
  takeaway: string;
};

export type CandidateReport = {
  overall_score?: number;
  competencies?: Competency[];
  strengths?: string[];
  improvement_areas?: string[];
  transcript_highlights?: { quote: string; comment: string }[];
  speaking_insights?: SpeakingInsights;
  personalized_feedback?: string;
  improvement_plan?: { action: string; why: string }[];
  questions?: QA[];
};

export type Evaluation = {
  interview_id: string;
  candidate_report: CandidateReport | null;
  recruiter_report: Record<string, unknown> | null;
  overall_score: number | null;
  recommendation: string | null;
  created_at: string;
};

export async function getEvaluation( interviewId: string ): Promise<Evaluation | null> {
  const { data, error } = await supabaseAdmin
    .from("evaluations")
    .select("*")
    .eq("interview_id", interviewId)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data;
}
