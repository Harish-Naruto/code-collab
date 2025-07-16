import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../config/supabase";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import { Eye, EyeOff } from 'lucide-react'; 

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { login } = useAuth();

  const handleOauth = async (provider: "google" | "github") => {
    try {
      await supabase.auth.signInWithOAuth({ provider });
    } catch (error) {
      toast.error("OAuth login failed.");
      console.error("OAuth error:", error);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await login(email, password);
      if (result.success) {
        toast.success("Login successful");
      } else {
        toast.error(result.message as string);
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden text-white">
      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-purple-700 via-blue-500 to-purple-700 opacity-30 blur-3xl rounded-full animate-pulse-slow top-[-100px] left-[-100px]" />
        <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-blue-600 to-indigo-600 opacity-20 blur-2xl rounded-full animate-pulse-slow top-[400px] right-[50px]" />
      </div>

      <div className="absolute top-10 text-center px-4 z-10">
        <p className="text-lg md:text-xl text-gray-400 italic animate-fade-in">
          "Code is like humor. When you have to explain it, it's bad."
        </p>
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md p-8 space-y-6 rounded-xl bg-[#121212]/90 shadow-2xl border border-gray-800 backdrop-blur-md animate-fade-in-down">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent animate-glow">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 bg-black border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 pr-12 bg-black border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-white"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label="Toggle Password Visibility"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 font-semibold transition duration-300 hover:scale-105"
          >
            Login
          </button>
        </form>

        {/* OAuth Buttons */}
        <div className="space-y-3 pt-4">
          <button
            onClick={() => handleOauth("google")}
            className="flex items-center justify-center gap-3 w-full py-2 rounded bg-white text-black font-semibold hover:bg-gray-200 transition duration-300 hover:scale-105"
          >
            <svg className="w-5 h-5" viewBox="0 0 488 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M488 261.8c0-17.8-1.6-35-4.7-51.8H249v98h135.7c-5.9 32-23.5 59-50 77.1l81 63.2c47.4-43.7 74.3-108.2 74.3-186.5z" fill="#4285F4"/>
              <path d="M249 492c66.1 0 121.6-21.9 162.1-59.5l-81-63.2c-22.5 15.1-51.2 24-81.1 24-62.3 0-115.1-42.1-134-98.5H32.3v61.9C72.9 436 154.7 492 249 492z" fill="#34A853"/>
              <path d="M115 295.7c-10.4-30.1-10.4-62.5 0-92.6v-61.9H32.3c-34.4 68.9-34.4 147.4 0 216.3L115 295.7z" fill="#FBBC05"/>
              <path d="M249 97.6c35.9 0 68.2 12.4 93.5 36.6l70.2-70.2C370.6 24.1 316.2 0 249 0 154.7 0 72.9 56 32.3 141.2l82.7 61.9C134 139.7 186.7 97.6 249 97.6z" fill="#EA4335"/>
            </svg>
            Login with Google
          </button>
        </div>

        {/* Links */}
        <p className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
        <p className="text-center text-sm">
          Forgot your password?{" "}
          <Link to="/forgot-password" className="text-blue-400 hover:underline">
            Reset it
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
