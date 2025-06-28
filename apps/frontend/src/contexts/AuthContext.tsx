import { useEffect, useState, type ReactNode } from "react";
import type {  AuthUser, User } from "../types/auth";
import api from "../utils/api";
import { supabase } from "../config/supabase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./Context";


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initSession = async () => {
      const storedToken = localStorage.getItem("token");
      const storeUser = localStorage.getItem("user");

      if (storedToken && storeUser) {
        api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
        setUser(JSON.parse(storeUser));
        setLoading(false);
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.access_token) {
        try {
          const accessToken = session.access_token;
          api.defaults.headers.common["Authorization"] =`Bearer ${accessToken}`;
          const res = await api.post("/auth/verify");
          const {token,user} = res.data.data;
          setUser(user);
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          localStorage.clear();
          localStorage.setItem("token", token);
          localStorage.setItem("user",JSON.stringify(user))
        } catch (err) {
          console.error("OAuth token exchange failed, ", err);
          toast.error("Login faild. Please try again");
        }
      }
      setLoading(false);
    };
    initSession();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, user } = response.data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user",JSON.stringify(user))
      setUser(user);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // if you want you can redirect using following line
      navigate('/dashboard')
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: "Login failed. Please check your credentials.",
      };
    }
  };

  const register = async (userData:User) => {
    try {
      const response = await api.post("/auth/register", {email:userData.email,username:userData.username,password:userData.password,name:userData.name});
      const { token, user } = response.data.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user",JSON.stringify(user))
      setUser(user);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // if you want you can redirect using following line
      navigate('/dashboard')
      return { success: true };
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        message:
          "Registration failed. Please try again.",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user");
    delete api.defaults.headers.common["Authorization"]
    setUser(null)
    navigate("/")
    toast.success("You have been logged out successfully")
  }

  const ForgotPassword = async(email:string)=>{
    try{
        await api.post("/auth/forgotPassword",{email});
        return{
            success:true
        }
    }catch(error){
        console.error("Forgot password error:", error)
      return {
        success: false,
        message: "Failed to process request.",
      }
    }
  }

  const verifyOtp = async (email:string,otp:string) =>{
    try{
        const response = await api.post("/auth/verifyOtp",{email,otp});
        const {token} = response.data.data;
        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        return { success: true }

    }catch(error){
        console.error("OTP verification error:", error)
        return {
          success: false,
          message: "Failed to verify OTP.",
        }
    }
  }

  const resetPassword = async (newPassword:string) => {
    try {
      await api.post("/auth/resetPassword", { newPassword })
      return { success: true }
    } catch (error) {
      console.error("Reset password error:", error)
      return {
        success: false,
        message: "Failed to reset password.",
      }
    }
  }

  return (
    <AuthContext.Provider
        value={{
            user,
            loading,
            isAuthenticated: !!user,
            register,
            login,
            logout,
            resetPassword,
            verifyOtp,
            ForgotPassword,
        }}
    
    >
        {children}
    </AuthContext.Provider>
  );
};
