"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Sidebar from "../components/Sidebar"
import Editor from "../components/Editor"
import Chat from "../components/Chat"
import { Sun, Moon, TimerReset, Timer } from "lucide-react"


const CodeCollabPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState("Editor.tsx")
  const [editorContent, setEditorContent] = useState("// Start Your Code...")
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(true)

  const toggleTheme = () => setIsDarkMode(!isDarkMode)

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>
    if (isRunning) {
      timer = setInterval(() => setSeconds((prev) => prev + 1), 1000)
    }
    return () => clearInterval(timer)
  }, [isRunning])

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
  }

  const resetStopwatch = () => {
    setSeconds(0)
    setIsRunning(false)
  }

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      } flex flex-col transition-colors`}
    >
      {/* Header */}
      <header
        className={`${
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-200 border-gray-300"
        } border-b px-4 py-2 flex items-center justify-between`}
      >
        <div className="flex items-center space-x-6">
          {/* Title */}
          <div className="flex items-center">
            <span className="text-lg font-semibold">🌐CodeCollab</span>
          </div>

          {/* Navbar */}
          <nav className="flex space-x-4">
            <button className="hover:underline">File</button>
            <button className="hover:underline">Edit</button>
            <button className="hover:underline">View</button>
            <button className="hover:underline">Terminal</button>
          </nav>
        </div>

        {/* Stopwatch + Theme toggle */}
        <div className="flex items-center space-x-3">
          {/* Stopwatch */}
          <div className="flex items-center space-x-2">
            <Timer className="w-5 h-5 opacity-70" />
            <span className="text-sm opacity-80">{formatTime(seconds)}</span>
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="text-xs bg-gray-600 hover:bg-gray-700 px-2 py-1 rounded"
            >
              {isRunning ? "Pause" : "Start"}
            </button>
            <button
              onClick={resetStopwatch}
              className="text-xs bg-gray-600 hover:bg-gray-700 px-2 py-1 rounded flex items-center space-x-1"
            >
              <TimerReset className="w-4 h-4" />
            </button>
          </div>

          {/* Share button */}
          <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded flex items-center space-x-2">
            <span>Share</span>
          </button>

          {/* Theme toggle */}
          <button onClick={toggleTheme} className="p-2 rounded hover:bg-gray-600">
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        <Sidebar selectedFile={selectedFile} onFileSelect={setSelectedFile} />
        <Editor
          content={editorContent}
          onChange={setEditorContent}
          fileName={selectedFile}
        />
        <Chat />
      </div>
    </div>
  )
}

export default CodeCollabPage
