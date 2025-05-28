import React from "react";
import { Card, Statistic, Row, Col } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import RecentPosts from "@/pages/Admin/Questions";

const Dashboard: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={16} style={{ marginBottom: "20px" }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng số người dùng"
              value={1128}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="người"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Số bài viết"
              value={245}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ArrowUpOutlined />}
              suffix="bài"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Số bình luận"
              value={876}
              valueStyle={{ color: "#1890ff" }}
              prefix={<ArrowUpOutlined />}
              suffix="bình luận"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Số lượt xem"
              value={5000}
              valueStyle={{ color: "#faad14" }}
              prefix={<ArrowUpOutlined />}
              suffix="lượt"
            />
          </Card>
        </Col>
      </Row>
      <Card
        title="Hoạt động theo thời gian"
        style={{ height: "300px", marginBottom: "20px" }}
      >
        <div
          style={{
            height: "100%",
            backgroundColor: "#f0f0f0",
            borderRadius: "4px",
          }}
        />
      </Card>
    </div>
  );
};

export default Dashboard;
