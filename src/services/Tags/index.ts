import request from "umi-request";
import { Tag } from "./typing";

interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Lấy danh sách tất cả các tags
export async function getTags(): Promise<APIResponse<Tag[]>> {
  return request("/api/tags", {
    method: "GET",
  });
}

// Lấy tag theo ID
export async function getTagById(id: number): Promise<APIResponse<Tag>> {
  return request(`/api/tags/${id}`, {
    method: "GET",
  });
}

// Tìm kiếm tags
export async function searchTags(keyword: string): Promise<APIResponse<Tag[]>> {
  return request("/api/tags/search", {
    method: "GET",
    params: { keyword },
  });
}
