import {users} from './users'; // Thay đổi đường dẫn import
import { User } from "@/services/Users/typing";

export default {
  "POST /api/login": (req: any, res: any) => {
    const { email, password } = req.body;
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      if (user.is_activate === false) {
        return res.status(403).send({ success: false, message: "Tài khoản đã bị khoá" });
      }
      // Tạo phiên bản user không có password để trả về
      const { password: _, ...safeUser } = user;
      res.send({
        success: true,
        data: {
          token: "mock-token-" + user.id,
          user: safeUser
        },
      });
    } else {
      res
        .status(401)
        .send({ success: false, message: "Email hoặc mật khẩu không đúng" });
    }
  },

  "POST /api/register": (req: any, res: any) => {
    const { email, password, username, role = "student" } = req.body;
    const exists = users.find((u) => u.email === email);
    
    if (exists) {
      res.status(400).send({ success: false, message: "Email đã tồn tại" });
    } else {
      const now = new Date().toISOString();
      const newUser: User = {
        id: users.length + 1,
        username,
        email,
        password,
        created_at: now,
        reputation: 1, // Người dùng mới bắt đầu với 1 reputation
        avatar: `https://placehold.co/150?text=${username.charAt(0).toUpperCase()}`, // Avatar mặc định
        role,
      };
      
      users.push(newUser);
      
      // Tạo phiên bản user không có password để trả về
      const { password: _, ...safeUser } = newUser;
      
      res.send({
        success: true,
        data: {
          token: "mock-token-" + newUser.id,
          user: safeUser
        },
      });
    }
  },
  
  // API lấy thông tin user hiện tại (dựa vào token)
  "GET /api/currentUser": (req: any, res: any) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token || !token.startsWith('mock-token-')) {
      return res.status(401).send({
        success: false,
        message: 'Không tìm thấy thông tin xác thực'
      });
    }
    
    const userId = parseInt(token.replace('mock-token-', ''), 10);
    const user = users.find(u => u.id === userId);
    
    if (user) {
      // Tạo phiên bản user không có password để trả về
      const { password: _, ...safeUser } = user;
      
      res.send({
        success: true,
        data: safeUser
      });
    } else {
      res.status(401).send({
        success: false,
        message: 'Người dùng không hợp lệ'
      });
    }
  },
  
  // API cập nhật thông tin user
  "PUT /api/users/:id": (req: any, res: any) => {
    const id = parseInt(req.params.id, 10);
    const token = req.headers.authorization?.split(' ')[1];
    const { username, email, avatar } = req.body;
    
    if (!token || !token.startsWith('mock-token-')) {
      return res.status(401).send({
        success: false,
        message: 'Không tìm thấy thông tin xác thực'
      });
    }
    
    const tokenUserId = parseInt(token.replace('mock-token-', ''), 10);
    
    // Kiểm tra xem người dùng có quyền cập nhật thông tin này không
    if (tokenUserId !== id) {
      const tokenUser = users.find(u => u.id === tokenUserId);
      
      if (!tokenUser || tokenUser.role !== 'admin') {
        return res.status(403).send({
          success: false,
          message: 'Bạn không có quyền cập nhật thông tin của người dùng khác'
        });
      }
    }
    
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      return res.status(404).send({
        success: false,
        message: 'Không tìm thấy người dùng'
      });
    }
    
    // Cập nhật thông tin người dùng
    if (username) users[userIndex].username = username;
    if (email) users[userIndex].email = email;
    if (avatar) users[userIndex].avatar = avatar;
    
    // Tạo phiên bản user không có password để trả về
    const { password: _, ...safeUser } = users[userIndex];
    
    res.send({
      success: true,
      data: safeUser
    });
  },
  
  // API đổi mật khẩu
  "PUT /api/users/:id/changePassword": (req: any, res: any) => {
    const id = parseInt(req.params.id, 10);
    const token = req.headers.authorization?.split(' ')[1];
    const { currentPassword, newPassword } = req.body;
    
    if (!token || !token.startsWith('mock-token-')) {
      return res.status(401).send({
        success: false,
        message: 'Không tìm thấy thông tin xác thực'
      });
    }
    
    const tokenUserId = parseInt(token.replace('mock-token-', ''), 10);
    
    // Chỉ cho phép người dùng đổi mật khẩu của chính mình
    if (tokenUserId !== id) {
      return res.status(403).send({
        success: false,
        message: 'Bạn không có quyền đổi mật khẩu của người dùng khác'
      });
    }
    
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      return res.status(404).send({
        success: false,
        message: 'Không tìm thấy người dùng'
      });
    }
    
    // Kiểm tra mật khẩu hiện tại
    if (users[userIndex].password !== currentPassword) {
      return res.status(400).send({
        success: false,
        message: 'Mật khẩu hiện tại không đúng'
      });
    }
    
    // Cập nhật mật khẩu mới
    users[userIndex].password = newPassword;
    
    res.send({
      success: true,
      message: 'Đổi mật khẩu thành công'
    });
  }
};