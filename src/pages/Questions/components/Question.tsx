import React from "react";
import { Card, Avatar, Space, Tag, Typography, Divider } from "antd";
import { Link } from "umi";
import {
  EyeOutlined,
  MessageOutlined,
  ClockCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import { Question } from "@/services/Questions/typing";

const { Text, Title } = Typography;

interface QuestionCardProps {
  question: Question;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  return (
    <Card className="mb-4 overflow-hidden">
      <div className="flex">
        {/* Vote column */}
        <div className="flex flex-col items-center mr-4 w-16 min-w-[4rem]">
          <div className="flex flex-col items-center">
            <div className="font-semibold text-lg">
              {question.upvotes - question.downvotes}
            </div>
            <div className="text-gray-500 text-xs">votes</div>
          </div>
          <div className="flex flex-col items-center mt-2">
            <div className="font-semibold text-lg">
              {question.answer_count || 0}
            </div>
            <div className="text-gray-500 text-xs">answers</div>
          </div>
          <div className="flex flex-col items-center mt-2">
            <div className="font-semibold text-lg">{question.views}</div>
            <div className="text-gray-500 text-xs">views</div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">         
           <Title level={5} className="mb-2">
            <Link to={`/question/${question.id}`} className="hover:opacity-80">
              {question.title}
            </Link>
          </Title>

          <div className="mb-3 text-gray-500 text-sm line-clamp-2">
            {question.content.replace(/<[^>]+>/g, "").substring(0, 200)}
            {question.content.length > 200 && "..."}
          </div>          {/* Tags */}
          <Space size={[0, 8]} wrap className="mb-3">
            {question.tags?.map((tag) => (
              <Tag color="blue" key={tag.id}>
                {tag.name} {tag.count !== undefined && <span className="text-xs">({tag.count})</span>}
              </Tag>
            ))}
          </Space>

          <div className="flex justify-between items-center text-sm">
            {/* Sử dụng optional chaining và kiểm tra username */}
            <Link
              to={`/users/${question.user?.id}/${(
                question.user?.username || ""
              ).replace(/\s+/g, "-")}`}
              className="hover:opacity-80"
            >
              <Space>
                <Avatar src={question.user?.avatar} size="small" />
                <Text type="secondary" className="hover:text-[#1890ff]">
                  {question.user?.username}
                </Text>
              </Space>
            </Link>

            <Text type="secondary">
              <ClockCircleOutlined className="mr-1" />
              {question.created_at}
            </Text>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default QuestionCard;