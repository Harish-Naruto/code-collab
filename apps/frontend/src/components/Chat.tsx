"use client"
import type React from "react"
import { useState } from "react"
import { Paperclip, Trash2, Search, Send } from "lucide-react"

interface Message {
  id: number
  sender: string
  content: string
  timestamp: string
  isOwn: boolean
  isRead?: boolean
}

const Chat: React.FC = () => {
  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "You",
      content: "Hello, team 👋",
      timestamp: "9:10 AM",
      isOwn: true,
      isRead: true,
    },
  ])
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        sender: "You",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isOwn: true,
        isRead: false,
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    } else {
      setIsTyping(true)
      setTimeout(() => setIsTyping(false), 2000)
    }
  }

  return (
    <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wide">Team Chat</h3>
          <div className="flex items-center mt-1">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-xs text-gray-400">3 members online</span>
          </div>
        </div>
        <Search className="w-5 h-5 text-gray-400 cursor-pointer" />
      </div>

      {/* Pinned Messages */}
      <div className="p-3 bg-gray-700 text-xs text-gray-300 flex items-center space-x-2">
        📌 <span>No pinned messages</span>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className="flex flex-col space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400 font-medium">{message.sender}</span>
              <span className="text-xs text-gray-500">{message.timestamp}</span>
            </div>
            <div className={`flex ${message.isOwn ? "justify-end" : "justify-start"} items-center space-x-2`}>
              <div className={`px-3 py-2 rounded-lg max-w-xs text-sm ${message.isOwn ? "bg-blue-500 text-white" : "bg-gray-700 text-white"}`}>
                {message.content}
              </div>
              {/* Delete Icon */}
              <Trash2 className="w-4 h-4 text-gray-400 cursor-pointer" />
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="text-xs text-gray-400">Someone is typing...</div>
        )}
      </div>

      {/* Message Input */}
      <div className="p-3 border-t border-gray-700">
        <div className="flex items-center space-x-2 bg-gray-700 rounded-lg px-3 py-2">
          <Paperclip className="w-5 h-5 text-gray-400 cursor-pointer" />
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-sm"
          />
          {/* 📤 Send Icon */}
          <button
            onClick={handleSendMessage}
            className="p-1 rounded-full hover:bg-gray-600 transition"
            aria-label="Send"
          >
            <Send className="w-5 h-5 text-blue-400" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">Press Enter to send</p>
      </div>
    </div>
  )
}

export default Chat