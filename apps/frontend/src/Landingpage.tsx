import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-6 text-center">
        CodeCollab
      </h1>
      <p className="text-lg text-gray-400 max-w-md text-center mb-10">
        Collaborate in real-time with developers across the world. Share code, video chat, and build together — seamlessly.
      </p>
      <div className="flex gap-4">
        <Link
          to="/login"
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded shadow-lg hover:from-purple-500 hover:to-blue-400 transition"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-6 py-2 border border-purple-500 text-purple-400 rounded hover:bg-purple-500 hover:text-white transition"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
