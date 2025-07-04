import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const {logout} = useAuth();
  const handlelogout = () =>{
    logout();
    
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-8">
      <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-400">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-[#1e1e1e] border border-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2 text-purple-400">Live Code Rooms</h2>
          <p className="text-gray-400">Join or create real-time collaborative code sessions.</p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#1e1e1e] border border-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2 text-blue-400">Video Calls</h2>
          <p className="text-gray-400">Communicate with teammates via integrated video chat.</p>
        </div>

        {/* Card 3 */}
        <div className="bg-[#1e1e1e] border border-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2 text-pink-400">Projects</h2>
          <p className="text-gray-400">Organize your collaborative projects and track progress.</p>
        </div>

        {/* Card 4: CodeCollabPage */}
        <div
          onClick={() => navigate("/CodeCollabPage")}
          className="cursor-pointer bg-[#1e1e1e] border border-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2 text-pink-400">CodeTogether</h2>
          <p className="text-gray-400">
            Code together in real-time, track edits, and build projects collaboratively.
          </p>
        </div>
      </div>
      
      {/* Additional section */}
      <div className="mt-10 bg-[#121212] border border-gray-700 p-6 rounded-xl">
        <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
          Recent Activity
        </h3>
        <ul className="text-gray-300 space-y-2">
          <li>✅ Joined Room: "Bug Fixing Sprint"</li>
          <li>🎥 Started a video call with Alice</li>
          <li>🧠 Edited file: authService.ts</li>
        </ul>
      </div>

      <button onClick={handlelogout}>Logout</button>
    </div>
  );
};

export default Dashboard;