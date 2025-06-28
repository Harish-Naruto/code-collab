import React, { useState, useRef, useEffect } from 'react';
import { Send, Users, Circle } from 'lucide-react';
import type { AuthUser } from '../types/auth';
import { useWebSocket } from '../hooks/useWebsocket';

export default function Chat() {
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const user: AuthUser = JSON.parse(localStorage.getItem('user') as string);
  const token = localStorage.getItem('token') as string;
  const room = "general";

  const { messages, sendMessage, sendTyping, typingUsers, isConnected,Count } = useWebSocket(token, room, user);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    if (inputMessage.trim() && isConnected) {
      sendMessage(inputMessage.trim());
      setInputMessage('');
      handleTypingStop();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
    handleTypingStart();
  };

  const handleTypingStart = () => {
    if (!isTyping) {
      setIsTyping(true);
      sendTyping(true);
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to stop typing after 3 seconds
    typingTimeoutRef.current = setTimeout(() => {
      handleTypingStop();
    }, 3000);
  };

  const handleTypingStop = () => {
    if (isTyping) {
      setIsTyping(false);
      sendTyping(false);
    }
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getTypingText = () => {
    const typingUsernames = Array.from(typingUsers)
      .filter(username => username !== user.username)
      .filter(Boolean);

    if (typingUsernames.length === 0) return '';
    if (typingUsernames.length === 1) return `${typingUsernames[0]} is typing...`;
    if (typingUsernames.length === 2) return `${typingUsernames[0]} and ${typingUsernames[1]} are typing...`;
    return `${typingUsernames.length} people are typing...`;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h1 className="text-xl font-semibold text-gray-900">Chat Room</h1>
          <div className="flex items-center space-x-2">
            <Circle className={`w-3 h-3 ${isConnected ? 'text-green-500 fill-current' : 'text-red-500 fill-current'}`} />
            <span className={`text-sm ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-gray-600">
          <Users className="w-5 h-5" />
          <span className="text-sm">{Count} online</span>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((message, index) => {
          const isOwnMessage = message.username === user.username;
          const username = message.username || 'Unknown User';
          const avatar = message.avatar_url;

          return (
            <div
              key={`${message.timestamp}-${index}`}
              className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-xs lg:max-w-md ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`flex-shrink-0 ${isOwnMessage ? 'ml-3' : 'mr-3'}`}>
                  {avatar ? (
                    <img
                      src={avatar}
                      alt={username}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium text-white ${
                      isOwnMessage ? 'bg-blue-500' : 'bg-gray-500'
                    }`}>
                      {username.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`rounded-2xl px-4 py-2 ${
                  isOwnMessage 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white text-gray-900 border border-gray-200 '
                }`}>
                  {!isOwnMessage && (
                    <div className="text-sm font-medium text-gray-600 mb-1">
                      {username}
                    </div>
                  )}
                  <div className="text-sm">{message.message}</div>
                  <div className={`text-xs mt-1 ${
                    isOwnMessage ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp || 0)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing Indicator */}
        {getTypingText() && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-2 text-gray-500 text-sm px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span>{getTypingText()}</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Section */}
      <div className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={handleInputChange}
              onBlur={handleTypingStop}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              placeholder={isConnected ? "Type a message..." : "Connecting..."}
              disabled={!isConnected}
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || !isConnected}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-3 rounded-full transition-colors duration-200 flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}