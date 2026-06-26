import { supabaseAdmin } from "../supabase/server";
import type { Interview } from "./types";

export async function getRecruiterInterviews(recruiterId:string): Promise<Interview[]>{
    const {data, error} = await supabaseAdmin
    .from('interviews')
    .select('*')
    .eq('recruiter_id', recruiterId)
    .order('created_at', {ascending:false});

    if(error) throw new Error(error.message);

    return data ?? [];
}
