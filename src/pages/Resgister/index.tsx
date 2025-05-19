import { Form, Input, Button, Card, Layout, Divider, Space } from "antd";
import {
  UserOutlined,
  LockOutlined,
  GoogleOutlined,
  FacebookOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { Link } from "umi";

const { Header, Content } = Layout;

const RegisterPage = () => {
  const onFinish = (values: any) => {
    console.log("Received values:", values);
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
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <h1 className="mb-2 font-bold text-ms text-left">Comfirm Password</h1>
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Comfirm Password"
              />
            </Form.Item>
            <Form.Item>
              <Space direction="vertical" className="w-full">
                <Button type="primary" htmlType="submit" className="w-full">
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
