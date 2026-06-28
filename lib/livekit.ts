'use server'

import { AccessToken } from "livekit-server-sdk";

export async function createInterviewToken(roomId:string, identity:string, name?: string){
    const at = new AccessToken(
        process.env.LIVEKIT_API_KEY,
        process.env.LIVEKIT_API_SECRET,
        {
            identity: identity,
        }
    )
    at.addGrant({ 
        roomJoin: true, 
        room: roomId, 
        canPublish: true, 
        canSubscribe: true
     }); 

    const token = await at.toJwt();
    return token;
}