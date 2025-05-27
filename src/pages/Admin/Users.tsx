import React, { useState } from "react";
import { Table, Avatar, Button, Typography, Space, Card, Modal } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface User {
  id: number;
  name: string;
  avatar: string;
  email: string;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    avatar: "https://i.pravatar.cc/150?img=1",
    email: "nguyenvana@example.com",
  },
  {
    id: 2,
    name: "Trần Thị B",
    avatar: "https://i.pravatar.cc/150?img=2",
    email: "tranthib@example.com",
  },
  {
    id: 3,
    name: "Lê Văn C",
    avatar: "https://i.pravatar.cc/150?img=3",
    email: "levanc@example.com",
  },
];

const UserList: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (user: User) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 60,
    },
    {
      title: "Tên người dùng",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <a style={{ color: "#1677ff" }}>{text}</a>,
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (url: string) => <Avatar size={40} src={url} />,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: User) => (
        <Space>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            size="small"
            onClick={() => openModal(record)}
          >
            Xem
          </Button>
          <Button icon={<EditOutlined />} size="small">
            Sửa
          </Button>
          <Button danger icon={<DeleteOutlined />} size="small">
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Card
        style={{
          margin: "20px",
          borderRadius: 12,
          boxShadow: "0 2px 8px #f0f1f2",
        }}
      >
        <div
          style={{
            backgroundColor: "#f0f5ff",
            padding: "12px 20px",
            borderRadius: "8px",
            marginBottom: 20,
          }}
        >
          <Title level={4} style={{ margin: 0, color: "#1d39c4" }}>
            Danh sách người dùng
          </Title>
        </div>
        <Table
          dataSource={mockUsers}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          bordered={false}
          style={{ backgroundColor: "white" }}
        />
      </Card>

      {/* Modal chi tiết người dùng */}
      <Modal
        open={modalVisible}
        onCancel={closeModal}
        footer={null}
        width={600}
        style={{ top: 20 }}
        bodyStyle={{
          background:
            "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          padding: 0,
          borderRadius: 12,
        }}
        centered
      >
        {selectedUser && (
          <>
            <div
              style={{
                background:
                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                padding: "20px 40px",
                borderRadius: "12px 12px 0 0",
                display: "flex",
                alignItems: "center",
                gap: 12,
                fontWeight: "bold",
                fontSize: 20,
                justifyContent: "center",
              }}
            >
              <Avatar src={selectedUser.avatar} size={32} />
              Thông tin người dùng
            </div>

            <div
              style={{
                margin: 24,
                backgroundColor: "white",
                borderRadius: 12,
                padding: 24,
                boxShadow: "0 0 10px rgb(102 126 234 / 0.4)",
                textAlign: "center",
              }}
            >
              <Avatar
                src={selectedUser.avatar}
                size={120}
                style={{
                  border: "6px solid #667eea",
                  boxShadow: "0 0 8px #667eea",
                  marginBottom: 16,
                }}
              />

              <Title level={3} style={{ color: "#1d39c4" }}>
                {selectedUser.name}
              </Title>

              <Text
                type="secondary"
                style={{ fontSize: 16, marginBottom: 8, display: "block" }}
              >
                Email: {selectedUser.email}
              </Text>

              <Text
                type="secondary"
                style={{ fontSize: 16, marginBottom: 8, display: "block" }}
              >
                ID: {selectedUser.id}
              </Text>

              <Button type="primary" onClick={closeModal} style={{ marginTop: 20 }}>
                Đóng
              </Button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default UserList;
