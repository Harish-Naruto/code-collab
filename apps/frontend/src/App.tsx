import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Dashboard from './Pages/Dashboard';
import ForgotPassword from './Pages/ForgotPassword';
import Home from './Pages/Home';
import LandingPage from './Pages/Home'; // Looks like a duplicate. Fix if needed.
import CreateRoom from './Pages/CreateRoom';
import JoinRoom from './Pages/JoinRoom';
import CodeCollabPage from './Pages/CodeCollabPage';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import Error from './Pages/ui/error'; // Assuming this is a styled component for error handling 



const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create-room" element={<CreateRoom />} />
          <Route path="/join-room" element={<JoinRoom />} />
          {/* <Route path="/error" element={<Error />} /> */}
           <Route path="*" element={<Error />} />
          <Route path="/CodeCollabPage" element={<CodeCollabPage />} />
        </Routes>
        <Toaster position="top-center" reverseOrder={false} />
      </AuthProvider>
    </Router>
  );
};

export default App;
