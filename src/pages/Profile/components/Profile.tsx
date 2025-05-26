import { Image, Statistic, Row, Col, List } from "antd";
import React from "react";

const Profile: React.FC = () => {
  return (
    <div className="flex">
      <div className="mr-4 w-1/4">
        <h1 className="mb-2 text-2xl">Trạng thái</h1>
        <div className="mb-2 p-4 border rounded-lg">
          <Row gutter={16}>
            <Col span={12}>
              <Statistic title="Danh tiếng" value={100} />
            </Col>
            <Col span={12}>
              <Statistic title="Tìm kiếm" value={100} />
            </Col>
            <Col span={12}>
              <Statistic title="Câu trả lời" value={100} />
            </Col>
            <Col span={12}>
              <Statistic title="Bài đăng" value={100} />
            </Col>
          </Row>
        </div>
      </div>

      <div className="w-3/4">
        <div className="mb-4">
          <h1 className="mb-2 text-2xl">Giới thiệu về tôi</h1>
          <p className="mb-2 p-4 border rounded-lg">
            Không gì là không thể nếu bạn có đủ đam mê và quyết tâm. Hãy luôn
            học hỏi và không ngừng phát triển bản thân. Tôi tin rằng mỗi người
            đều có thể tạo ra sự khác biệt trong thế giới này.
          </p>
        </div>

        <div>
          <h1 className="mb-2 text-2xl">Bài viết</h1>
          <List>
            {Array.from({ length: 5 }, (_, index) => (
              <List.Item key={index} className="hover:bg-[#f5f5f5]">
                <div className="bg-green-500 mr-2 rounded-lg w-12 h-8 text-white text-center">
                  5
                </div>
                <List.Item.Meta
                  title={<a href="#">Bài viết {index + 1}</a>}
                  description="Mô tả ngắn về bài viết"
                />
                <div>31/08/2005</div>
              </List.Item>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
};

export default Profile;
