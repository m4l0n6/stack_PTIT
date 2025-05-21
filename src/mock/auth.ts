const users = [
  {
    id: 1,
    email: "sv1@ptit.edu.vn",
    password: "123456",
    role: "student",
    name: "Sinh Viên 1",
  },
  {
    id: 2,
    email: "gv1@ptit.edu.vn",
    password: "123456",
    role: "teacher",
    name: "Giảng Viên 1",
  },
  {
    id: 3,
    email: "admin@ptit.edu.vn",
    password: "admin123",
    role: "admin",
    name: "Quản Trị Viên",
  },
];

export default {
  "POST /api/login": (req: any, res:any) => {
    const { email, password } = req.body;
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      res.send({
        success: true,
        data: {
          token: "mock-token-" + user.id,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        },
      });
    } else {
      res
        .status(401)
        .send({ success: false, message: "Email hoặc mật khẩu không đúng" });
    }
  },

  "POST /api/register": (req: any, res: any) => {
    const { email, password, name, role } = req.body;
    const exists = users.find((u) => u.email === email);
    if (exists) {
      res.status(400).send({ success: false, message: "Email đã tồn tại" });
    } else {
      const newUser = {
        id: users.length + 1,
        email,
        password,
        name,
        role,
      };
      users.push(newUser);
      res.send({
        success: true,
        data: {
          token: "mock-token-" + newUser.id,
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
          },
        },
      });
    }
  },
};