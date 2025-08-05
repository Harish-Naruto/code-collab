import { useState,useEffect, useRef } from "react"
import {
  Code2,
  Menu,
  User,
  Home,
  Terminal,
  Info,
  Users,
  LogOut,
} from "lucide-react"
import { NavLink } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

const navigationItems = [
  { name: "Home", to: "/", icon: Home },
  { name: "Compiler", to: "/code-collab-page", icon: Terminal, requiresAuth: true },
  { name: "Rooms", to: "/create-room", icon: Users, requiresAuth: true },
  { name: "About", to: "/about", icon: Info },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
  }

  const dropdownRef=useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dropdownOpen])


  return (
    <div>
      <div className="fixed top-4 right-4 z-50 flex space-x-3">
        {!user ? (
          <>
            <NavLink to="/login">
              <button className="h-9 px-4 rounded-full flex items-center justify-center text-white bg-gradient-to-br from-purple-600 to-blue-500 shadow-lg hover:scale-105 transition-all ring-2 ring-purple-500/20 text-sm font-medium">
                Log In
              </button>
            </NavLink>
            <NavLink to="/signup">
              <button className="h-9 px-4 rounded-full flex items-center justify-center text-white bg-gradient-to-br from-purple-600 to-blue-500 shadow-lg hover:scale-105 transition-all ring-2 ring-purple-500/20 text-sm font-medium">
                Sign Up
              </button>
            </NavLink>
          </>
        ) : (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="h-11 w-11 rounded-full flex items-center justify-center text-white bg-gradient-to-br from-purple-600 to-blue-500 shadow-lg hover:scale-105 transition-all ring-2 ring-purple-500/20"
            >
              <User className="h-6 w-6" />
            </button>

            {dropdownOpen && (
              <div ref={dropdownRef}  className="absolute right-0 mt-2 w-72 bg-[#1f1f1f] text-white rounded-xl shadow-lg border border-gray-800 z-50">
                <div className="p-4 border-b border-gray-700">
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>

                <div className="flex flex-col text-sm">
                  <NavLink
                    to="/profile"
                    className="px-4 py-2 hover:bg-gray-800 transition flex items-center space-x-2"
                  >
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </NavLink>
                  
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-blue-500 rounded-xl hover:bg-gray-800 transition border-t border-gray-700 flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign out</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <nav className="sticky top-0 z-40 w-full border-b backdrop-blur bg-[#121212]/95 border-gray-800">
        <div className="flex h-16 items-center justify-center px-4 w-full relative">
          {/* Left Logo */}
          <div className="absolute left-4 flex items-center space-x-3 group">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-600 to-blue-500 shadow-lg transition-transform duration-300 group-hover:scale-110">
              <Code2 className="h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-300 bg-clip-text text-transparent transition group-hover:drop-shadow-md">
              Code Collab
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-2">
            {navigationItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.requiresAuth && !user ? "#" : item.to}
                onClick={(e) => {
                  if (item.requiresAuth && !user) {
                    e.preventDefault()
                    alert("Please log in to access this page.")
                  }
                }}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? "text-white bg-purple-600/30 border border-purple-500/30"
                      : "text-gray-300 hover:bg-purple-500/10 border border-transparent hover:border-purple-500/20"
                  } transition`
                }
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden absolute right-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded hover:bg-purple-500/10 transition text-gray-300 hover:text-white"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Mobile Dropdown */}
            {isOpen && (
              <div className="absolute top-14 right-0 w-72 border border-gray-800 bg-[#121212]/95 rounded-lg shadow-xl z-50">
                <div className="flex flex-col p-4 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-600 to-blue-500 shadow-lg">
                      <Code2 className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-300 bg-clip-text text-transparent">
                      Code Collab
                    </span>
                  </div>

                  <div className="flex flex-col space-y-2">
                    {navigationItems.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.requiresAuth && !user ? "#" : item.to}
                        onClick={(e) => {
                          if (item.requiresAuth && !user) {
                            e.preventDefault()
                            alert("Please log in to access this page.")
                            return
                          }
                          setIsOpen(false)
                        }}
                        className={({ isActive }) =>
                          `flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium ${
                            isActive
                              ? "text-white bg-purple-600/30 border border-purple-500/30"
                              : "text-gray-300 hover:bg-purple-500/10 border border-transparent hover:border-purple-500/20"
                          } transition`
                        }
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}
