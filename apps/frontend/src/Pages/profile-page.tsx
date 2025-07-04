"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"

interface ProfileData {
  fullName: string
  username: string
  email: string
  aboutMe: string
  location: string
  programmingLanguages: string
  linkedinProfile: string
  profilePicture: string
  emailAddresses: Array<{
    email: string
    addedDate: string
  }>
}

interface ValidationErrors {
  username?: string
}

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
  shape: "circle" | "square" | "triangle"
}

const STORAGE_KEY = "coding_website_profile"

const defaultProfileData: ProfileData = {
  fullName: "",
  username: "User",
  email: "",
  aboutMe: "",
  location: "",
  programmingLanguages: "",
  linkedinProfile: "",
  profilePicture: "",
  emailAddresses: [],
}

// Particle System Component
const ParticleSystem: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()

  const createParticle = useCallback((id: number): Particle => {
    const colors = ["#3B82F6", "#8B5CF6", "#06B6D4", "#10B981", "#F59E0B"]
    const shapes: ("circle" | "square" | "triangle")[] = ["circle", "square", "triangle"]

    return {
      id,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
    }
  }, [])

  const drawParticle = useCallback((ctx: CanvasRenderingContext2D, particle: Particle) => {
    ctx.save()
    ctx.globalAlpha = particle.opacity
    ctx.fillStyle = particle.color

    switch (particle.shape) {
      case "circle":
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        break
      case "square":
        ctx.fillRect(particle.x - particle.size, particle.y - particle.size, particle.size * 2, particle.size * 2)
        break
      case "triangle":
        ctx.beginPath()
        ctx.moveTo(particle.x, particle.y - particle.size)
        ctx.lineTo(particle.x - particle.size, particle.y + particle.size)
        ctx.lineTo(particle.x + particle.size, particle.y + particle.size)
        ctx.closePath()
        ctx.fill()
        break
    }
    ctx.restore()
  }, [])

  const updateParticles = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particlesRef.current.forEach((particle) => {
      particle.x += particle.speedX
      particle.y += particle.speedY

      // Wrap around screen
      if (particle.x < 0) particle.x = canvas.width
      if (particle.x > canvas.width) particle.x = 0
      if (particle.y < 0) particle.y = canvas.height
      if (particle.y > canvas.height) particle.y = 0

      drawParticle(ctx, particle)
    })

    animationRef.current = requestAnimationFrame(updateParticles)
  }, [drawParticle])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create particles
    particlesRef.current = Array.from({ length: 50 }, (_, i) => createParticle(i))

    updateParticles()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [createParticle, updateParticles])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ background: "transparent" }} />
  )
}

// Typewriter Effect Hook
const useTypewriter = (text: string, speed = 50, startDelay = 0) => {
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (!text) return

    const startTimeout = setTimeout(() => {
      setIsTyping(true)
      let index = 0

      const typeInterval = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1))
          index++
        } else {
          setIsTyping(false)
          clearInterval(typeInterval)
        }
      }, speed)

      return () => clearInterval(typeInterval)
    }, startDelay)

    return () => clearTimeout(startTimeout)
  }, [text, speed, startDelay])

  return { displayText, isTyping }
}

// Scroll Animation Hook
const useScrollAnimation = () => {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())
  const observerRef = useRef<IntersectionObserver>()

  const observeElement = useCallback((element: HTMLElement, id: string) => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const elementId = entry.target.getAttribute("data-scroll-id")
            if (elementId) {
              setVisibleElements((prev) => {
                const newSet = new Set(prev)
                if (entry.isIntersecting) {
                  newSet.add(elementId)
                } else {
                  newSet.delete(elementId)
                }
                return newSet
              })
            }
          })
        },
        { threshold: 0.1, rootMargin: "50px" },
      )
    }

    element.setAttribute("data-scroll-id", id)
    observerRef.current.observe(element)
  }, [])

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return { visibleElements, observeElement }
}

