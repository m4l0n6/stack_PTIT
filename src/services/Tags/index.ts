const BASE_URL = "http://localhost:8000";

import request from "umi-request";
import { Tag } from "./typing";

interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Lấy danh sách tất cả các tags
export async function getTags(): Promise<APIResponse<Tag[]>> {
  return request(`${BASE_URL}/tags`, {
    method: "GET",
  });
}

// Lấy tag theo ID
export async function getTagById(id: number): Promise<APIResponse<Tag>> {
  return request(`${BASE_URL}/tags/${id}`, {
    method: "GET",
  });
}

// Tìm kiếm tags
export async function searchTags(keyword: string): Promise<APIResponse<Tag[]>> {
  return request(`${BASE_URL}/tags/search`, {
    method: "GET",
    params: { keyword },
  });
}

// Lấy danh sách tags theo dõi của user hiện tại
export async function getUserTagFollows(): Promise<APIResponse<Tag[]>> {
  return request(`${BASE_URL}/tags/followed`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}

// Theo dõi một tag
export async function followTag(tagId: number): Promise<any> {
  return request(`${BASE_URL}/tags/follow/${tagId}`, {
    method: "POST",
  });
}

// Bỏ theo dõi một tag
export async function unfollowTag(tagId: number): Promise<any> {
  return request(`${BASE_URL}/tags/follow/${tagId}`, {
    method: "DELETE",
  });
}

// Thêm tag mới
export async function addTag(data: { name: string; description?: string }) {
  return request('/api/tags', {
    method: 'POST',
    data,
  });
}

// Sửa tag
export async function updateTag(id: number, data: { name?: string; description?: string }) {
  return request(`/api/tags/${id}`, {
    method: 'PUT',
    data,
  });
}

// Xoá tag
export async function deleteTag(id: number) {
  return request(`/api/tags/${id}`, {
    method: 'DELETE',
  });
}
