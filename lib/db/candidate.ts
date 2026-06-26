import { supabaseAdmin } from "../supabase/server";
import type { Interview } from "./types";

export async function getCandidateInterviews(candidateId:string): Promise<Interview[]>{
    const {data, error} = await supabaseAdmin
    .from('interviews')
    .select('*')
    .eq('candidate_id', candidateId)
    .order('created_at', {ascending:false});

    if(error) throw new Error(error.message);

    return data ?? [];
}