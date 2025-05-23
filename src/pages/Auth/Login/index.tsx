import React, { useState } from "react";
import { Form, Input, Button, Card, Layout, Space, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  ArrowLeftOutlined,
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
    <Layout className="min-h-screen">
      <Header className="flex items-center">
        <Link to="/" className="flex items-center">
          <h1 className="text-white text-3xl">stack PTIT</h1>
        </Link>
      </Header>
      <Content className="flex justify-center items-center px-[50px]">
        <Card title="Login" className="w-[400px] text-center login-card">
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Space direction="vertical" className="w-full">
                <Button
                  loading={loading}
                  type="primary"
                  htmlType="submit"
                  block
                  className="w-full"
                >
                  Log in
                </Button>
                <div>
                  No account? <Link to="/register">Register</Link>
                </div>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default LoginPage;
