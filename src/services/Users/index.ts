import request from "umi-request";
import { User } from "./typing";

interface APIResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export const getUserById = async (id: string): Promise<APIResponse<User>> => {
  try {
    // Gọi API để lấy user theo ID
    const response = await request.get(`/api/users/${id}`);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error("Error fetching user:", error);
    return {
      success: false,
      message: "Không thể lấy thông tin người dùng"
    };
  }
};
