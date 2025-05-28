import request from "umi-request";
import { Question } from "./typing";
import { Answer } from "../Answers/typing";
import { Comment } from "../Comments/typing";

interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface PaginatedResponse<T> {
  success: boolean;
  data: {
    list: T[];
    total: number;
    page: number;
    pageSize: number;
  };
  message?: string;
}

interface SearchResponse<T> {
  success: boolean;
  data: {
    list: T[];
    total: number;
  };
  message?: string;
}

// Lấy danh sách câu hỏi
export async function getQuestions(params?: {
  page?: number;
  pageSize?: number;
  sort?: string;
  filter?: string;
}): Promise<PaginatedResponse<Question>> {
  return request("/api/questions", {
    method: "GET",
    params,
  });
}

// Lấy chi tiết câu hỏi
export async function getQuestionDetail(id: number): Promise<APIResponse<Question>> {
  console.log("Calling API for question ID:", id); // Log để debug
  return request(`/api/questions/${id}`, {
    method: "GET",
  });
}

// Tạo câu hỏi mới
export async function createQuestion(data: {
  title: string;
  content: string;
  tags: string[];
}): Promise<APIResponse<Question>> {
  return request("/api/questions", {
    method: "POST",
    data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

// Bình chọn câu hỏi
export async function voteQuestion(id: number, direction: "up" | "down"): Promise<APIResponse<Question>> {
  return request(`/api/questions/${id}/vote`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: { direction },
  });
}

// Thêm câu trả lời cho câu hỏi
export async function createAnswer(questionId: number, content: string): Promise<APIResponse<Answer>> {
  return request(`/api/questions/${questionId}/answers`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: { content },
  });
}

// Bình chọn câu trả lời
export async function voteAnswer(questionId: number, answerId: number, direction: "up" | "down"): Promise<APIResponse<Answer>> {
  return request(`/api/questions/${questionId}/answers/${answerId}/vote`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: { direction },
  });
}

// Đánh dấu câu trả lời là đúng (chấp nhận)
export async function acceptAnswer(questionId: number, answerId: number): Promise<APIResponse<Answer>> {
  return request(`/api/questions/${questionId}/answers/${answerId}/accept`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

// Thêm bình luận cho câu trả lời
export async function createComment(questionId: number, answerId: number, content: string): Promise<APIResponse<Comment>> {
  return request(`/api/questions/${questionId}/answers/${answerId}/comments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: { content },
  });
}

// Tìm kiếm câu hỏi
export async function searchQuestions(params: {
  keyword?: string;
  tag?: string;
}): Promise<SearchResponse<Question>> {
  return request("/api/questions/search", {
    method: "GET",
    params,
  });
}