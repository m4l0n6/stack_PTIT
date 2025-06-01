import { useEffect } from "react";
import { Link, Outlet, history, useModel } from "umi";
import {
  LaptopOutlined,
  UserOutlined,
  HomeOutlined,
  TagsOutlined,
  LogoutOutlined,
  BellOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme, Input, Button, Avatar, Dropdown, } from "antd";
import Notification from "@/components/Notification";

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
      onClick: () => {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        const formattedName = userData.username ? userData.username.replace(/\s+/g, '-') : '';
        history.push(`/users/${userData.id}/${formattedName}`);
      },
    },
    {
      key: 'logout',
      icon: <LogoutOutlined className="text-red-500"/>,
      label: <p className="text-red-500">Đăng xuất</p>,
      onClick: handleLogout,
    },
  ];
  
  return (
    <Layout className="min-h-screen">
      <Header className="z-10 fixed flex items-center w-full">
        <Link
          to="/"
          style={{ display: "flex", alignItems: "center", width: "150px" }}
          className="flex items-center bg-[#001529] w-[150px]"
        >
          <h1 className="font-bold text-white text-3xl">stack PTIT</h1>
        </Link>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={header}
          className="flex-1 min-w-0"
        />
        <Search
          placeholder="Tìm kiếm câu hỏi, từ khóa..."
          allowClear
          enterButton
          size="large"
          style={{ width: "50%", marginLeft: "16px" }}
          onSearch={(value) => console.log(value)}
        />
        <div>
          {user ? (
            <div className="flex items-center ml-4">
              <Notification numberOfNotifications={10} />
              <Dropdown menu={{ items: userMenu }} placement="bottomRight">
                <div className="flex items-center ml-4 cursor-pointer">
                  <Avatar
                    icon={<UserOutlined />}
                    src={user.avatar}
                    className="bg-[#1677ff] mr-2 text-white"
                  />
                  <span className="text-white">{user.username}</span>
                </div>
              </Dropdown>
            </div>
          ) : (
            <>
              <Button
                type="primary"
                style={{ marginLeft: "8px" }}
                onClick={() => history.push("/auth/login")}
              >
                Log In
              </Button>
              <Button
                type="default"
                style={{ marginLeft: "8px" }}
                onClick={() => history.push("/auth/register")}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </Header>
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
