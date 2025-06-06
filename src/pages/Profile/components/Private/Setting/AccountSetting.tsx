// src/pages/Profile/components/Setting/AccountSetting.tsx
import { Form, Input, Button, Card, message, Popconfirm } from "antd";
import { LockOutlined, } from "@ant-design/icons";
import { useModel, Link, useParams } from "umi";
import { useState } from "react";

const AccountSetting: React.FC = () => {
  const { user } = useModel("user");
  const params = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const onFinishAccountInfo = async (values: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success("Cập nhật thông tin tài khoản thành công!");
    } catch (error) {
      message.error("Có lỗi xảy ra khi cập nhật thông tin tài khoản");
    } finally {
      setLoading(false);
    }
  };

  const onFinishChangePassword = async (values: any) => {
    setPasswordLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      message.success("Đổi mật khẩu thành công!");
      passwordForm.resetFields();
    } catch (error) {
      message.error("Có lỗi xảy ra khi đổi mật khẩu");
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h1 className="ml-4 font-bold text-2xl">Cài đặt tài khoản</h1>
        </div>
      </div>

      <div className="space-y-6">
        {/* Account Information */}
        <Card title="Thông tin tài khoản">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinishAccountInfo}
            initialValues={{
              email: user?.email,
              username: user?.username,
            }}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input placeholder="Nhập email" disabled/>
            </Form.Item>

            <Form.Item
              label="Tên đăng nhập"
              name="username"
              rules={[
                { required: true, message: "Vui lòng nhập tên đăng nhập!" },
                { min: 3, message: "Tên đăng nhập phải có ít nhất 3 ký tự!" },
              ]}
            >
              <Input placeholder="Nhập tên đăng nhập" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Cập nhật thông tin
              </Button>
            </Form.Item>
          </Form>
        </Card>

        {/* Change Password */}
        <Card title="Đổi mật khẩu" extra={<LockOutlined />}>
          <Form
            form={passwordForm}
            layout="vertical"
            onFinish={onFinishChangePassword}
          >
            <Form.Item
              label="Mật khẩu hiện tại"
              name="currentPassword"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu hiện tại!" },
              ]}
            >
              <Input.Password placeholder="Nhập mật khẩu hiện tại" />
            </Form.Item>

            <Form.Item
              label="Mật khẩu mới"
              name="newPassword"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu mới!" },
                { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
              ]}
            >
              <Input.Password placeholder="Nhập mật khẩu mới" />
            </Form.Item>

            <Form.Item
              label="Xác nhận mật khẩu mới"
              name="confirmPassword"
              dependencies={["newPassword"]}
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu mới!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu xác nhận không khớp!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Xác nhận mật khẩu mới" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={passwordLoading}
              >
                Đổi mật khẩu
              </Button>
            </Form.Item>
          </Form>
        </Card>

        {/* Danger Zone */}
        <Card title="Vùng nguy hiểm" className="border-red-200">
          <div className="text-red-600">
            <p className="mb-4">
              <strong>Xóa tài khoản:</strong> Hành động này không thể hoàn tác.
              Tất cả dữ liệu của bạn sẽ bị xóa vĩnh viễn.
            </p>
            <Button danger>Xóa tài khoản</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AccountSetting;
