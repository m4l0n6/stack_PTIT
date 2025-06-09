import request from "umi-request";
import { User } from "./typing";
import { Question } from "../Questions/typing";
import { Answer } from "../Answers/typing";
import { Tag } from "../Tags/typing";

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

// Lấy danh sách câu hỏi của người dùng
export const getUserQuestions = async (userId: number): Promise<APIResponse<Question[]>> => {
  try {
    const response = await request.get(`/api/users/${userId}/questions`);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error("Error fetching user questions:", error);
    return {
      success: false,
      message: "Không thể lấy danh sách câu hỏi của người dùng"
    };
  }
};

// Lấy danh sách câu trả lời của người dùng
export const getUserAnswers = async (userId: number): Promise<APIResponse<Answer[]>> => {
  try {
    const response = await request.get(`/api/users/${userId}/answers`);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error("Error fetching user answers:", error);
    return {
      success: false,
      message: "Không thể lấy danh sách câu trả lời của người dùng"
    };
  }
};

// Lấy danh sách thẻ phổ biến của người dùng
export const getUserTags = async (userId: number): Promise<APIResponse<Tag[]>> => {
  try {
    const response = await request.get(`/api/users/${userId}/tags`);
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    console.error("Error fetching user tags:", error);
    return {
      success: false,
      message: "Không thể lấy danh sách thẻ của người dùng"
    };
  }
};

