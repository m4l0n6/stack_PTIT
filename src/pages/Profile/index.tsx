// src/pages/Profile/PublicProfile.tsx
import { useParams, useSearchParams, useModel, Link, history } from "umi";
import { Image, Tabs, Button, Skeleton, Tooltip, message } from "antd";
import {
  UserOutlined,
  ClockCircleOutlined,
  EditOutlined,
  SaveOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { TabsProps } from "antd";
import { useEffect, useState } from "react";
import { getUserById } from "@/services/Users";
import { User } from "@/services/Users/typing";
import Profile from "./components/Public/Profile";
import Activity from "./components/Public/Activity";
import Saves from "./components/Private/Saves";
import Setting from "./components/Private/Setting";

const PublicProfile = () => {
  const params = useParams<{ id: string; name: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user: currentUser } = useModel("user");
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const activeTab = searchParams.get("tab") || "profile";
  const isOwnProfile = currentUser && currentUser.id.toString() === params.id;

  useEffect(() => {
    const fetchUser = async () => {
      if (!params.id) return;

      setLoading(true);
      try {
        const response = await getUserById(isOwnProfile ? 'me' : params.id);
        if (
          response &&
          typeof response === 'object' &&
          'id' in response &&
          'username' in response &&
          'email' in response &&
          'created_at' in response &&
          'reputation' in response &&
          'role' in response
        ) {
          setProfileUser(response as User);
        } else if (response && 'data' in response && response.data && response.data.id) {
          setProfileUser(response.data);
        } else {
          message.error("Không thể tải thông tin người dùng");
        }
      } catch (error) {
        message.error("Có lỗi xảy ra khi tải thông tin người dùng");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [params.id]);

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

  const calculateJoinTime = (createdDate: string): string => {
    try {
      const parts = createdDate.split("/");
      if (parts.length !== 3) {
        return createdDate;
      }

      const joinDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
      const currentDate = new Date();

      const diffTime = currentDate.getTime() - joinDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const diffMonths = Math.floor(diffDays / 30);
      const diffYears = Math.floor(diffMonths / 12);

      if (diffYears > 0) {
        const months = diffMonths % 12;
        return `${diffYears} năm${months > 0 ? ` ${months} tháng` : ""}`;
      } else if (diffMonths > 0) {
        const days = diffDays % 30;
        return `${diffMonths} tháng${days > 0 ? ` ${days} ngày` : ""}`;
      } else {
        return `${diffDays} ngày`;
      }
    } catch (error) {
      console.error("Error calculating join time:", error);
      return createdDate;
    }
  };

  const handleTabChange = (key: string) => {
    // Xử lý tất cả các tab trong cùng trang
    setSearchParams({ tab: key });
  }; 

   // Tạo items cho tabs với điều kiện hiển thị
  const items: TabsProps["items"] = [
    {
      key: "profile",
      label: "Hồ sơ",
      children: <Profile user={profileUser} />,
    },
    {
      key: "activity",
      label: "Hoạt động",
      children: <Activity />,
    },
  ];
  // Chỉ thêm các tab private nếu là profile của chính user
  if (isOwnProfile) {
    items.push(
      {
        key: "saves",
        label: (
          <span className="flex items-center">
            Lưu trữ
          </span>
        ),
        children: <Saves />,
      },
      {
        key: "settings",
        label: (
          <span className="flex items-center">
            Cài đặt
          </span>
        ),
        children: <Setting />,
      }
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Skeleton active />
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2>Không tìm thấy người dùng</h2>
          <Link to="/">
            <Button type="primary">Về trang chủ</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <Image width={150} height={150} src={profileUser.avatar || 'https://placehold.co/150?text=Avatar'} />
        <div className="flex justify-between items-center w-full">
          <div className="ml-4">
            <h1 className="font-bold text-3xl">{profileUser.username}</h1>
            <h2 className="text-gray-600 text-2xl">{profileUser.email}</h2>
            <h3 className="text-gray-500 text-xl">{profileUser.title || ''}</h3>
            <p className="mt-2 text-lg">
              <UserOutlined className="mr-2" />
              {handleRole(profileUser.role ?? "")}
            </p>
            <div className="flex gap-4 mt-2">
              <Tooltip title={`Tham gia vào: ${profileUser.created_at}`}>
                <p className="text-gray-500">
                  <ClockCircleOutlined className="mr-1" />
                  Tham gia được: {calculateJoinTime(profileUser.created_at)}
                </p>
              </Tooltip>
            </div>
            <div className="mt-2 text-primary">
              {profileUser.bio || "Chưa có thông tin giới thiệu"}
            </div>
          </div>

          {/* Chỉ hiển thị nút chỉnh sửa nếu là profile của chính user */}
          {isOwnProfile && (
            <Link to={`/user/settings/${params.id}/profile`}>
              <Button type="primary" icon={<EditOutlined />} className="mr-4">
                Chỉnh sửa hồ sơ
              </Button>
            </Link>
          )}
        </div>
      </div>

      <Tabs activeKey={activeTab} onChange={handleTabChange} items={items} />
    </div>
  );
};

export default PublicProfile;
