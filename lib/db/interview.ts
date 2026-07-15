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

export async function createInterview(recruiterId: string, roleTitle: string, jdText: string): Promise<Interview> {
    const { data, error } = await supabaseAdmin
    .from('interviews')
    .insert({recruiter_id: recruiterId, candidate_id: null,  role_title: roleTitle, jd_text: jdText, status: 'pending'})
    .select()
    .single();

    if (error) throw new Error(error.message);
    return data;
}

export async function claimInterview(interviewId: string, candidateId: string, resumeText: string): Promise<boolean> {
    const { data, error } = await supabaseAdmin
    .from('interviews')
    .update({ candidate_id: candidateId, resume_text: resumeText, status: 'in_progress' })
    .eq('id', interviewId)
    .is('candidate_id', null) 
    .select();

    if (error) throw new Error(error.message);
    return (data?.length ?? 0) > 0;
}