import { User } from '../Users/typing';
import { Tag } from '../Tags/typing';
import { Answer } from '../Answers/typing';

export interface Question {
  id: number;
  user_id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at?: string;
  views: number;
  upvotes: number;
  downvotes: number;
  
  // Các trường quan hệ (không lưu trong DB, chỉ trả về từ API)
  user?: User;
  tags?: Tag[];
  answer_count?: number;
  
  // Thêm trường answers khi trả về từ API chi tiết câu hỏi
  answers?: Answer[];
}
