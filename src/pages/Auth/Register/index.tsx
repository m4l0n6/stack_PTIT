import { Form, Input, Button, Card, Layout, Divider, message, Checkbox } from "antd";
import React, { useState } from "react";
import {
  UserOutlined,
  LockOutlined,
  GoogleOutlined,
  FacebookOutlined,
  GithubOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Link, useModel, history } from "umi";
import { register } from "@/services/auth";

const { Header, Content } = Layout;

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useModel('user');
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    if (values.password !== values.confirmPassword) {
      message.error("Mật khẩu xác nhận không khớp!");
      return;
    }

    if (!values.agreement) {
      message.error("Bạn cần đồng ý với điều khoản sử dụng!");
      return;
    }

    setLoading(true);
    try {
      const res = await register({
        email: values.email,
        password: values.password,
        name: values.username,
        role: "student" // Default role
      });
      
      if (res.success) {
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        message.success("Đăng ký thành công");
        history.push("/");
      }
    } catch (err: any) {
      message.error(err?.data?.message || "Lỗi đăng ký");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Header className="flex items-center bg-white shadow-sm">
        <Link to="/" className="flex items-center">
          <h1 className="text-blue-700 text-3xl font-bold">stack PTIT</h1>
        </Link>
      </Header>
      <Content className="flex justify-center items-center p-6">
        <Card 
          title="Đăng ký tài khoản mới"
          className="w-full max-w-md register-card shadow-md"
          headStyle={{ fontSize: "20px", textAlign: "center", fontWeight: "bold" }}
        >
          <div className="flex gap-2 mb-4">
            <Button
              type="default"
              className="flex justify-center items-center bg-[#db4437] h-10 text-white hover:opacity-90"
              style={{ width: "calc(100%/3 - 10px)" }}
              icon={<GoogleOutlined />}
            />
            <Button
              type="default"
              className="flex justify-center items-center bg-[#3b5998] h-10 text-white hover:opacity-90"
              style={{ width: "calc(100%/3 - 10px)" }}
              icon={<FacebookOutlined />}
            />
            <Button
              type="default"
              className="flex justify-center items-center bg-[#333] h-10 text-white hover:opacity-90" 
              style={{ width: "calc(100%/3 - 10px)" }}
              icon={<GithubOutlined />}
            />
          </div>
          
          <Divider style={{ borderColor: "#d9d9d9" }}>hoặc đăng ký với email</Divider>
          
          <Form 
            form={form}
            name="register" 
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              label={<span className="font-bold">Tên đầy đủ</span>}
              rules={[
                { required: true, message: "Vui lòng nhập tên của bạn!" },
                { min: 3, message: "Tên phải có ít nhất 3 ký tự!" }
              ]}
            >
              <Input 
                placeholder="Nhập tên đầy đủ của bạn" 
                size="large" 
              />
            </Form.Item>
            
            <Form.Item
              name="email"
              label={<span className="font-bold">Email</span>}
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không đúng định dạng!" }
              ]}
            >
              <Input 
                placeholder="Nhập địa chỉ email của bạn" 
                size="large" 
              />
            </Form.Item>
            
            <Form.Item
              name="password"
              label={<span className="font-bold">Mật khẩu</span>}
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu!" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" }
              ]}
            >
              <Input.Password
                placeholder="Tạo mật khẩu mới"
                size="large"
              />
            </Form.Item>
            
            <Form.Item
              name="confirmPassword"
              label={<span className="font-bold">Xác nhận mật khẩu</span>}
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                  },
                })
              ]}
            >
              <Input.Password
                placeholder="Xác nhận mật khẩu của bạn"
                size="large"
              />
            </Form.Item>
            
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                { 
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('Bạn cần đồng ý với điều khoản sử dụng!')) 
                }
              ]}
            >
              <Checkbox>
                Tôi đã đọc và đồng ý với <a href="#" className="text-blue-600">Điều khoản sử dụng</a> và <a href="#" className="text-blue-600">Chính sách bảo mật</a>
              </Checkbox>
            </Form.Item>
            
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="large"
              >
                Đăng ký
              </Button>
            </Form.Item>
            
            <div className="text-center">
              Đã có tài khoản? <Link className="text-blue-600 hover:text-blue-800" to="/login">Đăng nhập</Link>
            </div>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default RegisterPage; 