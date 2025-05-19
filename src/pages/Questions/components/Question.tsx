import { Avatar, Card, Space, Tag, Typography, Tooltip } from "antd";
import { Link } from "umi";

const { Title, Text, Paragraph } = Typography;

const Question = () => {
    return (
      <Card
        className="mb-3 rounded-lg"
        bordered={true}
        bodyStyle={{ padding: 8 }}
        hoverable
      >
        <div className="flex">
          {/* Stats column */}
          <div className="flex flex-col items-center min-m-w-[70px] mr-4">
            <Tooltip title="Số người bình chọn">
              <div className={`vote-count positive`}>
                <span>100</span>
                <small>bình chọn</small>
              </div>
            </Tooltip>

            <Tooltip title="Số lượng câu trả lời">
              <div className={`answer-count `}>
                <span>100</span>
                <small>trả lời</small>
              </div>
            </Tooltip>

            <Tooltip title="Lượt xem">
              <div className="view-count">
                <span>100</span>
                <small>lượt xem</small>
              </div>
            </Tooltip>
          </div>

          {/* Content column */}
          <div className="flex-1">
            <Link to={`/`}>
              <Title
                level={4}
                className="mt-0 mb-2 hover:text-[#1890ff]"
                ellipsis={{ rows: 1, expandable: false }}
              >
                Câu hỏi về React
              </Title>
            </Link>

            <Paragraph className="mb-3" ellipsis={{ rows: 2 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Paragraph>

            <Space className="mb-3" size={[0, 8]} wrap>
              <Tag color="blue" className="mb-2">
                React
              </Tag>
            </Space>

            <div className="flex justify-between items-center text-sm">
              <Link to={`/`} className="hover:opacity-80">
                <Space>
                  <Avatar src={"https://example.com/avatar.jpg"} size="small" />
                  <Text type="secondary" className="hover:text-[#1890ff]">
                    Người dùng
                  </Text>
                </Space>
              </Link>
              <Text type="secondary" className="post-date">
                21/10/2023
              </Text>
            </div>
          </div>
        </div>
      </Card>
    );
}

export default Question;