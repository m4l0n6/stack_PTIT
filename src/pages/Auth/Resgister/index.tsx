import { Form, Input, Button, Card, Layout, Divider, Space, message } from "antd";
import React, { useState } from "react";
import {
  UserOutlined,
  LockOutlined,
  GoogleOutlined,
  FacebookOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { Link, useModel, history } from "umi";
import { register } from "@/services/auth";

const { Header, Content } = Layout;

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useModel('user');

  const onFinish = async (values: any) => {
    if (values.password !== values.confirmPassword) {
      message.error("Mật khẩu xác nhận không khớp!");
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
        // Use our new model function to set user in both localStorage and state
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
    <Layout className="min-h-screen">
      <Header className="flex items-center">
        <Link to="/" className="flex items-center">
          <h1 className="text-white text-3xl">stack PTIT</h1>
        </Link>
      </Header>
      <Content className="flex justify-center items-center px-[50px]">
        <Card title="Sign Up" className="w-[400px] text-center register-card">
          <div className="flex gap-2">
            <Button
              type="default"
              className="flex justify-center items-center bg-[#db4437] h-10 text-white"
              style={{ width: "calc(100%/3 - 10px)" }}
              onClick={() => console.log("Sign up with Google")}
              icon={<GoogleOutlined />}
            />

            <Button
              type="default"
              className="flex justify-center items-center bg-[#3b5998] h-10 text-white"
              style={{ width: "calc(100%/3 - 10px)" }}
              onClick={() => console.log("Sign up with Facebook")}
              icon={<FacebookOutlined />}
            />

            <Button
              type="default"
              className="flex justify-center items-center bg-[#333] h-10 text-white"
              style={{ width: "calc(100%/3 - 10px)" }}
              onClick={() => console.log("Sign up with GitHub")}
              icon={<GithubOutlined />}
            />
          </div>
          <Divider style={{ borderColor: "black" }}>or</Divider>
          <Form name="resgister" onFinish={onFinish}>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <h1 className="mb-2 font-bold text-ms text-left">Username</h1>
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <h1 className="mb-2 font-bold text-ms text-left">Email</h1>
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <h1 className="mb-2 font-bold text-ms text-left">Password</h1>
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />            </Form.Item>
            <Form.Item
              name="confirmPassword"
              rules={[
                { required: true, message: "Please confirm your password!" },
              ]}
            >              <h1 className="mb-2 font-bold text-ms text-left">Confirm Password</h1>
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Item>
            <Form.Item>
              <Space direction="vertical" className="w-full">
                <Button type="primary" htmlType="submit" loading={loading} className="w-full">
                  Sign up
                </Button>
                <div>
                  Have account? <Link to="/login">Login</Link>
                </div>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default RegisterPage;
