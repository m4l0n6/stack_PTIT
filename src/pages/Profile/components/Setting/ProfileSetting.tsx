import React from "react";
import { Card, Divider, Space, Upload, Input, Select, Row, Col, Button } from "antd";
import { Editor } from "@tinymce/tinymce-react";

const ProfileSetting: React.FC = () => {
    return (
      <>
        <h1 className="mb-4 font-bold text-2xl">Chỉnh sửa hồ sơ</h1>
        <Divider />
        <Card title="Thông tin cá nhân" className="mb-4">
          <Space direction="vertical" className="w-full">
            <div>
              <h1 className="mb-2 font-bold">Ảnh đại diện</h1>
              <Upload
                name="avatar"
                listType="picture-card"
                showUploadList={false}
                action="/upload.do"
              >
                <div style={{ marginTop: 8 }}>Tải lên</div>
              </Upload>
            </div>

            <div>
              <h1 className="mb-2 font-bold">Tên hiển thị</h1>
              <Input
                placeholder="Nhập tên hiển thị của bạn"
                className="w-1/2"
              />
            </div>

            <div>
              <h1 className="mb-2 font-bold">Tiêu đề</h1>
              <Input className="w-1/2" />
            </div>

            <div>
              <h1 className="mb-2 font-bold">Vai trò</h1>
              <Select defaultValue="student" className="w-1/2">
                <Select.Option value="teacher">Giảng viên</Select.Option>
                <Select.Option value="student">Sinh viên</Select.Option>
              </Select>
            </div>

            <div>
              <h1 className="mb-2 font-bold">Giới thiệu bản thân</h1>
              <Editor
                apiKey="0owk7bayafnj8xzh9yrst8npn8gc52f6wlir3wl2hjgu2h46"
                init={{
                  height: 200,
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  toolbar:
                    "formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help",
                }}
                className="w-full"
              />
            </div>
          </Space>
        </Card>

        <Card title="Liên kết" className="mb-4">
          <Row gutter={16}>
            <Col span={12}>
              <h1 className="mb-2 font-bold">GitHub</h1>
              <Input placeholder="Nhập liên kết GitHub" />
            </Col>
            <Col span={12}>
              <h1 className="mb-2 font-bold">Facebook</h1>
              <Input placeholder="Nhập liên kết Facebook" />
            </Col>
          </Row>
        </Card>

        <div className="flex justify-center">
          <Button type="primary">Lưu chính sửa</Button>
          <Button className="ml-2" type="default">
            Hủy
          </Button>
        </div>
      </>
    );
}

export default ProfileSetting;