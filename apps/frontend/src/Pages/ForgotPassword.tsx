import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const quotes = [
  "Resetting is the first step to rebooting greatness.",
  "Even the best need a second chance sometimes.",
  "Start over. Reset. Reclaim your flow.",
  "Every bug has a fix. So does your login.",
  "Forgotten today, remembered tomorrow."
];

const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const ForgotPassword: React.FC = () => {
  const [step, setStep] = useState<'email' | 'otp' | 'reset'>('email');
  const [quote, setQuote] = useState('');
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState('');
  const [userOtp, setUserOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(random);
  }, []);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOtp = generateOTP();
    setOtpSent(generatedOtp);
    setStep('otp');
    console.log(`Mock OTP sent to ${email}: ${generatedOtp}`);
    // In real app, send OTP via email service here
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (userOtp === otpSent) {
      setStep('reset');
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Password reset for ${email}: ${newPassword}`);
    // Here you'd call your password reset logic
    navigate('/login');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden">
      {/* 🌌 Starfield background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-purple-700 via-blue-500 to-purple-700 opacity-30 blur-3xl rounded-full animate-pulse-slow top-[-100px] left-[-100px]" />
        <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-blue-600 to-indigo-600 opacity-20 blur-2xl rounded-full animate-pulse-slow top-[400px] right-[50px]" />
      </div>

      {/* 💬 Quote */}
      <div className="absolute top-6 text-center px-4 z-10">
        <p className="text-sm md:text-lg text-gray-400 italic animate-fade-in">
          "{quote}"
        </p>
      </div>

      {/* Form Card */}
      <div className="relative z-10 w-full max-w-md p-8 space-y-6 rounded-xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 animate-fade-in-down">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent animate-glow">
          Forgot Password
        </h2>

        {/* Step 1: Enter Email */}
        {step === 'email' && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your registered email"
              className="w-full px-4 py-2 bg-black/70 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full py-2 rounded bg-gradient-to-r from-pink-600 to-purple-500 hover:from-pink-500 hover:to-purple-400 font-semibold transition duration-300 hover:scale-105"
            >
              Send OTP
            </button>
          </form>
        )}

        {/* Step 2: OTP Verification */}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <input
              type="text"
              placeholder="Enter the OTP"
              maxLength={6}
              className="w-full px-4 py-2 bg-black/70 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-pink-500 tracking-widest text-center text-lg"
              value={userOtp}
              onChange={(e) => setUserOtp(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full py-2 rounded bg-gradient-to-r from-pink-600 to-purple-500 hover:from-pink-500 hover:to-purple-400 font-semibold transition duration-300 hover:scale-105"
            >
              Verify OTP
            </button>
          </form>
        )}

        {/* Step 3: Reset Password */}
        {step === 'reset' && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <input
              type="password"
              placeholder="Enter New Password"
              className="w-full px-4 py-2 bg-black/70 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full py-2 rounded bg-gradient-to-r from-pink-600 to-purple-500 hover:from-pink-500 hover:to-purple-400 font-semibold transition duration-300 hover:scale-105"
            >
              Reset Password
            </button>
          </form>
        )}

        <p className="text-center text-sm">
          Remembered your password?{' '}
          <Link to="/login" className="text-pink-400 hover:underline">
            Go to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
