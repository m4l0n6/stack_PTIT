import React, { useState } from "react";
import { Form, Input, Button, Card, Divider, message } from "antd";
import {
  GoogleOutlined,
  FacebookOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { Link, useModel } from "umi";
import { login } from "@/services/auth";
import { history } from "umi";
import SocialAuth from "@/components/SocialAuth";

const LoginPage: React.FC = () => {  const [loading, setLoading] = useState(false);
  const { setUser, redirectBasedOnRole } = useModel('user');
  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await login(values);
      if (res.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        message.success("Đăng nhập thành công");
        
        // Kiểm tra nếu có URL chuyển hướng sau đăng nhập
        const redirectUrl = localStorage.getItem('redirectAfterLogin');
        if (redirectUrl) {
          localStorage.removeItem('redirectAfterLogin');
          history.push(redirectUrl);
        } else {
          // Nếu không có, sử dụng hàm từ model để điều hướng dựa trên vai trò
          redirectBasedOnRole(res.data.user);
        }
      }
    } catch (err: any) {
      message.error(err?.data?.message || "Lỗi đăng nhập");
    } finally {
      setLoading(false);
    }
  };

  return (
        <Card 
          title="Đăng nhập vào Stack PTIT"
          className="shadow-md w-full max-w-md login-card"
          headStyle={{ fontSize: "20px", textAlign: "center", fontWeight: "bold" }}
        >
          <SocialAuth />
          
          <Divider style={{ borderColor: "#d9d9d9" }}>hoặc đăng nhập với email</Divider>
          
          <Form
            name="login"
            layout="vertical"
            onFinish={onFinish}
          >
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
              ]}
            >
              <Input.Password
                placeholder="Nhập mật khẩu của bạn"
                size="large"
              />
            </Form.Item>
            
            <div className="mb-4 text-right">
              <Link className="text-blue-600 hover:text-blue-800" to="/forgot-password">
                Quên mật khẩu?
              </Link>
            </div>
            
            <Form.Item>
              <Button
                loading={loading}
                type="primary"
                htmlType="submit"
                block
                size="large"
                className="bg-blue-600 hover:bg-blue-700"
              >
                Đăng nhập
              </Button>
            </Form.Item>
            
            <div className="text-center">
              Chưa có tài khoản? <Link className="text-blue-600 hover:text-blue-800" to="/auth/register">Đăng ký ngay</Link>
            </div>
          </Form>
        </Card>
  );
};

export default LoginPage;
