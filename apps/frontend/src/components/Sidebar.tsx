"use client"

import type React from "react"
import { useState } from "react"
import {
  Folder,
  FolderOpen,
  FileText,
  Plus,
  Files,
  Search,
  GitBranch,
  PlayCircle,
  Package,
  RefreshCcw,
  User,
  Settings
} from "lucide-react"

interface FileNode {
  name: string
  type: "folder" | "file"
  children?: FileNode[]
}

interface SidebarProps {
  selectedFile: string
  onFileSelect: (fileName: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ selectedFile, onFileSelect }) => {
  const [projectStructure, setProjectStructure] = useState<FileNode[]>([
    {
      name: "src",
      type: "folder",
      children: [
        {
          name: "components",
          type: "folder",
          children: [
            { name: "Chat.tsx", type: "file" },
            { name: "Editor.tsx", type: "file" },
          ],
        },
      ],
    },
  ])

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

  const addItem = (path: string[], isFolder: boolean) => {
    const name = prompt(`Enter ${isFolder ? "folder" : "file"} name:`)
    if (!name) return

    const addToStructure = (nodes: FileNode[], currentPath: string[]): FileNode[] => {
      return nodes.map((node) => {
        if (node.type === "folder" && node.name === currentPath[0]) {
          if (currentPath.length === 1) {
            const newNode: FileNode = isFolder
              ? { name, type: "folder", children: [] }
              : { name, type: "file" }
            return {
              ...node,
              children: [...(node.children || []), newNode],
            }
          } else {
            return {
              ...node,
              children: addToStructure(node.children || [], currentPath.slice(1)),
            }
          }
        }
        return node
      })
    }

    const newStructure = addToStructure(projectStructure, path)
    setProjectStructure(newStructure)
    if (isFolder) setExpandedFolders((prev) => new Set(prev).add(name))
  }

  const renderFileTree = (nodes: FileNode[], path: string[] = []) => {
    return nodes.map((node) => {
      const isExpanded = expandedFolders.has(node.name)
      const currentPath = [...path, node.name]

      return (
        <div key={node.name} className={`ml-${path.length * 4}`}>
          {node.type === "folder" ? (
            <div className="group flex items-center cursor-pointer hover:bg-gray-700 px-2 py-1 rounded">
              <div onClick={() => toggleFolder(node.name)} className="flex items-center flex-1">
                {isExpanded ? (
                  <FolderOpen className="w-4 h-4 mr-2 text-yellow-400" />
                ) : (
                  <Folder className="w-4 h-4 mr-2 text-yellow-400" />
                )}
                <span className="text-sm text-gray-300">{node.name}</span>
              </div>

              <button
                onClick={() => addItem(currentPath, true)}
                className="hidden group-hover:flex items-center justify-center w-5 h-5 bg-gray-600 rounded hover:bg-gray-500 mr-1"
              >
                <Plus className="w-3 h-3 text-white" />
              </button>
              <button
                onClick={() => addItem(currentPath, false)}
                className="hidden group-hover:flex items-center justify-center w-5 h-5 bg-gray-600 rounded hover:bg-gray-500"
              >
                <FileText className="w-3 h-3 text-white" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => onFileSelect(node.name)}
              className={`flex items-center cursor-pointer hover:bg-gray-700 px-2 py-1 rounded ${
                selectedFile === node.name ? "bg-gray-700" : ""
              }`}
            >
              <FileText className="w-4 h-4 mr-2 text-blue-300" />
              <span className="text-sm text-gray-300">{node.name}</span>
            </div>
          )}

          {node.type === "folder" && isExpanded && node.children && (
            <div>{renderFileTree(node.children, currentPath)}</div>
          )}
        </div>
      )
    })
  }

  const sidebarIcons = [
    { icon: <Files className="w-5 h-5 text-gray-400" />, title: "Explorer" },
    { icon: <Search className="w-5 h-5 text-gray-400" />, title: "Search" },
    { icon: <GitBranch className="w-5 h-5 text-gray-400" />, title: "Source Control" },
    { icon: <PlayCircle className="w-5 h-5 text-gray-400" />, title: "Run & Debug" },
    { icon: <Package className="w-5 h-5 text-gray-400" />, title: "Extensions" },
    { icon: <RefreshCcw className="w-5 h-5 text-gray-400" />, title: "Remote" },
    { icon: <User className="w-5 h-5 text-gray-400" />, title: "Account" },
    { icon: <Settings className="w-5 h-5 text-gray-400" />, title: "Settings" },
  ]


  const handleIconClick = (title: string) => {
    alert(`You clicked on "${title}"`)
  }

  const collaborators = [
    { name: "john_doe", avatar: "J", color: "bg-orange-500" },
    { name: "sarah_chen", avatar: "S", color: "bg-blue-500" },
    { name: "mike_johnson", avatar: "M", color: "bg-green-500" },
  ]

  return (
    <div className="flex h-screen">
      {/* Vertical Sidebar */}
      <div className="w-14 bg-gray-900 border-r border-gray-800 flex flex-col items-center py-3 space-y-4">
        {sidebarIcons.map((item, index) => (
          <button
            key={index}
            title={item.title}
            className="p-1 hover:bg-gray-700 rounded"
            onClick={() => handleIconClick(item.title)}
          >
            {item.icon}
          </button>
        ))}
      </div>

      {/* Your Existing Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-3 flex-1 overflow-auto">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Explorer</h3>
          {renderFileTree(projectStructure)}
        </div>

        {/* Online Collaborators Section */}
        <div className="p-3 border-t border-gray-700">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
            Online Collaborators ({collaborators.length})
          </h3>
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
    </div>
  )
}

export default Sidebar
