import { useEffect, useRef, useState, useCallback } from "react";
import type { ChatMessage } from "../types/chat";
import type { AuthUser } from "../types/auth";
import toast from "react-hot-toast";

type UserInfo = {
  username: string;
  avatar_url: string;
}

export function useWebSocket(token: string, room: string, user: AuthUser) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userMap, setUserMap] = useState<Map<string, UserInfo>>(new Map());
  const [typingUsers, setTypingUsers] = useState<Set<string>>(new Set());
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  // Cleanup function to close WebSocket
  const cleanup = useCallback(() => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.close();
    }
    ws.current = null;
    setIsConnected(false);
  }, []);

  useEffect(() => {
    if (!token || !room || !user.id) return;

    // Clean up existing connection
    cleanup();

    // Create new WebSocket connection
    ws.current = new WebSocket(`ws://localhost:8080`);

    ws.current.onopen = () => {
      setIsConnected(true);
      ws.current?.send(JSON.stringify({
        type: "JOIN",
        room,
        userId: user.id,
        username: user.username,
        avatar_url: user.avatar_url
      }));
    };

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        switch (data.type) {
          case "MESSAGE":
            // Handle nested message structure - extract from msg wrapper
            
            setMessages((prev) => [...prev, data.msg || data]);
            break;

          case "HISTORY":
            // Extract messages from msg wrapper and flatten the structure
            
            setMessages((data.messages || []).map((item: any) => item.msg || item));
            break;

          case "JOIN":
            setUserMap((prev) => {
              const newMap = new Map(prev);
              const info: UserInfo = { 
                username: data.username as string, 
                avatar_url: data.avatar_url || "" 
              };
              newMap.set(data.userId, info);
              
              // Only show toast if it's not the current user joining
              if (data.userId !== user.id) {
                toast.success(`${data.username} joined the chat`);
              }
              
              return newMap;
            });
            break;

          case "LEAVE":
            setUserMap((prev) => {
              const username = prev.get(data.userId)?.username;
              if (username && data.userId !== user.id) {
                toast(`${username} left the chat`, { icon: "👋" });
              }
              
              const newMap = new Map(prev);
              newMap.delete(data.userId);
              return newMap;
            });
            
            // Remove from typing users if they were typing
            setTypingUsers((prev) => {
              const updated = new Set(prev);
              updated.delete(data.userId);
              return updated;
            });
            break;

          case "TYPING":
            setTypingUsers((prev) => {
              const updated = new Set(prev);
              if (data.typing) {
                updated.add(data.userId);
              } else {
                updated.delete(data.userId);
              }
              return updated;
            });
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
    return cleanup;
  }, [token, room, user.id, user.username, user.avatar_url, cleanup]);

  const sendMessage = useCallback((text: string) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        type: "MESSAGE", 
        room,
        userId: user.id,
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
        userId: user.id,
        typing:typing
      }));
    }
  }, [room, user.id]);

  return {
    messages,
    sendMessage,
    sendTyping,
    typingUsers,
    userMap,
    isConnected
  };
}