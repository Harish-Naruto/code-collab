import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { User } from '../types/auth';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const quotes = [
  "Code never lies, comments sometimes do.",
  "Talk is cheap. Show me the code.",
  "Programs must be written for people to read.",
  "Always code as if the guy maintaining it is a psychopath.",
  "Before software can be reusable, it first has to be usable."
];

const Signup: React.FC = () => {
  const [quote, setQuote] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name,setName] = useState('');
  const [username,setUsername] = useState('');
  const {register} = useAuth();

  
  useEffect(() => {
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(random);
  }, []);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try{

      const userData:User = {
        email,
        password,
        name,
        username
      }
      const result = await register(userData);
      if (result.success) {
        toast.success("Registration successful!")
        
      } else {
        toast.error(result.message as string)
      }
    }catch(error){
      toast.error("An unexpected error occurred. Please try again.")
      console.error("Registration error:", error)
    }


    
    
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      {/* 🌌 Starfield background */}
     <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-purple-700 via-blue-500 to-purple-700 opacity-30 blur-3xl rounded-full animate-pulse-slow top-[-100px] left-[-100px]" />
        <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-blue-600 to-indigo-600 opacity-20 blur-2xl rounded-full animate-pulse-slow top-[400px] right-[50px]" />
      </div>

      {/* 💬 Random Quote */}
      <div className="absolute top-6 text-center px-4 z-10">
        <p className="text-sm md:text-lg text-gray-400 italic animate-fade-in">
          "{quote}"
        </p>
      </div>

      {/* 🧊 Signup Card */}
      <div className="relative z-10 w-full max-w-md p-8 space-y-6 rounded-xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 animate-fade-in-down">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent animate-glow">
          Create Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-4 py-2 bg-black/70 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
             value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 bg-black/70 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 bg-black/70 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Set Password"
            className="w-full px-4 py-2 bg-black/70 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 bg-black/70 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
          <button
            type="submit"
            className="w-full py-2 rounded bg-gradient-to-r from-pink-600 to-purple-500 hover:from-pink-500 hover:to-purple-400 font-semibold transition duration-300 hover:scale-105"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-pink-400 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
