import React, { useEffect, useState } from "react";
import { useParams } from "umi";
import {
  Typography,
  Tag,
  Space,
  Button,
  Divider,
  Row,
  Col,
  Avatar,
  Input,
  message,
} from "antd";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import { Answer } from "@/services/Answer/typing";
import { Question } from "@/services/Questions/typing";

const { Title, Text, Paragraph } = Typography;

interface AnswerWithVote extends Answer {
  voteCount: number;
}

interface QuestionWithAnswers extends Question {
  answers: AnswerWithVote[];
  correctAnswerId?: number; // ID câu trả lời đúng (nếu có)
}

const mockQuestions: Record<number, QuestionWithAnswers> = {
  1: {
    id: 1,
    title: "Câu hỏi 1",
    content: "Nội dung chi tiết câu hỏi 1.",
    voteCount: 10,
    answerCount: 1,
    viewCount: 100,
    tags: ["tag1", "tag2"],
    user: { id: 1, name: "Người dùng 1", avatar: "" },
    createdAt: "2023-10-01",
    answers: [
      {
        id: 1,
        content: "Đây là câu trả lời đầu tiên.",
        voteCount: 5,
        user: { id: 3, name: "Người trả lời 1", avatar: "" },
        createdAt: "2023-10-03",
      },
    ],
  },
};

const QuestionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [question, setQuestion] = useState<QuestionWithAnswers | null>(null);
  const [voteCount, setVoteCount] = useState<number>(0);
  const [newAnswer, setNewAnswer] = useState<string>("");

  // Giả sử đây là user hiện tại đang đăng nhập
  const account = { id: 1, name: "Người dùng 1" }; // Thay bằng user thật của bạn

  useEffect(() => {
    const questionId = Number(id);
    const foundQuestion = mockQuestions[questionId] || null;
    setQuestion(foundQuestion);
    if (foundQuestion) {
      setVoteCount(foundQuestion.voteCount);
    }
  }, [id]);

  const handleVoteUp = () => {
    setVoteCount((prev) => prev + 1);
  };

  const handleVoteDown = () => {
    setVoteCount((prev) => prev - 1);
  };

  const handleVoteAnswer = (answerId: number, delta: number) => {
    if (!question) return;

    const updatedAnswers = question.answers.map((ans) =>
      ans.id === answerId ? { ...ans, voteCount: (ans.voteCount || 0) + delta } : ans
    );

    setQuestion({
      ...question,
      answers: updatedAnswers,
    });
  };

  const handleAddAnswer = () => {
    if (!newAnswer.trim()) {
      message.warning("Vui lòng nhập nội dung câu trả lời.");
      return;
    }

    const newAnswerData: AnswerWithVote = {
      id: Date.now(),
      content: newAnswer,
      voteCount: 0,
      user: {
        id: 999,
        name: "Bạn",
        avatar: "",
      },
      createdAt: new Date().toISOString().split("T")[0],
    };

    const updatedQuestion: QuestionWithAnswers = {
      ...question!,
      answers: [...question!.answers, newAnswerData],
      answerCount: question!.answerCount + 1,
    };

    setQuestion(updatedQuestion);
    setNewAnswer("");
    message.success("Đã thêm câu trả lời!");
  };

  // Xử lý đánh dấu câu trả lời đúng (chỉ chủ câu hỏi được bấm)
  const handleMarkCorrect = (answerId: number) => {
    if (!question) return;
    if (account.id !== question.user.id) {
      message.error("Chỉ người hỏi mới được đánh dấu câu trả lời đúng.");
      return;
    }
    setQuestion({
      ...question,
      correctAnswerId: answerId,
    });
    message.success("Đã đánh dấu câu trả lời đúng!");
  };

  if (!question) {
    return <div className="p-6 text-center">Không tìm thấy câu hỏi với ID: {id}!</div>;
  }

  const isQuestionOwner = account.id === question.user.id;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Title level={2}>{question.title}</Title>

      <Space className="mb-4">
        {question.tags.map((tag) => (
          <Tag color="blue" key={tag}>
            {tag}
          </Tag>
        ))}
      </Space>

      <Row gutter={16} className="mb-4">
        <Col flex="40px" className="text-center">
          <Button type="text" icon={<UpOutlined />} onClick={handleVoteUp} />
          <Text strong className="block text-lg">
            {voteCount}
          </Text>
          <Button type="text" icon={<DownOutlined />} onClick={handleVoteDown} />
          <Text type="secondary" className="block text-sm">
            Bình chọn
          </Text>
        </Col>
        <Col flex="auto">
          <Paragraph>{question.content}</Paragraph>
          <Space className="justify-between w-full">
            <Space>
              <Avatar src={question.user.avatar} size="small" />
              <Text type="secondary">Đăng bởi: {question.user.name}</Text>
            </Space>
            <Text type="secondary">Ngày đăng: {question.createdAt}</Text>
          </Space>
        </Col>
      </Row>

      <Divider />
      <Text type="secondary">
        Trả lời: {question.answerCount} | Lượt xem: {question.viewCount}
      </Text>

      <Divider />
      <Title level={4}>Câu trả lời</Title>

      {question.answers.length > 0 ? (
        question.answers.map((answer) => {
          const isCorrect = question.correctAnswerId === answer.id;

          return (
            <Row
              key={answer.id}
              gutter={16}
              className={`mb-4 p-4 border rounded-lg shadow-sm ${
                isCorrect ? "bg-green-50 border-green-400" : "bg-white"
              }`}
            >
              <Col flex="40px" className="text-center">
                <Button
                  type="text"
                  icon={<UpOutlined />}
                  onClick={() => handleVoteAnswer(answer.id, 1)}
                />
                <Text strong className="block">{answer.voteCount}</Text>
                <Button
                  type="text"
                  icon={<DownOutlined />}
                  onClick={() => handleVoteAnswer(answer.id, -1)}
                />
              </Col>

              <Col flex="auto">
                <Paragraph>{answer.content}</Paragraph>
                <Space className="justify-between w-full">
                  <Space>
                    <Avatar src={answer.user.avatar} size="small" />
                    <Text type="secondary">
                      {answer.user.name} • {answer.createdAt}
                    </Text>
                  </Space>

                  {isCorrect && (
                    <Tag color="green" style={{ fontWeight: "bold" }}>
                      ✔ Đáp án đúng
                    </Tag>
                  )}

                  {!isCorrect && isQuestionOwner && (
                    <Button
                      size="small"
                      type="link"
                      onClick={() => handleMarkCorrect(answer.id)}
                    >
                      Đánh dấu là đúng
                    </Button>
                  )}

                  {!isCorrect && !isQuestionOwner && (
                    <Button size="small" type="link" disabled>
                      Đánh dấu là đúng
                    </Button>
                  )}
                </Space>
              </Col>
            </Row>
          );
        })
      ) : (
        <Text type="secondary">Chưa có câu trả lời nào.</Text>
      )}

      <Divider />
      <Title level={5}>Trả lời câu hỏi</Title>

      <Row gutter={16}>
        <Col span={24}>
          <Input.TextArea
            rows={6}
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="Nhập câu trả lời của bạn..."
            style={{ borderRadius: 8, padding: 12 }}
          />
        </Col>
      </Row>

      <Row justify="end" className="mt-4">
        <Button
          type="primary"
          size="large"
          onClick={handleAddAnswer}
          style={{ borderRadius: 6, padding: "0 24px" }}
        >
          Gửi câu trả lời
        </Button>
      </Row>
    </div>
  );
};

export default QuestionDetail;
