import type React from "react"
import DOMPurify from "dompurify"
import { useState, useEffect } from "react"
import { ProfileCompletion } from "./profile-completion"
import { useAuth } from "../../hooks/useAuth"
export function ProfilePage() {
    const sanitizeUrl = (url: string | null): string | null => {
    if (!url) return null;
    try {
      return DOMPurify.sanitize(url, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
    } catch {
      return null;
    }
  }

  const { user, updateProfile } = useAuth()
  
  const [loading, setLoading] = useState(true)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    mobile: "",
    linkedinUrl: "",
    avatar_url: "",
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        username: user.username || "",
        mobile: user.mobile || "",
        linkedinUrl: user.linkedinUrl || "",
        avatar_url: user.avatar_url || "",
      })
      setLoading(false);
    }
    console.log(user);
  }, [user])

  const handleEdit = () => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        username: user.username || "",
        mobile: user.mobile || "",
        linkedinUrl: user.linkedinUrl || "",
        avatar_url: user.avatar_url || "",
      })
    }
    setSelectedImage(null)
    setIsEditModalOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await updateProfile(formData)
      if (result.success) {
        setIsEditModalOpen(false)
        setSelectedImage(null)
      }
    } catch (error) {
      console.error("Failed to update profile:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setIsEditModalOpen(false)
    setSelectedImage(null)
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        username: user.username || "",
        mobile: user.mobile || "",
        linkedinUrl: user.linkedinUrl || "",
        avatar_url: user.avatar_url || "",
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setSelectedImage(result)
        setFormData({
          ...formData,
          avatar_url: result,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerImageUpload = () => {
    document.getElementById("avatar-upload")?.click()
  }

  if (loading) {
    return (
      <div className="bg-gray-900/50 border border-purple-500/20 rounded-lg p-6 backdrop-blur-sm">
        <div className="animate-pulse space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-700 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-6 bg-gray-700 rounded w-32"></div>
              <div className="h-4 bg-gray-700 rounded w-48"></div>
            </div>
          </div>
          <div className="h-4 bg-gray-700 rounded w-full"></div>
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="bg-gray-900/50 border border-purple-500/20 rounded-lg p-6 backdrop-blur-sm">
        <div className="text-center py-8">
          <svg className="w-12 h-12 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <p className="text-gray-400">Please log in to view your profile.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="bg-gray-900/50 border border-purple-500/20 backdrop-blur-sm rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-6">
              <div className="relative">
                <img src={
                  sanitizeUrl(selectedImage) || sanitizeUrl(formData.avatar_url) || user.avatar_url || "/placeholder.svg?height=50&width=50"
                }
                alt={user.name || "User"}
                className="w-20 h-20 rounded-full border-2 border-purple-500/30 object-cover"
                />

                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-white mb-4">{user.name || "Complete your profile"}</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-300">
                  {user.email && (
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      {user.email}
                    </div>
                  )}
                  {user.username && (
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                      @{user.username}
                    </div>
                  )}
                  {user.mobile && (
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                      {user.mobile}
                    </div>
                  )}
                  {user.linkedinUrl && (
                    <div className="flex items-center gap-2 md:col-span-2">
                      <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      <a
                        href={user.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        LinkedIn Profile
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={handleEdit}
              className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500 h-10 py-2 px-4 text-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit Profile
            </button>
          </div>

          <ProfileCompletion user={user} />
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50" onClick={handleCancel} />
          <div className="relative z-50 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="bg-gray-900 border border-purple-500/20 rounded-lg p-6 shadow-lg text-white">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white">Edit Profile</h2>
                <p className="text-sm text-gray-400 mt-2">
                  Update your profile information to keep it current and complete.
                </p>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="relative cursor-pointer" onClick={triggerImageUpload}>
                    <img
                      src={selectedImage || user.avatar_url || "/placeholder.svg?height=80&width=80"}
                      alt={user.name || "User"}
                      className="w-20 h-20 rounded-full border-2 border-purple-500/30 hover:border-purple-500/50 transition-colors object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <div>
                    <h3 className="text-sm font-medium text-gray-300 mb-1">Profile Photo</h3>
                    <p className="text-xs text-gray-500">Click on the image to change your profile photo</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-300">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="username" className="text-sm font-medium text-gray-300">
                      Username
                    </label>
                    <input
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder="Enter your username"
                      className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      disabled
                      className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-700 px-3 py-2 text-sm text-gray-400 placeholder:text-gray-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <p className="text-xs text-gray-500">Email cannot be changed</p>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="mobile" className="text-sm font-medium text-gray-300">
                      Mobile Number
                    </label>
                    <input
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Enter your mobile number"
                      className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="linkedinUrl" className="text-sm font-medium text-gray-300">
                      <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      LinkedIn Profile URL
                    </label>
                    <input
                      id="linkedinUrl"
                      name="linkedinUrl"
                      value={formData.linkedinUrl}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/yourprofile"
                      className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 ">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none border border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent focus:ring-gray-500 h-10 py-2 px-4 text-sm"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500 h-10 py-2 px-4 text-sm"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                      />
                    </svg>
                    {loading ? "Saving..." : "Save Changes"}
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