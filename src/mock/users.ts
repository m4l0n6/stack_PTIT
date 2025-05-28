import { User } from '@/services/Users/typing';

const users: User[] = [
  {
    id: 1,
    username: "sinh vien 1",
    email: "sv1@ptit.edu.vn",
    password: "123456", // Trường này sẽ không được trả về từ API
    created_at: "2023-09-01",
    reputation: 100,
    avatar: "https://placehold.co/150",
    role: "student" // Thêm trường role để quản lý phân quyền
  },
  {
    id: 2,
    username: "giang vien 1",
    email: "gv1@ptit.edu.vn",
    password: "123456",
    created_at: "2023-08-15",
    reputation: 500,
    avatar: "https://placehold.co/150",
    role: "teacher"
  },
  {
    id: 3,
    username: "admin",
    email: "admin@ptit.edu.vn",
    password: "admin123",
    created_at: "2023-08-01",
    reputation: 1000,
    avatar: "https://placehold.co/150",
    role: "admin"
  },
];

export default users