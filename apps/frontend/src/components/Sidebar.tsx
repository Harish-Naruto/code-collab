"use client"

import type React from "react"
import { useState } from "react"

interface SidebarProps {
  selectedFile: string
  onFileSelect: (fileName: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ selectedFile, onFileSelect }) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["src", "components"]))

  const toggleFolder = (folderName: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folderName)) {
      newExpanded.delete(folderName)
    } else {
      newExpanded.add(folderName)
    }
    setExpandedFolders(newExpanded)
  }

  const collaborators = [
    { name: "john_doe", avatar: "J", color: "bg-orange-500" },
    { name: "sarah_chen", avatar: "S", color: "bg-blue-500" },
    { name: "mike_johnson", avatar: "M", color: "bg-green-500" },
  ]

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
      {/* Explorer Section */}
      <div className="p-3">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Explorer</h3>
        <div className="mb-4">
          <h4 className="text-xs text-gray-500 uppercase tracking-wide mb-2">Project Files</h4>

          {/* src folder */}
          <div className="ml-2">
            <div
              className="flex items-center cursor-pointer hover:bg-gray-700 px-1 py-1 rounded"
              onClick={() => toggleFolder("src")}
            >
              <svg
                className={`w-3 h-3 mr-1 transition-transform ${expandedFolders.has("src") ? "rotate-90" : ""}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <svg className="w-4 h-4 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              </svg>
              <span className="text-sm">src</span>
            </div>

            {expandedFolders.has("src") && (
              <div className="ml-4">
                {/* components folder */}
                <div
                  className="flex items-center cursor-pointer hover:bg-gray-700 px-1 py-1 rounded"
                  onClick={() => toggleFolder("components")}
                >
                  <svg
                    className={`w-3 h-3 mr-1 transition-transform ${expandedFolders.has("components") ? "rotate-90" : ""}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg className="w-4 h-4 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                  </svg>
                  <span className="text-sm">components</span>
                </div>

                {expandedFolders.has("components") && (
                  <div className="ml-4">
                    <div
                      className={`flex items-center cursor-pointer hover:bg-gray-700 px-1 py-1 rounded ${selectedFile === "Chat.tsx" ? "bg-gray-700" : ""}`}
                      onClick={() => onFileSelect("Chat.tsx")}
                    >
                      <svg className="w-4 h-4 mr-2 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm">Chat.tsx</span>
                    </div>
                    <div
                      className={`flex items-center cursor-pointer hover:bg-gray-700 px-1 py-1 rounded ${selectedFile === "Editor.tsx" ? "bg-gray-700" : ""}`}
                      onClick={() => onFileSelect("Editor.tsx")}
                    >
                      <svg className="w-4 h-4 mr-2 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm">Editor.tsx</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Online Collaborators Section */}
      <div className="mt-auto p-3 border-t border-gray-700">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Online Collaborators (3)</h3>
        <div className="space-y-2">
          {collaborators.map((collaborator, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div
                className={`w-6 h-6 ${collaborator.color} rounded-full flex items-center justify-center text-xs font-semibold text-white`}
              >
                {collaborator.avatar}
              </div>
              <span className="text-sm text-gray-300">{collaborator.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
