import {
  Menu,
} from "antd";
import React from "react";
import type { MenuProps } from "antd";
import { Outlet, Link } from "umi";

const settingMenu: MenuProps["items"] = [
  {
    key: "grp1",
    label: <p className="font-bold text-black">Cài đặt tài khoản</p>,
    type: "group",
  children: [
      { key: "1", label: 
        <Link to="edit">Thông tin tài khoản</Link>
       },
      { key: "2", label: 
        <Link to="account">Chỉnh sửa tài khoản</Link>
       },
    ],
  },
  {
    key: "grp2",
    label: <p className="font-bold text-black">Cài đặt trang</p>,
    type: "group",
    children: [{ key: "3", label: <Link to="preferences">Giao diện</Link> }],
  },
];

const Setting: React.FC = () => {
  return (
    <div className="flex">
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ height: "100%", borderRight: 0 }}
        items={settingMenu}
        className="w-1/5"
      />
      <div className="p-4 w-4/5">
        <Outlet />
      </div>
    </div>
  );
};

export default Setting;
