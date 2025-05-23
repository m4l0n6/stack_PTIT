import { useState, useEffect, useCallback } from "react";
import { history } from "umi";
import { message } from "antd";

export default () => {
  const [user, setUser] = useState<any>(null);

  // Function to load user from localStorage
  const loadUserFromStorage = useCallback(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        setUser(userData);
        return userData;
      } catch (error) {
        console.error("Error parsing user data:", error);
        return null;
      }
    }
    return null;
  }, []);

  // Load user on initial mount
  useEffect(() => {
    loadUserFromStorage();
  }, [loadUserFromStorage]);

  // Listen for storage events (if user logs in from another tab)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user') {
        loadUserFromStorage();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [loadUserFromStorage]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    message.success("Đăng xuất thành công");
    history.push("/");
  };

  // Function to set user data in both state and localStorage
  const setUserData = (userData: any) => {
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    }
    setUser(userData);
  };

  return {
    user,
    setUser: setUserData,
    handleLogout,
    loadUserFromStorage,
  };
};
