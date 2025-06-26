import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import LandingPage from "./Pages/Landingpage";
import ForgotPasswordPage from "./Pages/ForgotPassword";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import CreateRoom from './Pages/CreateRoom';
import JoinRoom from './Pages/JoinRoom';
import CodeCollabPage from "./Pages/CodeCollabPage";


const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
  
        <Route path="/create-room" element={<CreateRoom />} />
        <Route path="/join-room" element={<JoinRoom />} />
        <Route path="/CodeCollabPage" element={<CodeCollabPage />} />

      </Routes>
        <Toaster position="top-center" reverseOrder={false} />
      </AuthProvider>
    </Router>
  );
};

export default App;