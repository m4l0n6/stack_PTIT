import React, { useEffect, useState } from "react";
import { Link, history } from "umi";
import {
  Layout,
  Menu,
  Input,
  Button,
  Avatar,
  Dropdown,
  Popover,
  Divider,
} from "antd";
import { LogoutOutlined, SearchOutlined } from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import { useModel } from "umi";
import type { MenuProps } from "antd";
import Notification from "@/components/Notification";

const { Header } = Layout;
const { Search } = Input;

const header: MenuProps["items"] = [
  {
    key: "1",
    label: "About",
  },
  {
    key: "2",
    label: "Docs",
  },
  {
    key: "3",
    label: "PTIT",
  },
];


const HeaderBasicLauyout: React.FC = () => {
    const { user, handleLogout, loadUserFromStorage } = useModel('user');
    const [searchVisible, setSearchVisible] = useState(false);
    
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


    // Search hint content
    const searchHintContent = (
      <div className="bg-white shadow-lg p-2 w-[700px]">
        <h3 className="mb-2 font-bold">Gợi ý tìm kiếm</h3>
        <ul className="pl-4 list-disc">
          <li className="mb-1">Tìm kiếm câu hỏi theo từ khóa</li>
          <li className="mb-1">Tìm kiếm theo thẻ (tag)</li>
          <li className="mb-1">Tìm kiếm người dùng</li>
          <li className="mb-1">Tìm kiếm câu trả lời</li>
        </ul>
      </div>
    );

    const handleSearch = (value: string) => {
      console.log(value);
      setSearchVisible(false);
      history.push(`/search?q=${encodeURIComponent(value)}`);
    };

    return (
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
          <Popover
            content={searchHintContent}
            trigger="click"
            open={searchVisible}
            onOpenChange={setSearchVisible}
            placement="bottom"
            overlayClassName="search-hint-popover"
          >
            <Search
              placeholder="Tìm kiếm câu hỏi, từ khóa..."
              allowClear
              enterButton
              size="large"
              style={{ width: "50%", marginLeft: "16px" }}
              onSearch={handleSearch}
              onClick={() => setSearchVisible(true)}
            />
          </Popover>
          
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
    )
}

export default HeaderBasicLauyout;