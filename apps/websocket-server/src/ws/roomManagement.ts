import { WebSocket } from "ws";
import redisclient from "../config/redis";
import { pub, sub } from "../config/pubsub";
import { ActiveSocket } from "../utils/types";

sub.subscribe("chat", async (message) => {
  const { room, data } = JSON.parse(message);
  for (const client of getActiveSocket()) {
    if (client.room === room && client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(JSON.stringify(data));
    }
  }
});

//add logic:  if no user is present in room delete that room

const activeSockets = new Set<ActiveSocket>();

function getActiveSocket() {
  return activeSockets;
}

export async function handleJoin(ws: WebSocket, room: string, username:string,avatar_url:string) {
  activeSockets.add({ ws, room, username });
  await redisclient.sAdd(`room:${room}`, username);
  const history = await redisclient.lRange(`history:${room}`, -20, -1);
  const count  = await redisclient.sCard(`room:${room}`);
  const parsedHistory = (history || []).map((item) => JSON.parse(item));
  ws.send(
    JSON.stringify({
      type: "HISTORY",
      messages: parsedHistory,
    })
  );

  const joinmsg = {
    type: "JOIN",
    username,
    avatar_url,
    timestamp: Date.now(),
  };

  const countmsg = {
    type:"COUNT",
    count
  }

  await pub.publish("chat", JSON.stringify({ room: room, data: joinmsg }));
  await pub.publish("chat", JSON.stringify({ room: room, data: countmsg }));
}

export async function handleMessage(room: string, username: string, avatar_url:string, text: string) {
  const msg = {
    type: "MESSAGE",
    username,
    avatar_url,
    message: text,
    timestamp: Date.now(),
  };
  await redisclient.rPush(`history:${room}`, JSON.stringify({ msg }));
  await pub.publish("chat", JSON.stringify({ room, data: msg }));
}

export async function handleTyping(room: string,username: string,avatar_url:string,isTyping: boolean) {
  const msg = {
    type: "TYPING",
    username,
    avatar_url,
    typing: isTyping,
    timestamp: Date.now(),
  };
  await pub.publish("chat", JSON.stringify({ room, data:msg }));
}

export async function handleLeave(ws: WebSocket) {
  const sock = [...activeSockets].find((s) => s.ws === ws);
  if (!sock) {
    return;
  }
  const { room, username } = sock;
  activeSockets.delete(sock);
  await redisclient.sRem(`room:${room}`, username);
  const count = await redisclient.sCard(`room:${room}`);

  if(count>0){
    const countmsg = {
      type:"COUNT",
      count
    }
    await pub.publish("chat",JSON.stringify({room,data:countmsg}));

    const leavemsg = {
      type: "LEAVE",
      username,
      timestamp: Date.now(),
    };
    await pub.publish("chat", JSON.stringify({ room, data: leavemsg }));
  }else{
    await redisclient.del(`room:${room}`)
  }




}
