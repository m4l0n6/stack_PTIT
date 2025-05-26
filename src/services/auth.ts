import request from "umi-request";

interface AuthResponse {
  success: boolean;
  data: {
    token: string;
    user: {
      id: number;
      name: string;
      email: string;
      role: string;
    };
  };
  message?: string;
}

export function login(data: { email: string; password: string }): Promise<AuthResponse> {
  return request("/api/login", {  
    method: "POST",
    data,
    errorHandler: (error) => {
      console.error('Login API error:', error);
      return Promise.reject(error);
    }
  });
}

export function register(data: {
  email: string;
  password: string;
  name: string;
  role: string;
}): Promise<AuthResponse> {
  return request("/api/register", {
    method: "POST",
    data,
    errorHandler: (error) => {
      console.error('Register API error:', error);
      return Promise.reject(error);
    }
  });
}
