import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import LandingPage from "./Pages/Landingpage";
import ForgotPasswordPage from "./Pages/ForgotPassword";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";

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
        </Routes>
        <Toaster position="top-center" reverseOrder={false} />
      </AuthProvider>
    </Router>
  );
};

export default App;
