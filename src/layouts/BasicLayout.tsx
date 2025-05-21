import React, { useState, useEffect } from "react";
import { Link, Outlet, history, useModel } from "umi";
import {
  LaptopOutlined,
  UserOutlined,
  HomeOutlined,
  FileTextOutlined,
  SettingOutlined,
  TagsOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme, Input, Button, Avatar, Dropdown } from "antd";

const { Header, Content, Sider, Footer } = Layout;
const { Search } = Input;

const header: MenuProps["items"] = [
  {
    key: "1",
    label: "About",
  },
  {
    key: "2",
    label:"Docs",
  },
  {
    key: "3",
    label: "PTIT",
  },
];

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

  const { user, handleLogout, loadUserFromStorage } = useModel('user');

  useEffect(() => {
    loadUserFromStorage();
  }, [loadUserFromStorage]);

  const userMenu: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Hồ sơ',
      onClick: () => history.push('/profile'),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      onClick: handleLogout,
    },
  ];
  
  return (
    <Layout className="min-h-screen">
      <Header className="flex items-center">
        <Link
          to="/ "
          style={{ display: "flex", alignItems: "center", width: "150px" }}
          className="flex items-center bg-[#001529] w-[150px]"
        >
          <h1 className="text-white text-3xl">stack PTIT</h1>
        </Link> 
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={header}
          className="flex-1 min-w-0"
        />        
        <Search
          placeholder="Search"
          allowClear
          enterButton
          size="large"
          style={{ width: "50%", marginLeft: "16px" }}
          onSearch={(value) => console.log(value)}
        />
        <div>
          {user ? (
            <Dropdown menu={{ items: userMenu }} placement="bottomRight">
              <div className="flex items-center ml-4 cursor-pointer">
                <Avatar 
                  style={{ backgroundColor: '#1677ff' }} 
                  icon={<UserOutlined />}
                  src={user.avatar}
                />
                <span className="ml-2 text-white">{user.name}</span>
              </div>
            </Dropdown>
          ) : (
            <>
              <Button
                type="primary"
                style={{ marginLeft: "8px" }}
                onClick={() => history.push("/login")}
              >
                Log In
              </Button>
              <Button
                type="default"
                style={{ marginLeft: "8px" }}
                onClick={() => history.push("/register")}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0, paddingTop: "16px  " }}
            items={sider}
          />
        </Sider>
        <Layout style={{ padding: "0 16px" }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
          <Footer style={{ textAlign: "center" }}>stack PTIT ©2025</Footer>
        </Layout>
        {/* <Sider
          width={200}
          style={{ background: colorBgContainer, padding: "16px" }}
        >
          <h2>Quy định</h2>
        </Sider> */}
      </Layout>
    </Layout>
  );
}
