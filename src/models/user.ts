import { useState, useEffect, useCallback } from "react";
import { history } from "umi";
import { message } from "antd";
import { User } from "@/services/Users/typing";
import { updateUser } from "@/services/Users";

export default () => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);

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
    setUser(undefined);
    message.success("Đăng xuất thành công");
    history.push("/auth/login");
  };
  
  // Hàm điều hướng dựa trên vai trò người dùng
  const redirectBasedOnRole = (userData: User) => {
    if (!userData) return;
    
    switch (userData.role) {
      case 'admin':
        history.push('/dashboard');
        break;
      case 'teacher':
      case 'student':
        history.push('/');
        break;
      default:
        history.push('/');
    }
  };


  const setUserData = (userData: any) => {
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
    }
    setUser(userData);
  };

  // Cập nhật thông tin người dùng
  const updateUserInfo = useCallback(async (userData: Partial<User>) => {
    if (!user) return false;
    
    setLoading(true);
    try {
      // Gọi API cập nhật user
      const response = await updateUser(user.id.toString(), userData);
      
      if (response.success) {
        // Cập nhật state local với dữ liệu mới
        setUser({...user, ...userData});
        message.success('Cập nhật thông tin thành công');
        return true;
      } else {
        message.error(response.message || 'Cập nhật thông tin thất bại');
        return false;
      }
    } catch (error) {
      console.error('Error updating user:', error);
      message.error('Có lỗi xảy ra khi cập nhật thông tin');
      return false;
    } finally {
      setLoading(false);
    }
  }, [user]);

  return {
    user,
    setUser: setUserData,
    handleLogout,
    loadUserFromStorage,
    redirectBasedOnRole,
    loading,
    updateUserInfo,
  };
};
