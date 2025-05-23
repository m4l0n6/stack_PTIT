import { history, useModel } from "umi";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "umi";

export default (props: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { user, loadUserFromStorage } = useModel('user');

  useEffect(() => {
    const userData = loadUserFromStorage();
    const token = localStorage.getItem("token");
    
    if (!token) {
      history.push("/login");
    } else if (userData) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(!!user);
    }
    
    setIsLoading(false);
  }, [loadUserFromStorage]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};
