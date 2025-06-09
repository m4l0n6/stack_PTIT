import { useEffect } from "react";
import { Link, Outlet, history, useModel } from "umi";
import {
  LaptopOutlined,
  HomeOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import HeaderAppLauyout from "./components/AppLayout/Header";

const { Content, Sider, Footer } = Layout;


const sider: MenuProps["items"] = [
  {
    key: "sub1",
    icon: <HomeOutlined />,
    label: <Link to="/">Trang chủ</Link>,
  },
  {
    key: "sub2",
    icon: <LaptopOutlined />,
    label: <Link to="/questions">Câu hỏi</Link>,
  },
  {
    key: "sub3",
    icon: <TagsOutlined />,
    label: <Link to="/tags">Từ khóa</Link>,
  },
];

export default function AppLayout() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="min-h-screen">
      <HeaderAppLauyout />
      <Layout style={{ marginTop: 64 }}>
        <Sider 
          width={200} 
          style={{ 
            background: colorBgContainer,
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 64,
            bottom: 0,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0, paddingTop: "16px" }}
            items={sider}
          />
        </Sider>
        <Layout style={{ marginLeft: 200, padding: "0 16px" }}>
          <Content
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
            className="m-0 p-6 min-h-[calc(100vh-64px-69px)] overflow-y-auto"
          >
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>stack PTIT ©2025</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}
