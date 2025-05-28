export interface User {
  id: number;
  username: string;
  email: string;
  password?: string;
  created_at: string;
  reputation: number;
  avatar?: string; // thêm cho UI
  role?: string;
}
