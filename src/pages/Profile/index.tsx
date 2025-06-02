import { useModel, Link } from "umi";
import { Image, Tabs, Button, Skeleton, Tooltip } from "antd";
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

  // Hàm tính thời gian tham gia
  const calculateJoinTime = (createdDate: string): string => {
    try {
      // Xử lý định dạng ngày DD/MM/YYYY
      const parts = createdDate.split("/");
      if (parts.length !== 3) {
        return createdDate; // Trả về nguyên gốc nếu không đúng định dạng
      }

      const joinDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
      const currentDate = new Date();

      // Tính khoảng thời gian
      const diffTime = currentDate.getTime() - joinDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const diffMonths = Math.floor(diffDays / 30);
      const diffYears = Math.floor(diffMonths / 12);

      // Hiển thị thời gian tham gia phù hợp
      if (diffYears > 0) {
        return `${diffYears} năm ${diffMonths % 12} tháng`;
      } else if (diffMonths > 0) {
        return `${diffMonths} tháng ${diffDays % 30} ngày`;
      } else {
        return `${diffDays} ngày`;
      }
    } catch (error) {
      console.error("Error calculating join time:", error);
      return createdDate; // Trả về nguyên gốc nếu có lỗi
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <div className="flex items-center mb-2">
            <Image width={150} height={150} src={user.avatar} />
            <div className="flex justify-between items-center w-full">
              <div className="ml-4">
                <h1 className="font-bold text-3xl">{user.username}</h1>
                <h2 className="text-2xl">{user.email}</h2>
                <p>
                  <UserOutlined />
                  {handleRole(user.role ?? "")}
                </p>
                <div className="flex gap-4">
                  <Tooltip title={`${user.created_at}`}>
                    <p className="text-gray-500">
                      <ClockCircleOutlined /> Tham gia được:{" "}
                      {calculateJoinTime(user.created_at)}{" "}
                    </p>
                  </Tooltip>
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
