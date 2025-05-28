import React, { useState } from "react";
import { Card, Divider, Space, Input, Switch, Button, Modal } from "antd";
import { useModel } from "umi";

const AccountSetting: React.FC = () => {
    const { user } = useModel('user');
    const [ visible, setVisible ] = useState(false);
    return (
      <>
        <h1 className="mb-4 font-bold text-2xl">Chỉnh sửa tài khoản</h1>
        <Divider />
        <Card title="Thông tin tài khoản" className="mb-4">
          <Space direction="vertical" className="w-full">
            <div>
              <h1 className="mb-2 font-bold">Email</h1>
              <Input placeholder={`${user.email}`} className="w-1/2" disabled />
            </div>
            <div>
              <h1 className="mb-2 font-bold">Mật khẩu hiện tại</h1>
              <Input.Password
                placeholder="Nhập mật khẩu mới"
                className="w-1/2"
              />
            </div>
            <div>
              <h1 className="mb-2 font-bold">Mật khẩu mới</h1>
              <Input.Password
                placeholder="Nhập mật khẩu mới"
                className="w-1/2"
              />
            </div>
            <div>
              <h1 className="mb-2 font-bold">Nhập lại mật khẩu</h1>
              <Input.Password
                placeholder="Nhập mật khẩu mới"
                className="w-1/2"
              />
            </div>
            <Button type="primary" className="w-1/6">
              Lưu thay đổi
            </Button>
          </Space>
        </Card>
        <Card title="Xóa tài khoản" className="mb-4">
          <Space direction="vertical" className="w-full">
            <p>
              Việc xóa tài khoản sẽ xóa tất cả dữ liệu liên quan đến tài khoản
              của bạn. Hãy chắc chắn rằng bạn đã sao lưu dữ liệu quan trọng
              trước khi thực hiện hành động này.
            </p>
            <Button
              type="primary"
              danger
              className="w-1/6"
              onClick={() => setVisible(true)}
            >
              Xóa tài khoản
            </Button>
            <Modal
              title="Xác nhận xóa tài khoản"
              visible={visible}
              footer={[
                <Button key="cancel" onClick={() => setVisible(false)}>
                  Hủy
                </Button>,
                <Button
                  key="confirm"
                  type="primary"
                  danger
                  onClick={() => {
                    // Handle account deletion logic here
                    setVisible(false);
                  }}
                >
                  Xóa tài khoản
                </Button>,
              ]}
              onCancel={() => setVisible(false)}
            >
              <p>
                Bạn có chắc chắn muốn xóa tài khoản của mình không? Hành động
                này không thể hoàn tác.
              </p>
              <h1>Nhập tên tài khoản để xác nhận</h1>
              <Input
                placeholder=""
                className="w-1/2"
                onChange={(e) => {
                  // Handle input change logic here
                }}
              />
            </Modal>
          </Space>
        </Card>
        <Card title="Đăng xuất" className="mb-4">
          <Space direction="vertical" className="w-full">
            <p>
              Bạn có chắc chắn muốn đăng xuất khỏi tài khoản của mình không?
            </p>
            <Button
              type="primary"
              danger
              className="w-1/6"
              onClick={() => {
                // Handle logout logic here
              }}
            >
              Đăng xuất
            </Button>
          </Space>
        </Card>
      </>
    );
}

export default AccountSetting;