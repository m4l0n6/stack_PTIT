import request from "umi-request";
import { User } from "./Users/typing";

interface AuthResponse {
  success: boolean;
  data: {
    token: string;
    user: User;
  };
  message?: string;
}

export function login(data: { email: string; password: string }): Promise<AuthResponse> {
  return request("/api/login", {  
    method: "POST",
    data,
    errorHandler: (error) => {
      // Nếu backend trả về lỗi tài khoản bị khoá, trả về message phù hợp
      if (error?.data?.message === 'Tài khoản đã bị khoá') {
        return Promise.reject({ ...error, message: 'Tài khoản của bạn đã bị khoá. Vui lòng liên hệ quản trị viên.' });
      }
      console.error('Login API error:', error);
      return Promise.reject(error);
    }
  });
}

export function register(data: {
  email: string;
  password: string;
  username: string;
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
