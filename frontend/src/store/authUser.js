import axios from "axios";
import { create } from "zustand";
import toast from "react-hot-toast";

export const useAuthUser = create((set) => ({
  user: null,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isCheckingAuth: false,

  // Signup function
  signup: async (credential) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", credential, {
        withCredentials: true, // Only needed if using cookies for auth
      });

      set({ user: response.data.user, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error) {
      console.error("Signup error:", error);
      set({ user: null, isSigningUp: false });
      toast.error(error.response.data.message || "Something went wrong!");
      
    
    } 
  },

    // Login function
    login: async (credential) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post("/api/v1/auth/login", credential, {
        withCredentials: true, // Only needed if using cookies for auth
      });
      set({ user: response.data.user, isLoggingIn: false });
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      set({ user: null, isLoggingIn: false });
      toast.error(error.response.data.message || "Something went wrong!");
    }
  },

    // Logout function
    logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("/api/v1/auth/logout", {}, { withCredentials: true });
      set({ user: null, isLoggingOut: false });
      toast.success("Logout successful!");
    } catch (error) {
      console.error("Logout error:", error);
      set({ user: null, isLoggingOut: false });
      toast.error(error.response.data.message || "Something went wrong!");
    } 
    },

    // Check authentication status
    checkAuth: async () => {
      set({ isCheckingAuth: true });
      try {
        const response = await axios.get("/api/v1/auth/checkAuth" );
  
        set({ user: response.data.user, isCheckingAuth: false });
      } catch (error) {
        set({ isCheckingAuth: false, user: null });
        // toast.error(error.response.data.message || "An error occurred");
      }
    },


}));
