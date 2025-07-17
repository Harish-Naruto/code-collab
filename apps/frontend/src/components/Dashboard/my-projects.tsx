import type React from "react"
import { useState } from "react"
import {
  Plus,
  CalendarDays,
  Clock,
  Github,
  Globe,
  Code,
} from "lucide-react"

interface Project {
  id: string
  name: string
  description: string
  languages: string
  createdAt: string
  updatedAt: string
  githubUrl?: string
  liveUrl?: string
}

export function MyProjects() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "demo-project-1",
      name: "EventHub Website",
      description:
        "The EventHub is the website which is used to manage the events at Institute/College level.",
      languages: "Python",
      createdAt: "2024-01-15T10:30:00.000Z",
      updatedAt: "2024-01-20T14:45:00.000Z",
      githubUrl: "https://github.com/This-Is-My-GitHub-Account/EventHub",
      liveUrl: "http://localhost:5173",
    },
  ])
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    languages: "",
    githubUrl: "",
    liveUrl: "",
  })

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault()
    const newProject: Project = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      languages: formData.languages,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      githubUrl: formData.githubUrl,
      liveUrl: formData.liveUrl,
    }
    setProjects((prev) => [...prev, newProject])
    setFormData({ name: "", description: "", languages: "", githubUrl: "", liveUrl: "" })
    setIsCreateModalOpen(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className="bg-gray-900/50 border border-purple-500/20 rounded-lg p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">My Projects</h2>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500 h-10 py-2 px-4 text-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Project
          </button>
        </div>

        {projects.length === 0 && (
          <div className="text-center py-16">
            <Code className="w-16 h-16 text-gray-600 mx-auto mb-6" />
            <h3 className="text-xl font-medium text-gray-400 mb-3">No projects yet</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Start building something amazing! Create your first project to showcase your skills and track your
              progress.
            </p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500 h-10 py-2 px-4 text-sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Project
            </button>
          </div>
        )}

        {projects.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-gray-800/50 border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all group rounded-lg shadow-sm border p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-white font-semibold text-lg group-hover:text-cyan-400 transition-colors">
                    {project.name}
                  </h3>
                </div>

                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{project.description}</p>
                <p className="text-cyan-400 text-xs mb-4 font-medium">{project.languages}</p>

                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <CalendarDays className="w-3 h-3" />
                    Created: {new Date(project.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Updated: {new Date(project.updatedAt).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex gap-2">
                  {project.githubUrl && (
                    <button
                      onClick={() => window.open(project.githubUrl, "_blank")}
                      className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none border border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent focus:ring-gray-500 h-8 px-3 text-xs flex-1"
                    >
                      <Github className="w-3 h-3 mr-1" />
                      Code
                    </button>
                  )}
                  {project.liveUrl && (
                    <button
                      onClick={() => window.open(project.liveUrl, "_blank")}
                      className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none border border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent focus:ring-gray-500 h-8 px-3 text-xs flex-1"
                    >
                      <Globe className="w-3 h-3 mr-1" />
                      Live
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsCreateModalOpen(false)} />
          <div className="relative z-50 w-full max-w-lg mx-4">
            <div className="bg-gray-900 border border-purple-500/20 rounded-lg p-6 shadow-lg text-white max-w-lg">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-white">Create New Project</h2>
                <p className="text-sm text-gray-400 mt-2">
                  Add a new project to your portfolio and start tracking your progress.
                </p>
              </div>

              <form onSubmit={handleCreateProject} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-300">
                    Project Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter project name"
                    required
                    className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium text-gray-300">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your project..."
                    required
                    className="flex min-h-[80px] w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="languages" className="text-sm font-medium text-gray-300">
                    Languages
                  </label>
                  <select
                    id="languages"
                    name="languages"
                    value={formData.languages}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value=" ">Select Languages</option>
                    <option value="python">Python </option>
                    <option value="c++">C++</option>
                    <option value="Java">Java</option>
                    <option value="react.Js">React.Js</option>
                    <option value="node.js"> Node.Js</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="githubUrl" className="text-sm font-medium text-gray-300">
                    <Github className="w-4 h-4 inline mr-2" />
                    GitHub URL (Optional)
                  </label>
                  <input
                    id="githubUrl"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleChange}
                    placeholder="https://github.com/username/project"
                    className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="liveUrl" className="text-sm font-medium text-gray-300">
                    <Globe className="w-4 h-4 inline mr-2" />
                    Live URL (Optional)
                  </label>
                  <input
                    id="liveUrl"
                    name="liveUrl"
                    value={formData.liveUrl}
                    onChange={handleChange}
                    placeholder="https://your-project.com"
                    className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 border border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent focus:ring-gray-500 h-10 py-2 px-4 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500 h-10 py-2 px-4 text-sm"
                  >
                    <Code className="w-4 h-4 mr-2" />
                    Create Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
