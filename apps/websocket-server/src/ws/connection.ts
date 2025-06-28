import { WebSocket } from "ws";
import { verifyToken } from "../utils/jwt";
import { ChatMessage } from "../utils/types";
import { handleJoin, handleLeave, handleMessage, handleTyping } from "./roomManagement";


export function handleConnection(ws:WebSocket,req:any){
    // const url = new URL(req.url || '' ,`http://${req.headers.host}`);
    // const token = url.searchParams.get('token');
    // if(!token){
    //     return ws.close(4001,'missing token');
    // }

    // let user:any;

    // try{
    //     user = verifyToken(token);
    // }catch{
    //     return ws.close(4002,'Invalid token');
    // }

    ws.on('message',async(raw)=>{
        try{
            const data:ChatMessage = JSON.parse(raw.toString());

            if(data.type==='JOIN'){
                if(!data.username || !data.avatar_url){
                    throw new Error(" username or avatar-ulr missing");
                }
                await handleJoin(ws,data.room,data.userId,data.username,data?.avatar_url);
            }

            if(data.type==='MESSAGE'){
                await handleMessage(data.room,data.userId,data.message as string);
            }

            if(data.type==='TYPING'){
                await handleTyping(data.room,data.userId,data.typing||false);
            }

        }catch(err){
            console.error('message error: ',err);
        }
    })

    ws.on('close',()=>{
        handleLeave(ws);
    })

}