import WebSocket from "ws"

export type ActiveSocket = {
    ws:WebSocket;
    room:string;
    username:string;
}

export type messagegType = "JOIN" | "LEAVE" | "MESSAGE" | "TYPING" | "HISTORY";

export type ChatMessage = {
    type:messagegType;
    room:string;
    username:string;
    avatar_url:string;
    message?:string;
    timestamp?:number;
    typing?:boolean;
    messages?:ChatMessage[];

}
