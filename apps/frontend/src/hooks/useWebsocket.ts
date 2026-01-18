import { useEffect, useRef, useState, useCallback } from "react";
import type { ChatMessage } from "../types/chat";
import type { AuthUser } from "../types/auth";
import toast from "react-hot-toast";



export function useWebSocket(token: string, room: string, user: AuthUser) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const [Count,setCount] = useState<number>(0);
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);


  const cleanup = useCallback(() => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.close();
    }
    ws.current = null;
    setIsConnected(false);
  }, []);

  useEffect(() => {
    if (!token || !room || !user.id) return;
    // cleanup();

    
    ws.current = new WebSocket(`ws://localhost:8080?token=${token}`);

    ws.current.onopen = () => {
      setIsConnected(true);
      ws.current?.send(JSON.stringify({
        type: "JOIN",
        room,
        username: user.username,
        avatar_url: user.avatar_url
      }));
    };

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        switch (data.type) {
          case "MESSAGE":
            setMessages((prev) => [...prev, data.msg || data]);
            break;

          case "HISTORY":
  
            setMessages((data.messages || []).map((item: any) => item.msg || item));
            break;

          case "JOIN":
              if (data.username !== user.username) {
                toast.success(`${data.username} joined the chat`);
              }
            break;

          case "LEAVE":

              if (data.username !== user.username) {
                toast(`${data.username} left the chat`, { icon: "👋" });
              }

            
            setTypingUsers((prev) => {
              const updated = new Set(prev);
              updated.delete(data.username);
              return updated;
            });
            break;

          case "TYPING":
            setTypingUsers((prev) => {
              const updated = new Set(prev);
              if (data.typing) {
                updated.add(data.username);
              } else {
                updated.delete(data.username);
              }
              return updated;
            });
            break;
          
          case "COUNT":
            setCount(data.count);
            break;

          default:
            console.warn("Unknown message type:", data.type);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsConnected(false);
    };

    ws.current.onclose = () => {
      setIsConnected(false);
      console.log("WebSocket connection closed");
    };

    // Cleanup on unmount or dependency change
    
  }, [token, room, user.id, user.username, user.avatar_url]);

  const sendMessage = useCallback((text: string) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        type: "MESSAGE", 
        room,
        username: user.username,
        avatar_url:user.avatar_url,
        message: text
      }));
    } else {
      toast.error("Connection lost. Please refresh the page.");
    }
  }, [room, user.id]);

  const sendTyping = useCallback((typing: boolean) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        type: "TYPING",
        room,
        username: user.username,
        avatar_url:user.avatar_url,
        typing:typing
      }));
    }
  }, [room, user.id]);

  return {
    messages,
    Count,
    sendMessage,
    sendTyping,
    typingUsers,
    isConnected
  };
}