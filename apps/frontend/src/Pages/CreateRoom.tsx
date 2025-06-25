import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const generateRoomCode = (): string => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

const CreateRoom: React.FC = () => {
  const [fileName, setFileName] = useState('');
  const [userName, setUserName] = useState('');
  const [language, setLanguage] = useState('html');
  const [isPrivate, setIsPrivate] = useState(false);
  const [roomCode, setRoomCode] = useState('');
  const [maxCollaborators, setMaxCollaborators] = useState(5);
  const [permissions, setPermissions] = useState('edit');
  const navigate = useNavigate();

  useEffect(() => {
    setRoomCode(generateRoomCode());
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(roomCode);
    alert('Room code copied to clipboard!');
  };

  const handleCreateRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const roomDetails = {
      fileName,
      userName,
      language,
      isPrivate,
      roomCode,
      maxCollaborators,
      permissions,
    };

    console.log('Room Created:', roomDetails);

    navigate(`/editor?room=${roomCode}`);
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
          "Teamwork makes the code work."
        </p>
      </div>

      {/* 🛠️ Create Room Card */}
      <div className="relative z-10 w-full max-w-2xl p-10 space-y-8 rounded-xl bg-[#121212]/90 shadow-2xl border border-gray-800 backdrop-blur-md animate-fade-in-down">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent animate-glow">
          Create a Collaborative Coding Room
        </h2>
        <form onSubmit={handleCreateRoom} className="space-y-6">
          {/* 🔹 User Name */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 bg-black border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          {/* 🔹 File Name */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">File Name</label>
            <input
              type="text"
              placeholder="e.g., main.py or index.html"
              className="w-full px-4 py-3 bg-black border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              required
            />
          </div>

          {/* 🔹 Language Selection */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-3 bg-black border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="js">JavaScript</option>
              <option value="react">React</option>
              <option value="node">Node.js</option>
              <option value="python">Python</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="csharp">C#</option>
            </select>
          </div>

          {/* 🔹 Permissions & Collaborators */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <label className="block mb-2 text-sm text-gray-300">Permissions</label>
              <select
                value={permissions}
                onChange={(e) => setPermissions(e.target.value)}
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="edit">Edit Access</option>
                <option value="view">View Only</option>
                <option value="run">Run Only</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block mb-2 text-sm text-gray-300">Maximum Collaborators</label>
              <input
                type="number"
                min={2}
                max={10}
                value={maxCollaborators}
                onChange={(e) => setMaxCollaborators(parseInt(e.target.value))}
                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 5"
              />
            </div>
          </div>

          {/* 🔹 Private Room Toggle */}
          <div className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              id="privateRoom"
              className="form-checkbox accent-blue-500"
            />
            <label htmlFor="privateRoom" className="text-gray-300">
              Make this room private
            </label>
          </div>

          {/* 🔹 Room Code Display */}
          <div className="flex justify-between items-center text-sm text-gray-400">
            <div>
              Room Code: <span className="font-mono text-white">{roomCode}</span>
            </div>
            <button type="button" onClick={handleCopyCode} className="text-blue-400 hover:underline">
              Copy Code
            </button>
          </div>

          {/* 🔹 Create Room Button */}
          <button
            type="submit"
            className="w-full py-3 text-lg rounded bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 font-semibold transition duration-300 hover:scale-105"
          >
            Create Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRoom;
