import React from "react";
import { Form, Input, Button, Card, Layout, Space } from "antd";
import {
  UserOutlined,
  LockOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Link } from "umi";
import FormItem from "antd/es/form/FormItem";

const { Header, Content } = Layout;

const LoginPage = () => {
  const onFinish = (values: any) => {
    console.log("Received values:", values);
    // Add your login logic here
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
              <div className="flex justify-between text-ms">
                <h1 className="mb-2 font-bold">Password</h1>
                <Link to="/forgot-password">Forgot password?</Link>
              </div>
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Space direction="vertical" className="w-full">
                <Button type="primary" htmlType="submit" className="w-full">
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
