import React, { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../config/supabase";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useAuth();

  const handleOauth = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await login(email, password);
      if (result.success) {
        toast.success("Login successfull");
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
      {/* 🌌 Background Animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-purple-700 via-blue-500 to-purple-700 opacity-30 blur-3xl rounded-full animate-pulse-slow top-[-100px] left-[-100px]" />
        <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-blue-600 to-indigo-600 opacity-20 blur-2xl rounded-full animate-pulse-slow top-[400px] right-[50px]" />
      </div>

      {/* 🌠 Optional Quote */}
      <div className="absolute top-10 text-center px-4 z-10">
        <p className="text-lg md:text-xl text-gray-400 italic animate-fade-in">
          "Code is like humor. When you have to explain it, it's bad."
        </p>
      </div>

      {/* 🔒 Login Card */}
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
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 bg-black border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full py-2 rounded bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 font-semibold transition duration-300 hover:scale-105"
          >
            Login
          </button>
        </form>


        {/* design this Oauth butto and add github button  */}
        <button onClick={handleOauth}>login with google</button>

        

        <p className="text-center text-sm">
          Don't have an account?{" "}
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
