import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "./ui/button"
import { useAuth } from '../hooks/useAuth';

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session (adjust the key if you store differently)
    localStorage.removeItem('user');

    // Optionally clear token or other auth data
    // localStorage.removeItem('token');

    // Navigate to login page
    navigate('/home');
  };
  // const {isAuthenticated } = useAuth();

  

  return (
    <div>
      <nav className="hidden md:flex items-center space-x-8">
        <a href="/create-room" className="text-gray-300 hover:text-white transition-colors">
          Create Room
        </a>
        <a href="/join-room" className="text-gray-300 hover:text-white transition-colors">
          Join Room
        </a>
        <a href="/CodeCollabPage" className="text-gray-300 hover:text-white transition-colors">
          IDE
        </a>
        <Button onClick={handleLogout} className="bg-green-500 hover:bg-green-600 text-black font-semibold">Logout</Button>
      </nav>
    </div>
  );
};

export default Navbar;
