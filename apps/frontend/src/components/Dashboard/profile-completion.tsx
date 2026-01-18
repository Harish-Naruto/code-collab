import { useMemo } from "react"

interface User {
  id: string
  email: string
  username: string
  name: string
  avatar_url?: string
  mobile?: string
  linkedinUrl?: string
  gender?: string
  passingYear?: string
  profileCompletion?: number
  createdAt?: string
  updatedAt?: string
}

interface ProfileCompletionProps {
  user: User | null
}

export function ProfileCompletion({ user }: ProfileCompletionProps) {
  if (!user) return null

  const profileCompletion = useMemo(() => {
    const fields = [
      user.name,
      user.email,
      user.username,
      user.mobile,
      user.linkedinUrl,
      user.avatar_url &&
        user.avatar_url !== "https://via.placeholder.com/80x80?text=User" &&
        user.avatar_url.trim() !== "",
    ]
    const filledFields = fields.filter((field) => field && field.toString().trim() !== "").length
    return Math.round((filledFields / fields.length) * 100)
  }, [user])

  const missingFields = useMemo(() => {
    const missing = []
    if (!user.name || user.name.trim() === "") missing.push("Full Name")
    if (!user.email || user.email.trim() === "") missing.push("Email")
    if (!user.username || user.username.trim() === "") missing.push("Username")
    if (!user.mobile || user.mobile.trim() === "") missing.push("Mobile Number")
    if (!user.linkedinUrl || user.linkedinUrl.trim() === "") missing.push("LinkedIn Profile")
    if (
      !user.avatar_url ||
      user.avatar_url === "https://via.placeholder.com/80x80?text=User" ||
      user.avatar_url.trim() === ""
    )
      missing.push("Profile Photo")
    return missing
  }, [user])

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-300">Profile Completion</h3>
        <span className="text-lg font-bold text-cyan-400">{profileCompletion}%</span>
      </div>

      <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
        <div
          className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${Math.min(100, Math.max(0, profileCompletion))}%` }}
        ></div>
      </div>

      {profileCompletion < 100 && (
        <div className="p-3 bg-purple-900/30 border border-purple-500/30 rounded-md">
          <p className="text-sm text-purple-200 mb-2">
            Your profile missing a few details! Complete it to personalize your experience and connect better.
          </p>
          {missingFields.length > 0 && (
            <div className="text-xs text-purple-300">
              <span className="font-medium">Missing: </span>
              {missingFields.join(", ")}
            </div>
          )}
        </div>
      )}

      {profileCompletion === 100 && (
        <div className="p-3 bg-green-900/30 border border-green-500/30 rounded-md">
          <p className="text-sm text-green-200">🎉 Profile completed! You're all set to showcase your skills.</p>
        </div>
      )}
    </div>
  )
}
