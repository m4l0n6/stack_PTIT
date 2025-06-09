import React from "react";
import { Card, Tag, Avatar, Typography, Space, Tooltip } from "antd";
import { Link } from "umi";
import { CheckCircleFilled, LockOutlined } from "@ant-design/icons";
import { Question } from "@/services/Questions/typing";

const { Title, Text } = Typography;

interface QuestionCardProps {
  question: Question;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  // Xác định trạng thái của câu hỏi
  const isClosed = question.status === "closed";

  // Hàm giải mã các ký tự HTML entities
  function decodeHtmlEntities(str: string) {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
  }

  // Xử lý render tag cho cả string và object
  const renderTags = () => {
    if (!question.tags || question.tags.length === 0) return null;

    return question.tags.map((tag, index) => {
      // Nếu tag là string (tag mới tạo)
      if (typeof tag === "string") {
        return isClosed ? (
          <Tag
            color="default"
            key={`new-tag-${index}`}
            className="cursor-not-allowed"
          >
            {tag}
          </Tag>
        ) : (
          <Link to={`/questions/tagged/${tag}`} key={`new-tag-${index}`}>
            <Tag color="blue">{tag}</Tag>
          </Link>
        );
      }
      // Nếu tag là object (tag có sẵn)
      else if (typeof tag === "object" && tag !== null) {
        return isClosed ? (
          <Tag
            color="default"
            key={tag.id || `tag-${index}`}
            className="cursor-not-allowed"
          >
            {tag.name}
          </Tag>
        ) : (
          <Link
            to={`/questions/tagged/${tag.name}`}
            key={tag.id || `tag-${index}`}
          >
            <Tag color="blue">{tag.name}</Tag>
          </Link>
        );
      }
      return null;
    });
  };

  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-sm mb-4 flex relative
      ${isClosed ? "opacity-40" : ""}`}
    >
      {/* Badge trạng thái closed nếu câu hỏi đã đóng */}
      {isClosed && (
        <div className="top-2 right-2 absolute flex items-center bg-gray-500 px-2 py-1 rounded-md text-white text-xs">
          <LockOutlined className="mr-1" />
          Đã đóng
        </div>
      )}

      {/* Stats column */}
      <div className="flex flex-col items-center mr-4 w-16 min-w-[4rem]">
        <div className="flex flex-col items-center">
          <div className="font-semibold text-lg">
            {question.upvotes - question.downvotes}
          </div>
          <div className="text-gray-500 text-xs">bình chọn</div>
        </div>

        <div
          className={`flex flex-col items-center mt-2 rounded-lg
          ${
            question.has_accepted_answer
              ? "bg-green-100 border-[1px] border-green-500 p-1"
              : (question.answer_count ?? 0) > 0
                ? "border-[1px] border-green-300 p-1"
                : "border-none"
          }`}
        >
          <div className="flex items-center">
            {question.has_accepted_answer ? (
              <Tooltip title="Câu hỏi này đã có câu trả lời được chấp nhận">
                <CheckCircleFilled className="mr-1 text-green-500" />
              </Tooltip>
            ) : null}
            <p className="text-lg">{question.answer_count || 0}</p>
          </div>
          <div className="text-black text-xs">câu trả lời</div>
        </div>

        <div className="flex flex-col items-center mt-2">
          <div className="font-semibold text-lg">{question.views}</div>
          <div className="text-gray-500 text-xs">lượt xem</div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <Title level={5} className="mb-2">
          {isClosed ? (
            <Text className="text-gray-600 cursor-not-allowed">
              {question.title}
            </Text>
          ) : (
            <Link
              to={`/question/${question.id}`}
              className={`hover:opacity-80 ${isClosed ? "text-gray-600" : ""}`}
            >
              {question.title}
            </Link>
          )}
        </Title>

        <div className="mb-3 h-10 text-gray-500 text-sm line-clamp-2">
          {decodeHtmlEntities(
            question.content.replace(/<[^>]+>/g, "")
          ).substring(0, 200)}
          {question.content.length > 200 && "..."}
        </div>

        {/* Tags */}
        <Space size={[0, 8]} wrap className="mb-3">
          {renderTags()}
        </Space>

        <div className="flex justify-between items-center mb-2 text-sm">
          {isClosed ? (
            <span className="text-gray-600 cursor-not-allowed">
              {question.user?.username}
            </span>
          ) : (
            <Link
              to={`/users/${question.user?.id}/${question.user?.username?.replace(
                /\s+/g,
                "-"
              )}`}
              className="hover:text-blue-500"
            >
              <Avatar
                src={question.user?.avatar}
                size="small"
                className="mr-1"
              />
              <span>{question.user?.username}</span>
            </Link>
          )}

          <div className="text-gray-500">Đăng vào {question.created_at}</div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
