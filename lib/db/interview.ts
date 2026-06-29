import { supabaseAdmin } from "../supabase/server";
import type { Interview, Speaker, TranscriptTurn } from "./types";

export async function getInterviewById(id:string): Promise<Interview | null>{
    const {data, error} = await supabaseAdmin
    .from('interviews')
    .select('*')
    .eq('id', id)
    .maybeSingle();

    if(error) throw new Error(error.message);

    return data;
}

export async function getTranscript(interviewId:string): Promise<TranscriptTurn[]> {
    const {data, error} = await supabaseAdmin
    .from('transcript_turns')
    .select('*')
    .eq('interview_id', interviewId)
    .order('created_at', {ascending:true});

    if(error) throw new Error(error.message);

    return data ?? [];
}

export async function addTurn(interviewId:string, speaker:Speaker, text: string): Promise<void> {
    const {error} = await supabaseAdmin
    .from('transcript_turns')
    .insert(
        {interview_id: interviewId, speaker, text}
    )

    if (error) throw new Error(error.message);
}

export function isParticipant(interview: Interview, userId: string){
    return interview.candidate_id === userId || interview.recruiter_id === userId;
}