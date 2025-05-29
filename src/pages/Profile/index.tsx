import { useModel, Link } from "umi";
import { Image, Tabs, Button, Skeleton } from "antd";
import {
  UserOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import type { TabsProps } from "antd";
import Profile from "./components/Profile";
import Activity from "./components/Activity";
import Saves from "./components/Saves";
import Setting from "./components/Setting";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Hồ sơ",
    children: <Profile />,
  },
  {
    key: "2",
    label: "Hoạt động",
    children: <Activity />,
  },  {
    key: "3",
    label: <Link to="saves">Lưu trữ</Link>,
    children: <Saves />,
  },
  {
    key: "4",
    label: <Link to="edit">Cài đặt</Link>,
    children: <Setting />,
  },
];

const ProfilePage = () => {
  const { user } = useModel("user");

  const handleRole = (role: string) => {
    switch (role) {
      case "admin":
        return "Quản trị viên";
      case "student":
        return "Sinh viên";
      case "teacher":
        return "Giảng viên";
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <div className="flex items-center mb-2">
            <Image
              width={150}
              height={150}
              src={user.avatar}
            />
            <div className="flex justify-between items-center w-full">
              <div className="ml-4">
                <h1 className="font-bold text-3xl">{user.username}</h1>
                <h2 className="text-2xl">UDU mãi đỉnh</h2>
                <p>
                  <UserOutlined />
                  {handleRole(user.role ?? "")}
                </p>
                <div className="flex gap-4">
                  <p className="text-gray-500">
                    <ClockCircleOutlined /> Tham gia được: 100 ngày{" "}
                  </p>
                  <p className="text-gray-500">
                    <CalendarOutlined /> Ngày xem: 8 ngày{" "}
                  </p>
                </div>
              </div>
              <Link to="/profile/edit">
                <Button type="primary" className="mr-4">
                  Chỉnh sửa hồ sơ
                </Button>
              </Link>
            </div>
          </div>
          
          <Tabs defaultActiveKey="1" items={items} />
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Skeleton active />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
