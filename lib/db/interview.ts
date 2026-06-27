import { supabaseAdmin } from "../supabase/server";
import type { Interview, TranscriptTurn } from "./types";

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

export async function addTurn(interviewId:string, speaker:string, text: string): Promise<void> {
    const {data, error} = await supabaseAdmin
    .from('transcript_turns')
    .upsert(
        {
            interview_id: interviewId,
            speaker: speaker,
            text: text,
        }
    )
    .select()
    .single();

    if(error) throw new Error(error.message);

    return data;
}

export default function isParticipant(interview: Interview, userId: string){
    return interview.candidate_id === userId || interview.recruiter_id === userId;
}