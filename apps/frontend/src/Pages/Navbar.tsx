"use client"

import { useState } from "react"
import {
  Code2,
  Menu,
  User,
  Home,
  LayoutDashboard,
  Terminal,
  Info,
  Users,
} from "lucide-react"
import { Link } from "react-router-dom"

const navigationItems = [
  {
    name: "Home",
    to: "/",
    icon: Home,
  },
  {
    name: "Dashboard",
    to: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Compiler",
    to: "/compiler",
    icon: Terminal,
  },
  {
    name: "Rooms",
    to: "/rooms",
    icon: Users,
  },
  {
    name: "About",
    to: "/about",
    icon: Info,
  },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const colors = {
    primary: "#1e1b4b",
    secondary: "#312e81",
    accent: "#3b82f6",
    accentPurple: "#8b5cf6",
    surface: "#0f172a",
    surfaceLight: "#1e293b",
  }

  return (
    <div>
      <style>{`
        .navbar-gradient {
          background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.accent} 100%);
        }
        .logo-gradient {
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #3b82f6 100%);
        }
        .text-gradient {
          background: linear-gradient(90deg, #60a5fa 0%, #a78bfa 50%, #93c5fd 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hover-gradient:hover {
          background: linear-gradient(90deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
          border-color: rgba(59, 130, 246, 0.2);
        }
        .profile-gradient {
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
        }
        .logo-hover:hover .logo-icon {
          transform: scale(1.1);
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.4), 0 0 40px rgba(139, 92, 246, 0.3);
        }
        .logo-hover:hover .logo-text {
          text-shadow: 0 0 10px rgba(96, 165, 250, 0.5);
        }
        .logo-icon {
          transition: all 0.3s ease;
        }
        .logo-text {
          transition: all 0.3s ease;
        }
        .profile-corner {
          position: fixed;
          top: 1rem;
          right: 1rem;
          z-index: 60;
        }
        .profile-corner-button {
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
          transition: all 0.3s ease;
        }
        .profile-corner-button:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 25px rgba(59, 130, 246, 0.4), 0 0 20px rgba(139, 92, 246, 0.3);
        }
      `}</style>

      {/* Profile Icon with Link */}
      <div className="profile-corner">
        <Link to="/profile-page">
          <button className="profile-corner-button h-12 w-12 rounded-full flex items-center justify-center text-white ring-2 ring-blue-500/20">
            <User className="h-6 w-6" />
          </button>
        </Link>
      </div>

      <nav
        className="sticky top-0 z-50 w-full border-b backdrop-blur"
        style={{
          borderColor: "rgba(75, 85, 99, 0.5)",
          backgroundColor: "rgba(3, 7, 18, 0.95)",
        }}
      >
        <div className="w-full flex h-16 items-center justify-center px-4">
          {/* Logo */}
          <div className="absolute left-4">
            <Link to="/" className="flex items-center space-x-2 group logo-hover">
              <div className="flex items-center space-x-4">
                <div className="logo-gradient logo-icon rounded-xl p-3 shadow-lg">
                  <Code2 className="h-7 w-7 text-white" />
                </div>
                <span className="text-2xl font-bold text-gradient logo-text">Code Collab</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="hover-gradient flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-medium text-gray-300 transition-all duration-200 hover:text-white border border-transparent"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden absolute right-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="hover-gradient text-gray-300 hover:text-white p-2 rounded transition-all duration-200"
            >
              <Menu className="h-6 w-6" />
            </button>

            {isOpen && (
              <div
                className="absolute top-12 right-0 w-[300px] border rounded-lg shadow-xl z-50"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: "rgba(75, 85, 99, 1)",
                }}
              >
                <div className="flex flex-col space-y-4 p-4">
                  {/* Mobile Logo */}
                  <div className="flex items-center space-x-3 px-2">
                    <div className="logo-gradient rounded-xl p-2.5 shadow-lg">
                      <Code2 className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xl font-bold text-gradient">Code Collab</span>
                  </div>

                  {/* Navigation Items */}
                  <div className="flex flex-col space-y-2">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        onClick={() => setIsOpen(false)}
                        className="hover-gradient flex items-center space-x-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-300 transition-all duration-200 hover:text-white border border-transparent"
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
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
