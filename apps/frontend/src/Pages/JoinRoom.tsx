import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinRoom: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const navigate = useNavigate();

  const handleJoinRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!roomCode || roomCode.length < 4) {
      alert('Please enter a valid room code.');
      return;
    }

    // Navigate to the collaborative editor page with the room code
    navigate(`/editor?room=${roomCode}&user=${encodeURIComponent(userName)}`);
  };

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden text-white">
      {/* 🌌 Background Animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-purple-700 via-blue-500 to-purple-700 opacity-30 blur-3xl rounded-full animate-pulse-slow top-[-100px] left-[-100px]" />
        <div className="absolute w-[400px] h-[400px] bg-gradient-to-r from-blue-600 to-indigo-600 opacity-20 blur-2xl rounded-full animate-pulse-slow top-[400px] right-[50px]" />
      </div>

      {/* 🌠 Quote */}
      <div className="absolute top-10 text-center px-4 z-10">
        <p className="text-lg md:text-xl text-gray-400 italic animate-fade-in">
          "The best code is written together."
        </p>
      </div>

      {/* 🚪 Join Room Card */}
      <div className="relative z-10 w-full max-w-md p-8 space-y-6 rounded-xl bg-[#121212]/90 shadow-2xl border border-gray-800 backdrop-blur-md animate-fade-in-down">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent animate-glow">
          Join a Room
        </h2>

        <form onSubmit={handleJoinRoom} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm text-gray-300">Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 bg-black border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-300">Room Code</label>
            <input
              type="text"
              placeholder="Enter room code"
              className="w-full px-4 py-3 bg-black border border-gray-700 rounded text-white tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 font-semibold text-lg transition duration-300 hover:scale-105"
          >
            Join Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinRoom;
