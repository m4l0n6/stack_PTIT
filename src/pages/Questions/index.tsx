import React from "react";
import { Button } from "antd";
import Question from "./components/Question";

const QuestionPage = () => {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 className="mb-2 font-bold text-3xl">Câu hỏi từ cộng đồng</h1>
        <Button
          type="primary"
          onClick={() => console.log("Create new question")}
        >
          + Đặt câu hỏi
        </Button>
      </div>
      <div>
        <h3>Số lượng câu hỏi: 100000</h3>
      </div>
      <div>
        <Question />
        <Question />
        <Question />
      </div>
    </div>
  );
};

export default QuestionPage;