// Custom Button Component with enhanced micro-interactions
const CustomButton: React.FC<{
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  variant?: "primary" | "secondary" | "danger"
  size?: "sm" | "md" | "lg"
  className?: string
}> = ({ children, onClick, disabled = false, variant = "primary", size = "md", className = "" }) => {
  const [isPressed, setIsPressed] = useState(false)
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsPressed(true)
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const newRipple = { id: Date.now(), x, y }
    setRipples((prev) => [...prev, newRipple])

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
    }, 600)
  }

  const handleMouseUp = () => setIsPressed(false)
  const handleMouseLeave = () => setIsPressed(false)

  const baseClasses =
    "relative inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white focus:ring-blue-500 shadow-lg hover:shadow-xl hover:shadow-blue-500/25",
    secondary:
      "border border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white bg-transparent focus:ring-gray-500 hover:border-gray-500 shadow-lg hover:shadow-xl hover:shadow-gray-500/25",
    danger:
      "border border-red-600 text-red-400 hover:bg-red-900 hover:text-red-300 bg-transparent focus:ring-red-500 hover:border-red-500 shadow-lg hover:shadow-xl hover:shadow-red-500/25",
  }

  const sizeClasses = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 py-2",
    lg: "h-12 px-6 py-3 text-lg",
  }

  const scaleClass = isPressed ? "scale-95" : "hover:scale-105"

  return (
    <button
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${scaleClass} ${className}`}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ping"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
        />
      ))}
      {children}
    </button>
  )
}

// Enhanced Input Component with micro-interactions
const CustomInput: React.FC<{
  id?: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}> = ({ id, type = "text", value, onChange, placeholder, className = "", disabled = false }) => {
  const [isFocused, setIsFocused] = useState(false)
  const [hasContent, setHasContent] = useState(false)

  useEffect(() => {
    setHasContent(value.length > 0)
  }, [value])

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        disabled={disabled}
        className={`flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-400 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-600 disabled:cursor-not-allowed disabled:opacity-50 ${
          isFocused ? "shadow-lg shadow-blue-500/25 scale-[1.02]" : ""
        } ${hasContent ? "border-blue-400" : ""} ${className}`}
      />
      {isFocused && (
        <div className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-500/20 to-purple-500/20 pointer-events-none animate-pulse" />
      )}
    </div>
  )
}

// Enhanced Textarea Component
const CustomTextarea: React.FC<{
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  rows?: number
  className?: string
  placeholder?: string
}> = ({ value, onChange, rows = 3, className = "", placeholder }) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        rows={rows}
        placeholder={placeholder}
        className={`flex w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-400 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-600 resize-none ${
          isFocused ? "shadow-lg shadow-blue-500/25 scale-[1.02]" : ""
        } ${className}`}
      />
      {isFocused && (
        <div className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-500/20 to-purple-500/20 pointer-events-none animate-pulse" />
      )}
    </div>
  )
}

// Custom Label Component
const CustomLabel: React.FC<{
  htmlFor?: string
  children: React.ReactNode
  className?: string
}> = ({ htmlFor, children, className = "" }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium text-white transition-all duration-200 hover:text-blue-300 ${className}`}
    >
      {children}
    </label>
  )
}

// Enhanced Avatar Component
const CustomAvatar: React.FC<{
  src?: string
  alt?: string
  fallback: string
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}> = ({ src, alt, fallback, size = "md", className = "" }) => {
  const [isHovered, setIsHovered] = useState(false)

  const sizeClasses = {
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10 text-base",
    lg: "h-16 w-16 text-xl",
    xl: "h-24 w-24 text-2xl",
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full overflow-hidden transition-all duration-500 ease-in-out cursor-pointer ${
        isHovered
          ? "scale-110 shadow-2xl shadow-blue-500/50 rotate-3"
          : "hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25"
      } ${sizeClasses[size]} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {src ? (
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className={`h-full w-full object-cover transition-all duration-500 ${isHovered ? "scale-110 brightness-110" : ""}`}
        />
      ) : (
        <div className="flex items-center justify-center h-full w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium animate-gradient-x">
          {fallback}
        </div>
      )}
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 animate-pulse" />
      )}
    </div>
  )
}

