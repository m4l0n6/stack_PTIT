import React, { useState } from "react";
import { Form, Input, Button, Card, Layout, Divider, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  GoogleOutlined,
  FacebookOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { Link, useModel } from "umi";
import { login } from "@/services/auth";
import { history } from "umi";

const { Header, Content } = Layout;

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useModel('user');

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await login(values);
      if (res.success) {
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        message.success("Đăng nhập thành công");
        if (res.data.user.role === "admin") {
          history.push("/admin");
        } else {
          history.push("/");
        }
      }
    } catch (err: any) {
      message.error(err?.data?.message || "Lỗi đăng nhập");
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
          title="Đăng nhập vào Stack PTIT"
          className="w-full max-w-md login-card shadow-md"
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
            
            <div className="text-right mb-4">
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
              Chưa có tài khoản? <Link className="text-blue-600 hover:text-blue-800" to="/register">Đăng ký ngay</Link>
            </div>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default LoginPage;
