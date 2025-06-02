import { User } from '@/services/Users/typing';

const users: User[] = [
  {
    id: 1,
    username: "sinh vien 1",
    email: "sv1@ptit.edu.vn",
    password: "123456", // Trường này sẽ không được trả về từ API
    created_at: "5/5/2025",
    reputation: 123,
    avatar: "https://placehold.co/150?text=S",
    title: "Sinh viên 1",
    bio: "Đam mê công nghệ thông tin và học hỏi không ngừng.",
    role: "student", // Thêm trường role để quản lý phân quyền
  },
  {
    id: 2,
    username: "giang vien 1",
    email: "gv1@ptit.edu.vn",
    password: "123456",
    created_at: "03/03/2025",
    reputation: 500,
    avatar: "https://placehold.co/150",
    title: "Giảng viên 1",
    bio: "Chuyên gia trong lĩnh vực khoa học máy tính, giảng dạy tại PTIT.",
    role: "teacher",
  },
  {
    id: 3,
    username: "admin",
    email: "admin@ptit.edu.vn",
    password: "admin123",
    created_at: "01/01/2025",
    reputation: 1000,
    avatar: "https://placehold.co/150",
    role: "admin",
  },
  {
    id: 4,
    username: "sinh vien 2",
    email: "sv2@ptit.edu.vn",
    password: "123456",
    created_at: "10/5/2025",
    reputation: 75,
    avatar: "https://placehold.co/150?text=S2",
    title: "Sinh viên 2",
    bio: "Yêu thích lập trình web và machine learning.",
    role: "student",
  },
];

export default users