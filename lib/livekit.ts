import 'server-only';
import { AccessToken } from "livekit-server-sdk";

export async function createInterviewToken(roomId:string, identity:string, name?: string){
    const at = new AccessToken(
        process.env.LIVEKIT_API_KEY!,
        process.env.LIVEKIT_API_SECRET!,
        {identity, name, ttl: "2h"}
    )
    at.addGrant({ 
        roomJoin: true, 
        room: roomId, 
        canPublish: true, 
        canSubscribe: true
     }); 

    return at.toJwt();
}