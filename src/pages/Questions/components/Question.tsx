import { Avatar, Card, Space, Tag, Typography, Tooltip } from "antd";
import { Link } from "umi";
import React from "react";

const { Title, Text, Paragraph } = Typography;

interface QuestionProps {
  question: {
    id: number;
    title: string;
    content: string;
    tags: string[];
    user: {
      id: number;
      name: string;
      avatar: string;
    };
    createdAt: string;
    voteCount: number;
    answerCount: number;
    viewCount: number;
  };
}

const Question: React.FC<QuestionProps> = ({ question }) => {
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
              <span>{question.voteCount}</span>
              <small>bình chọn</small>
            </div>
          </Tooltip>

          <Tooltip title="Số lượng câu trả lời">
            <div className={`answer-count`}>
              <span>{question.answerCount}</span>
              <small>trả lời</small>
            </div>
          </Tooltip>

          <Tooltip title="Lượt xem">
            <div className="view-count">
              <span>{question.viewCount}</span>
              <small>lượt xem</small>
            </div>
          </Tooltip>
        </div>

        {/* Content column */}
        <div className="flex-1">
          <Link to={`/questions/${question.id}`}>
            <Title
              level={4}
              className="mt-0 mb-2 hover:text-[#1890ff]"
              ellipsis={{ rows: 1, expandable: false }}
            >
              {question.title}
            </Title>
          </Link>

          <Paragraph className="mb-3" ellipsis={{ rows: 2 }}>
            {question.content}
          </Paragraph>

          <Space className="mb-3" size={[0, 8]} wrap>
            {question.tags.map((tag) => (
              <Tag color="blue" className="mb-2" key={tag}>
                {tag}
              </Tag>
            ))}
          </Space>

          <div className="flex justify-between items-center text-sm">
            <Link to={`/users/${question.user.id}`} className="hover:opacity-80">
              <Space>
                <Avatar src={question.user.avatar} size="small" />
                <Text type="secondary" className="hover:text-[#1890ff]">
                  {question.user.name}
                </Text>
              </Space>
            </Link>
            <Text type="secondary" className="post-date">
              {question.createdAt}
            </Text>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Question;