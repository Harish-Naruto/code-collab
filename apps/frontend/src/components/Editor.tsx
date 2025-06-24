"use client"
import type React from "react"
import { useState } from "react"
import EditorComponent from "@monaco-editor/react"
import * as monaco from "monaco-editor"

interface EditorProps {
  content: string
  onChange: (content: string) => void
  fileName: string
}

const Editor: React.FC<EditorProps> = ({ content, onChange, fileName }) => {
  const lines = content.split("\n")
  const [output, setOutput] = useState("")
  const [language, setLanguage] = useState("typescript")

  const runCode = () => {
    if (language === "javascript" || language === "typescript") {
      try {
        const result = eval(content)
        setOutput(String(result))
        alert("Output: " + result)
      } catch (err: any) {
        alert("Error: " + err.message)
      }
    } else {
      alert(`Run not supported for ${language} (demo runs JS/TS only)`)
    }
  }

  // 👉 Configure Monaco on mount for auto-completion and error hints
  const handleEditorWillMount = (monacoInstance: typeof monaco) => {
    monacoInstance.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monacoInstance.languages.typescript.ScriptTarget.ESNext,
      allowNonTsExtensions: true,
      module: monacoInstance.languages.typescript.ModuleKind.ESNext,
      noEmit: true,
      strict: true,
      lib: ["esnext"],
    })

    // Enable semantic and syntax validation
    monacoInstance.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    })

    monacoInstance.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    })
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-900">
      {/* Tab */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Language Selector */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-700 text-gray-300 text-xs px-1 py-0.5 rounded"
          >
            <option value="typescript">TS</option>
            <option value="javascript">JS</option>
            <option value="cpp">C++</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
          </select>

          {/* File tab */}
          <div className="flex items-center space-x-2 bg-gray-700 px-3 py-1 rounded-t">
            <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm">{fileName}</span>
          </div>
        </div>

        {/* Right side status + Run Button */}
        <div className="flex items-center space-x-3 text-xs text-gray-400">
          <span>UTF-8</span>
          <span>{language.toUpperCase()}</span>

          {/* Run Button */}
          <button
            onClick={runCode}
            className="px-2 py-0.5 rounded bg-green-600 text-white text-xs"
          >
            ▶
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 flex">
        {/* Line Numbers */}
        <div className="bg-gray-800 px-3 py-4 text-right text-gray-500 text-sm font-mono select-none border-r border-gray-700">
          {lines.map((_, index) => (
            <div key={index} className="leading-6">
              {index + 1}
            </div>
          ))}
        </div>

        {/* Monaco Code Area */}
        <div className="flex-1 relative">
          <EditorComponent
            height="100%"
            language={language}
            theme="vs-dark"
            value={content}
            onChange={(value) => onChange(value || "")}
            beforeMount={handleEditorWillMount}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
              tabSize: 2,
              automaticLayout: true,
              formatOnType: true,
              formatOnPaste: true,
              scrollBeyondLastLine: false,
              wordWrap: "on",
              lineNumbers: "off",
              folding: true, 
            }}
          />
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-800 border-t border-gray-700 px-4 py-1 flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center space-x-4">
          <span>{fileName}</span>
          <span>Lines: {lines.length}</span>
          <span>Characters: {content.length}</span>
        </div>
      </div>
    </div>
  )
}

export default Editor
