import React from "react";
import { Card, Space, Tag, Avatar, Typography, Button, message } from "antd";
import { Link } from "umi";
import { ArrowUpOutlined, ArrowDownOutlined, SaveOutlined  } from "@ant-design/icons";
import { Question } from "@/services/Questions/typing";

const { Text } = Typography;

interface QuestionContentProps {
  question: Question;
  handleVote: (direction: "up" | "down") => Promise<void>;
}

const QuestionContent: React.FC<QuestionContentProps> = ({
  question,
  handleVote,
}) => {
  return (
    <div className="flex">
      {/* Cột voting bên trái */}
      <div className="flex flex-col items-center mr-4 w-[50px] voting">
        <Button
          type="text"
          icon={<ArrowUpOutlined />}
          onClick={() => handleVote("up")}
          className="vote-button"
        />
        <div className="my-1 font-bold text-lg text-center vote-count">
          {question.upvotes - question.downvotes}
        </div>
        <Button
          type="text"
          icon={<ArrowDownOutlined />}
          onClick={() => handleVote("down")}
          className="vote-button"
        />
        <Button 
          type="text"
          icon={<SaveOutlined />}
          className="vote-button"
          style={{ marginTop: "10px" }}
          onClick={() => message.info("Chức năng lưu câu hỏi chưa được triển khai")}
        />

        
      </div>

      {/* Nội dung câu hỏi bên phải */}
      <div className="flex-1">
        <Card className="mb-6">
          <div className="content-wrapper">
            <div
              className="question-content"
              dangerouslySetInnerHTML={{ __html: question.content }}
            />
          </div>
          <Space className="mt-4" size={[0, 8]} wrap>
            {question.tags &&
              question.tags.map((tag) => (
                <Tag color="blue" key={tag.id}>
                  {tag.name}{" "}
                  {tag.count !== undefined && (
                    <span className="text-xs">({tag.count})</span>
                  )}
                </Tag>
              ))}
          </Space>

          <div className="flex justify-end mt-4">
            <div className="bg-blue-50 p-3 rounded-md">
              <div className="text-gray-500 text-sm">
                Đã hỏi vào {question.created_at}
              </div>
              <div className="flex items-center mt-2">
                <Avatar src={question.user?.avatar} />
                <Link
                  to={`/users/${question.user?.id}/${question.user?.username.replace(/\s+/g, "-")}`}
                >
                  <Text strong className="ml-2 hover:text-[#1890ff]">
                    {question.user?.username}
                  </Text>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default QuestionContent;
