import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { User } from '../types/auth';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react'; // icons for toggle

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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register } = useAuth();

  useEffect(() => {
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(random);
  }, []);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  };

  const isStrongPassword = (password: string) => {
    const minLength = /.{8,}/;
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasNumber = /[0-9]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    return (
      minLength.test(password) &&
      hasUpperCase.test(password) &&
      hasLowerCase.test(password) &&
      hasNumber.test(password) &&
      hasSpecialChar.test(password)
    );
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !username || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields.');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Invalid email format.');
      return;
    }

    if (!isStrongPassword(password)) {
      toast.error(
        'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.'
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    try {
      const userData: User = {
        email,
        password,
        name,
        username
      };

      const result = await register(userData);
      console.log("Register Result:", result);

      if (result.success) {
        toast.success("Registration successful!");
      } else {
        toast.error(result.message || "Registration failed.");
      }
    } catch (error: any) {
      toast.error("An unexpected error occurred. Check console.");
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      {/* Starfield background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-purple-700 via-blue-500 to-purple-700 opacity-30 blur-3xl rounded-full animate-pulse-slow top-[-100px] left-[-100px]" />
        <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-blue-600 to-indigo-600 opacity-20 blur-2xl rounded-full animate-pulse-slow top-[400px] right-[50px]" />
      </div>

      {/* Quote */}
      <div className="absolute top-6 text-center px-4 z-10">
        <p className="text-sm md:text-lg text-gray-400 italic animate-fade-in">
          "{quote}"
        </p>
      </div>

      {/* Signup card */}
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
          
          {/* Password field with toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Set Password"
              className="w-full px-4 py-2 pr-10 bg-black/70 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password with toggle */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 pr-10 bg-black/70 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              onClick={() => setShowConfirmPassword(prev => !prev)}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <p className="text-xs text-gray-400">
            Password must be at least 8 characters and include: uppercase, lowercase, number, and special character.
          </p>

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