// Custom Alert Component with enhanced animations
const CustomAlert: React.FC<{
  children: React.ReactNode
  variant?: "info" | "success" | "error"
  className?: string
}> = ({ children, variant = "info", className = "" }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const variantClasses = {
    info: "bg-gray-800 border-gray-700 text-gray-300",
    success: "bg-green-900 border-green-700 text-green-300",
    error: "bg-red-900 border-red-700 text-red-300",
  }

  return (
    <div
      className={`rounded-lg border p-4 transition-all duration-700 ease-out transform ${
        isVisible ? "translate-y-0 opacity-100 scale-100" : "-translate-y-4 opacity-0 scale-95"
      } ${variantClasses[variant]} ${className}`}
    >
      {children}
    </div>
  )
}

// Enhanced Icons with micro-interactions
const SearchIcon = () => (
  <svg
    className="h-4 w-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
)

const CameraIcon = () => (
  <svg
    className="h-3 w-3 transition-all duration-300 hover:rotate-12 hover:scale-125"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const XIcon = () => (
  <svg
    className="h-3 w-3 transition-all duration-300 hover:rotate-90 hover:scale-125"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const SaveIcon = () => (
  <svg
    className="h-4 w-4 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
    />
  </svg>
)

const MailIcon = () => (
  <svg
    className="h-5 w-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
)

const PlusIcon = () => (
  <svg
    className="h-4 w-4 transition-all duration-300 group-hover:rotate-90 group-hover:scale-125"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
)

const TrashIcon = () => (
  <svg
    className="h-4 w-4 transition-all duration-300 hover:scale-125 hover:rotate-12"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
)

const AlertCircleIcon = () => (
  <svg className="h-4 w-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const CheckCircleIcon = () => (
  <svg className="h-4 w-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [currentDate, setCurrentDate] = useState("")
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [profileData, setProfileData] = useState<ProfileData>(defaultProfileData)
  const [editData, setEditData] = useState<ProfileData>(defaultProfileData)

  // Hooks for advanced features
  const { visibleElements, observeElement } = useScrollAnimation()
  const welcomeTypewriter = useTypewriter(`Welcome, ${profileData.username}`, 100, 500)
  const aboutTypewriter = useTypewriter(profileData.aboutMe, 30, 1000)

  // Animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Scroll animation setup
  useEffect(() => {
    const elements = document.querySelectorAll("[data-animate-on-scroll]")
    elements.forEach((element, index) => {
      observeElement(element as HTMLElement, `scroll-${index}`)
    })
  }, [observeElement])

  // LocalStorage utility functions
  const saveToLocalStorage = (data: ProfileData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      return true
    } catch (error) {
      console.error("Failed to save to localStorage:", error)
      return false
    }
  }

  const loadFromLocalStorage = (): ProfileData | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed && typeof parsed === "object" && parsed.username) {
          return { ...defaultProfileData, ...parsed }
        }
      }
    } catch (error) {
      console.error("Failed to load from localStorage:", error)
    }
    return null
  }

  // Load profile data from localStorage on component mount
  useEffect(() => {
    const storedData = loadFromLocalStorage()
    if (storedData) {
      setProfileData(storedData)
      setEditData(storedData)
    }
  }, [])

  // Search functionality
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text

    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-400 text-black px-1 rounded animate-pulse">
          {part}
        </mark>
      ) : (
        part
      ),
    )
  }

  const isSearchMatch = (text: string, query: string) => {
    if (!query.trim()) return true
    return text.toLowerCase().includes(query.toLowerCase())
  }

  // Username validation function
  const validateUsername = (username: string): string | null => {
    if (!username.trim()) {
      return "Username is required"
    }
    if (username.length < 3) {
      return "Username must be at least 3 characters long"
    }
    if (username.length > 20) {
      return "Username must be less than 20 characters"
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      return "Username can only contain letters, numbers, hyphens, and underscores"
    }
    if (/^[0-9]/.test(username)) {
      return "Username cannot start with a number"
    }
    if (/[-_]{2,}/.test(username)) {
      return "Username cannot contain consecutive hyphens or underscores"
    }
    return null
  }

  // Real-time username validation
  useEffect(() => {
    if (isEditing) {
      const usernameError = validateUsername(editData.username)
      setValidationErrors((prev) => ({
        ...prev,
        username: usernameError ?? undefined,
      }))
    }
  }, [editData.username, isEditing])

  // Function to get current Indian date and time
  const getIndianDateTime = () => {
    const now = new Date()
    const options: Intl.DateTimeFormatOptions = {
      timeZone: "Asia/Kolkata",
      weekday: "short",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
    return now.toLocaleDateString("en-IN", options)
  }

  // Update date on component mount and set up daily update
  useEffect(() => {
    const updateDate = () => {
      setCurrentDate(getIndianDateTime())
    }

    updateDate()
    const interval = setInterval(updateDate, 60000)

    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)

    const msUntilMidnight = tomorrow.getTime() - now.getTime()
    const midnightTimeout = setTimeout(() => {
      updateDate()
      const dailyInterval = setInterval(updateDate, 24 * 60 * 60 * 1000)
      return () => clearInterval(dailyInterval)
    }, msUntilMidnight)

    return () => {
      clearInterval(interval)
      clearTimeout(midnightTimeout)
    }
  }, [])

  // Handle profile picture upload
  const handleProfilePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB")
      return
    }

    setIsUploading(true)

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setEditData((prev) => ({
        ...prev,
        profilePicture: result,
      }))
      setIsUploading(false)
    }
    reader.onerror = () => {
      alert("Error reading file")
      setIsUploading(false)
    }
    reader.readAsDataURL(file)
  }

  const removeProfilePicture = () => {
    setEditData((prev) => ({
      ...prev,
      profilePicture: "",
    }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
    setEditData(profileData)
    setValidationErrors({})
    setSaveMessage("")
  }

  const handleSave = async () => {
    const usernameError = validateUsername(editData.username)

    if (usernameError) {
      setValidationErrors({ username: usernameError })
      return
    }

    setIsSaving(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const saveSuccess = saveToLocalStorage(editData)

      if (saveSuccess) {
        setProfileData(editData)
        setIsEditing(false)
        setValidationErrors({})
        setSaveMessage("Profile saved successfully!")
        setTimeout(() => setSaveMessage(""), 3000)
      } else {
        throw new Error("Failed to save to localStorage")
      }
    } catch (error) {
      console.error("Save error:", error)
      setSaveMessage("Failed to save profile. Please try again.")
      setTimeout(() => setSaveMessage(""), 3000)
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setEditData(profileData)
    setIsEditing(false)
    setValidationErrors({})
    setSaveMessage("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const addEmailAddress = () => {
    const newEmail = prompt("Enter new email address:")
    if (newEmail) {
      setEditData((prev) => ({
        ...prev,
        emailAddresses: [
          ...prev.emailAddresses,
          {
            email: newEmail,
            addedDate: "Just now",
          },
        ],
      }))
    }
  }

  const removeEmailAddress = (indexToRemove: number) => {
    setEditData((prev) => ({
      ...prev,
      emailAddresses: prev.emailAddresses.filter((_, index) => index !== indexToRemove),
    }))
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Particle System */}
      <ParticleSystem />

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translate3d(0, -100%, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate3d(0, 40px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translate3d(-100%, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translate3d(100%, 0, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3) translate3d(0, 0, 0);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1) translate3d(0, 0, 0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-slideInDown {
          animation: slideInDown 0.5s ease-out;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.7s ease-out;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.7s ease-out;
        }
        
        .animate-bounceIn {
          animation: bounceIn 0.8s ease-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
        .stagger-6 { animation-delay: 0.6s; }
        
        .scroll-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }
        
        .scroll-animate.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* Header */}
      <div
        className={`relative z-10 p-6 border-b border-gray-800 transition-all duration-1000 ${isLoaded ? "animate-slideInDown" : "opacity-0"}`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="animate-slideInLeft">
            <h1 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient-x">
                {welcomeTypewriter.displayText}
                {welcomeTypewriter.isTyping && <span className="animate-pulse">|</span>}
              </span>
            </h1>
            <p className="text-gray-400 mt-2 transition-all duration-300 hover:text-gray-300 hover:scale-105">
              {currentDate}
            </p>
          </div>
          <div className="flex items-center gap-4 animate-slideInRight">
            <div className="relative group">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-400 transition-all duration-300">
                <SearchIcon />
              </div>
              <CustomInput
                placeholder="Search profile..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </div>

        <div className="h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg animate-gradient-x shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-float"></div>
      </div>

      {/* Profile Section */}
      <div className="relative z-10 p-6">
        {/* Save Message */}
        {saveMessage && (
          <div className="mb-6">
            <CustomAlert variant={saveMessage.includes("successfully") ? "success" : "error"}>
              <div className="flex items-center gap-2">
                <SaveIcon />
                <span>{saveMessage}</span>
              </div>
            </CustomAlert>
          </div>
        )}

        <div
          className={`flex items-start gap-6 mb-8 transition-all duration-1000 ${isLoaded ? "animate-fadeInUp stagger-1" : "opacity-0"}`}
          data-animate-on-scroll
        >
          {/* Profile Picture Section */}
          <div className="relative animate-float">
            <CustomAvatar
              src={isEditing ? editData.profilePicture : profileData.profilePicture}
              fallback={(isEditing ? editData.username : profileData.username).charAt(0).toUpperCase()}
              size="xl"
            />

            {isEditing && (
              <div className="absolute -bottom-2 -right-2 flex gap-1 animate-bounceIn">
                <CustomButton onClick={triggerFileInput} disabled={isUploading} size="sm" className="h-8 w-8 p-0">
                  {isUploading ? (
                    <div className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <CameraIcon />
                  )}
                </CustomButton>

                {editData.profilePicture && (
                  <CustomButton
                    onClick={removeProfilePicture}
                    variant="danger"
                    size="sm"
                    className="h-8 w-8 p-0 bg-red-600 hover:bg-red-700"
                  >
                    <XIcon />
                  </CustomButton>
                )}
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleProfilePictureUpload}
              className="hidden"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-1 animate-gradient-x">
              {profileData.fullName || "Enter your full name"}
            </h2>
            <div className="text-gray-400 mb-4 transition-colors duration-300 hover:text-gray-300">
              {isEditing ? (
                <CustomTextarea
                  value={editData.aboutMe}
                  onChange={(e) => handleInputChange("aboutMe", e.target.value)}
                  rows={3}
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p>{profileData.aboutMe || "Add a description about yourself..."}</p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            {isEditing ? (
              <>
                <CustomButton onClick={handleSave} disabled={!!validationErrors.username || isSaving} className="group">
                  {isSaving ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <SaveIcon />
                      <span className="ml-2">Save</span>
                    </>
                  )}
                </CustomButton>
                <CustomButton onClick={handleCancel} variant="secondary" disabled={isSaving}>
                  Cancel
                </CustomButton>
              </>
            ) : (
              <CustomButton onClick={handleEdit}>Edit</CustomButton>
            )}
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Full Name */}
          {(!searchQuery || isSearchMatch(profileData.fullName, searchQuery)) && (
            <div
              className={`space-y-2 scroll-animate ${visibleElements.has("scroll-0") ? "visible" : ""}`}
              data-animate-on-scroll
            >
              <CustomLabel htmlFor="fullName">Full Name</CustomLabel>
              {isEditing ? (
                <CustomInput
                  id="fullName"
                  value={editData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  placeholder="Enter your full name"
                />
              ) : (
                <div className="p-3 bg-gray-800 border border-gray-700 rounded-md text-gray-400 transition-all duration-300 hover:bg-gray-750 hover:border-gray-600 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
                  {profileData.fullName || "Enter your full name"}
                </div>
              )}
            </div>
          )}

          {/* Username */}
          {(!searchQuery || isSearchMatch(profileData.username, searchQuery)) && (
            <div
              className={`space-y-2 scroll-animate ${visibleElements.has("scroll-1") ? "visible" : ""}`}
              data-animate-on-scroll
            >
              <CustomLabel htmlFor="username">Username</CustomLabel>
              {isEditing ? (
                <div className="space-y-2">
                  <div className="relative">
                    <CustomInput
                      id="username"
                      value={editData.username}
                      onChange={(e) => handleInputChange("username", e.target.value)}
                      placeholder="Enter your username"
                      className={`pr-10 ${
                        validationErrors.username
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : editData.username && !validationErrors.username
                            ? "border-green-500 focus:border-green-500 focus:ring-green-500"
                            : ""
                      }`}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {validationErrors.username ? (
                        <div className="text-red-500">
                          <AlertCircleIcon />
                        </div>
                      ) : editData.username && !validationErrors.username ? (
                        <div className="text-green-500">
                          <CheckCircleIcon />
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {validationErrors.username && (
                    <p className="text-red-400 text-sm flex items-center gap-1 animate-slideInDown">
                      <div className="h-3 w-3">
                        <AlertCircleIcon />
                      </div>
                      {validationErrors.username}
                    </p>
                  )}
                  <div className="text-xs text-gray-500 transition-colors duration-300 hover:text-gray-400">
                    • 3-20 characters long
                    <br />• Letters, numbers, hyphens, and underscores only
                    <br />• Cannot start with a number
                    <br />• No consecutive special characters
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-gray-800 border border-gray-700 rounded-md text-gray-400 transition-all duration-300 hover:bg-gray-750 hover:border-gray-600 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
                  {highlightText(profileData.username, searchQuery)}
                </div>
              )}
            </div>
          )}

          {/* Email Address */}
          {(!searchQuery || isSearchMatch(profileData.email, searchQuery)) && (
            <div
              className={`space-y-2 scroll-animate ${visibleElements.has("scroll-2") ? "visible" : ""}`}
              data-animate-on-scroll
            >
              <CustomLabel htmlFor="email">Email Address</CustomLabel>
              {isEditing ? (
                <CustomInput
                  id="email"
                  type="email"
                  value={editData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email address"
                />
              ) : (
                <div className="p-3 bg-gray-800 border border-gray-700 rounded-md text-gray-400 transition-all duration-300 hover:bg-gray-750 hover:border-gray-600 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
                  {profileData.email || "Enter your email address"}
                </div>
              )}
            </div>
          )}

          {/* Location - Changed to text input */}
          {(!searchQuery || isSearchMatch(profileData.location, searchQuery)) && (
            <div
              className={`space-y-2 scroll-animate ${visibleElements.has("scroll-3") ? "visible" : ""}`}
              data-animate-on-scroll
            >
              <CustomLabel htmlFor="location">Location</CustomLabel>
              {isEditing ? (
                <CustomInput
                  id="location"
                  value={editData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="Enter your location (e.g., Mumbai, India)"
                />
              ) : (
                <div className="p-3 bg-gray-800 border border-gray-700 rounded-md text-gray-400 transition-all duration-300 hover:bg-gray-750 hover:border-gray-600 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
                  {profileData.location ? highlightText(profileData.location, searchQuery) : "Enter your location"}
                </div>
              )}
            </div>
          )}

          {/* Programming Languages / Skills */}
          {(!searchQuery || isSearchMatch(profileData.programmingLanguages, searchQuery)) && (
            <div
              className={`space-y-2 scroll-animate ${visibleElements.has("scroll-4") ? "visible" : ""}`}
              data-animate-on-scroll
            >
              <CustomLabel htmlFor="programmingLanguages">Programming Languages / Skills</CustomLabel>
              {isEditing ? (
                <CustomInput
                  id="programmingLanguages"
                  value={editData.programmingLanguages}
                  onChange={(e) => handleInputChange("programmingLanguages", e.target.value)}
                  placeholder="e.g., JavaScript, React, Node.js, Python, Django..."
                />
              ) : (
                <div className="p-3 bg-gray-800 border border-gray-700 rounded-md text-gray-400 transition-all duration-300 hover:bg-gray-750 hover:border-gray-600 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
                  {profileData.programmingLanguages
                    ? highlightText(profileData.programmingLanguages, searchQuery)
                    : "Enter your programming languages and skills"}
                </div>
              )}
            </div>
          )}

          {/* LinkedIn Profile Link */}
          {(!searchQuery || isSearchMatch(profileData.linkedinProfile, searchQuery)) && (
            <div
              className={`space-y-2 scroll-animate ${visibleElements.has("scroll-5") ? "visible" : ""}`}
              data-animate-on-scroll
            >
              <CustomLabel htmlFor="linkedinProfile">LinkedIn Profile Link</CustomLabel>
              {isEditing ? (
                <CustomInput
                  id="linkedinProfile"
                  type="url"
                  value={editData.linkedinProfile}
                  onChange={(e) => handleInputChange("linkedinProfile", e.target.value)}
                  placeholder="https://linkedin.com/in/your-profile"
                />
              ) : (
                <div className="p-3 bg-gray-800 border border-gray-700 rounded-md transition-all duration-300 hover:bg-gray-750 hover:border-gray-600 hover:shadow-lg hover:scale-[1.02]">
                  {profileData.linkedinProfile ? (
                    <a
                      href={profileData.linkedinProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 underline transition-all duration-200 hover:scale-105 inline-block"
                    >
                      {highlightText(profileData.linkedinProfile, searchQuery)}
                    </a>
                  ) : (
                    <span className="text-gray-400">Add LinkedIn profile link</span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Email Addresses Section - Only shows additional emails, not the main email */}
        {editData.emailAddresses.length > 0 && (
          <div
            className={`space-y-4 scroll-animate ${visibleElements.has("scroll-6") ? "visible" : ""}`}
            data-animate-on-scroll
          >
            <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient-x">
              Additional Email Addresses
            </h3>

            {editData.emailAddresses.map((emailItem, index) => {
              if (searchQuery && !isSearchMatch(emailItem.email, searchQuery)) return null

              return (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg border border-gray-700 transition-all duration-500 hover:bg-gray-750 hover:border-gray-600 hover:shadow-xl hover:scale-105 group animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-gray-400 group-hover:text-blue-400 transition-all duration-300 animate-float">
                    <MailIcon />
                  </div>
                  <div className="flex-1">
                    <p className="text-white transition-colors duration-200 group-hover:text-blue-100">
                      {highlightText(emailItem.email, searchQuery)}
                    </p>
                    <p className="text-sm text-gray-400 transition-colors duration-200 group-hover:text-gray-300">
                      {emailItem.addedDate}
                    </p>
                  </div>
                  {isEditing && (
                    <CustomButton
                      onClick={() => removeEmailAddress(index)}
                      variant="danger"
                      size="sm"
                      className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <TrashIcon />
                    </CustomButton>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {isEditing && (
          <div className="mt-6">
            <CustomButton onClick={addEmailAddress} variant="secondary" className="group animate-bounceIn">
              <PlusIcon />
              <span className="ml-2">Add Email Address</span>
            </CustomButton>
          </div>
        )}
      </div>
    </div>
  )
}
