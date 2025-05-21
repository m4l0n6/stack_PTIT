import React from "react";
import { Button, Select } from "antd";
import Question from "./components/Question";
import { Link } from "umi";

const QuestionPage = () => {
  const questionList = [
    {
      id: 1,
      title: "Câu hỏi 1",
      content: "Nội dung câu hỏi 1",
      tags: ["tag1", "tag2"],
      user: {
        id: 1,
        name: "Người dùng 1",
        avatar: "https://via.placeholder.com/150",
      },
      createdAt: "2023-10-01",
      voteCount: 10,
      answerCount: 5,
      viewCount: 100,
    },
    {
      id: 2,
      title: "Câu hỏi 2",
      content: "Nội dung câu hỏi 2",
      tags: ["tag3", "tag4"],
      user: {
        id: 2,
        name: "Người dùng 2",
        avatar: "https://via.placeholder.com/150",
      },
      createdAt: "2023-10-02",
      voteCount: 20,
      answerCount: 10,
      viewCount: 200,
    }
  ]
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 className="mb-2 font-bold text-3xl">Câu hỏi từ cộng đồng</h1>
        <Link to="/ask">
          <Button
            type="primary"
            onClick={() => console.log("Create new question")}
          >
            + Đặt câu hỏi
          </Button>
        </Link>
      </div>
      <div>
        <h3 className="mb-4">Số lượng câu hỏi: {questionList.length}</h3>
      </div>
      <div className="flex gap-2 mb-4">
        <div>
          <p>Sắp xếp theo</p>
          <Select
            defaultValue="Mới nhất"
            style={{ width: 200 }}
            options={[
              { value: "newest", label: "Mới nhất" },
              { value: "recent", label: "Hoạt động gần đây" },
              { value: "popular", label: "Phổ biến" },
            ]}
          />
        </div>
        <div>
          <p>Hiển thị</p>
          <Select
            defaultValue="Tất cả câu hỏi"
            style={{ width: 200 }}
            options={[
              { value: "all", label: "Tất cả câu hỏi" },
              { value: "no answer", label: "Chưa có câu trả lời" },
              { value: "answered", label: "Đã có câu trả lời" },
            ]}
          />
        </div>
      </div>
      <div>
        {questionList.map((question) => (
          <Question key={question.id} question={question} />
        ))}
      </div>
    </div>
  );
};

export default QuestionPage;
