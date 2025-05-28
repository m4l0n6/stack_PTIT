import React, { useState, useEffect } from "react";
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
import { Breadcrumb, Layout, Menu, theme, Input, Button, Avatar, Dropdown, Tooltip, Popover, Tabs, List, Badge, Divider } from "antd";

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

  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const numberOfNotifications = 15;

  const { user, handleLogout, loadUserFromStorage } = useModel('user');

  useEffect(() => {
    loadUserFromStorage();
  }, [loadUserFromStorage]);
  const userMenu: MenuProps['items'] = [
    {      key: 'profile',
      icon: <UserOutlined />,
      label: 'Hồ sơ',      onClick: () => {
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
      <Header className="flex items-center">
        <Link
          to="/ "
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
          placeholder="Search"
          allowClear
          enterButton
          size="large"
          style={{ width: "50%", marginLeft: "16px" }}
          onSearch={(value) => console.log(value)}
        />
        <div>
          {user ? (
            <div className="flex items-center ml-4">
              <Tooltip title="Thông báo">
                <Popover
                  content={
                    <>
                      <Tabs
                        defaultActiveKey="1"
                        centered
                        items={[
                          {
                            key: "1",
                            label: `Thông báo (${numberOfNotifications})`,
                            children: (
                              <List className="pb-8 max-h-[400px] overflow-y-auto">
                                {Array.from(
                                  { length: numberOfNotifications },
                                  (_, index) => (
                                    <List.Item
                                      key={index}
                                      className="hover:bg-[#f5f5f5] hover:cursor-pointer"
                                    >
                                      <List.Item.Meta
                                        title={
                                          <p>Thông báo {index + 1}</p>
                                        }
                                        description="Nội dung thông báo"
                                        className="px-3"
                                      />
                                      <p className="text-gray-400">31/08/2005</p>
                                    </List.Item>
                                  )
                                )}
                              </List>
                            ),
                          },
                        ]}
                        className="w-[400px]"
                      />
                      <div className="right-0 bottom-0 left-0 absolute flex justify-center bg-white p-2 border-t">
                        <div className="text-center basis-1/2">Đánh dấu đã đọc</div>
                        <Divider type="vertical" />
                        <div className="text-center basis-1/2">Tải thêm</div>
                      </div>
                    </>
                  }
                  onOpenChange={handleOpenChange}
                  trigger="click"
                  placement="bottomRight"
                  className="relative"
                >
                  <Badge
                    count={numberOfNotifications}
                    size="small"
                    offset={[0, 0]}
                  >
                    <Button
                      type="text"
                      icon={<BellOutlined style={{ fontSize: 20 }} />}
                      style={{ color: "#fff" }}
                    />
                  </Badge>
                </Popover>
              </Tooltip>
              <Dropdown menu={{ items: userMenu }} placement="bottomRight">
                <div className="flex items-center ml-4 cursor-pointer">
                  <Avatar
                    style={{ backgroundColor: "#1677ff" }}
                    icon={<UserOutlined />}
                    src={user.avatar}
                  />G
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
