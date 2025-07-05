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
  { name: "Home", to: "/", icon: Home },
  { name: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { name: "Compiler", to: "/compiler", icon: Terminal },
  { name: "Rooms", to: "/rooms", icon: Users },
  { name: "About", to: "/about", icon: Info },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div>
      <div className="fixed top-4 right-4 z-50">
        {!isLoggedIn ? (
          <Link to="/signup">
            <button
              onClick={() => setIsLoggedIn(true)}
              className="h-12 px-4 rounded-full flex items-center justify-center text-white bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg hover:scale-105 transition-all ring-2 ring-blue-500/20 text-sm font-medium"
            >
              Sign Up
            </button>
          </Link>
        ) : (
          <Link to="/Profile-page">
            <button className="h-12 w-12 rounded-full flex items-center justify-center text-white bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg hover:scale-105 transition-all ring-2 ring-blue-500/20">
              <User className="h-6 w-6" />
            </button>
          </Link>
        )}
      </div>

      <nav className="sticky top-0 z-40 w-full border-b backdrop-blur bg-gray-900/95 border-gray-600/50">
        <div className="flex h-16 items-center justify-center px-4 w-full relative">
          {/* Logo */}
          <div className="absolute left-4 flex items-center space-x-3 group">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg transition-transform duration-300 group-hover:scale-110">
              <Code2 className="h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-300 bg-clip-text text-transparent transition group-hover:drop-shadow-md">
              Code Collab
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-blue-500/10 border border-transparent hover:border-blue-500/20 transition"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="md:hidden absolute right-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded hover:bg-blue-500/10 transition text-gray-300 hover:text-white"
            >
              <Menu className="h-6 w-6" />
            </button>

            {isOpen && (
              <div className="absolute top-14 right-0 w-72 border border-gray-600 bg-gray-900 rounded-lg shadow-xl z-50">
                <div className="flex flex-col p-4 space-y-4">
                
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg">
                      <Code2 className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-300 bg-clip-text text-transparent">
                      Code Collab
                    </span>
                  </div>

                  <div className="flex flex-col space-y-2">
                    {navigationItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-blue-500/10 border border-transparent hover:border-blue-500/20 transition"
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
