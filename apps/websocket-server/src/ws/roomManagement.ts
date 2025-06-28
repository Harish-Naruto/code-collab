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

export async function handleJoin(ws: WebSocket, room: string, userId: string, username:string,avatar_url:string) {
  activeSockets.add({ ws, room, userId });
  await redisclient.sAdd(`room:${room}`, userId);
  const history = await redisclient.lRange(`history:${room}`, -20, -1);
  const parsedHistory = (history || []).map((item) => JSON.parse(item));
  ws.send(
    JSON.stringify({
      type: "HISTORY",
      messages: parsedHistory,
    })
  );

  const joinmsg = {
    type: "JOIN",
    userId: userId,
    username,
    avatar_url,
    timestamp: Date.now(),
  };

  await pub.publish("chat", JSON.stringify({ room: room, data: joinmsg }));
}

export async function handleMessage(room: string, userId: string, text: string) {
  const msg = {
    type: "MESSAGE",
    userId,
    message: text,
    timestamp: Date.now(),
  };
  await redisclient.rPush(`history:${room}`, JSON.stringify({ msg }));
  await pub.publish("chat", JSON.stringify({ room, data: msg }));
}

export async function handleTyping(room: string,userId: string,isTyping: boolean) {
  const msg = {
    type: "TYPING",
    userId,
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
  const { room, userId } = sock;
  activeSockets.delete(sock);
  await redisclient.sRem(`room:${room}`, userId);

  const leavemsg = {
    type: "LEAVE",
    userId,
    timestamp: Date.now(),
  };
  await pub.publish("chat", JSON.stringify({ room, data: leavemsg }));
}
