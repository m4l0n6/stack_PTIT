import React, { useEffect, useState } from "react";
import { Button, Select, Pagination, Spin, Empty } from "antd";
import Question from "./components/Question";
import { Link } from "umi";
import { getQuestions } from "@/services/Questions";
import { Question as QuestionType } from "@/services/Questions/typing";

const QuestionPage = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sort, setSort] = useState("newest");
  const [filter, setFilter] = useState("all");
  
  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const result = await getQuestions({
        page,
        pageSize,
        sort,
        filter,
      });
      
      if (result?.success) {
        setQuestions(result.data.list);
        setTotal(result.data.total);
      } else {
        console.error("Failed to fetch questions:", result);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchQuestions();
  }, [page, pageSize, sort, filter]);
  
  const handleSortChange = (value: string) => {
    setSort(value);
    setPage(1); // Reset về trang đầu khi thay đổi điều kiện
  };
  
  const handleFilterChange = (value: string) => {
    setFilter(value);
    setPage(1); // Reset về trang đầu khi thay đổi điều kiện
  };
  
  const handlePageChange = (newPage: number, newPageSize?: number) => {
    setPage(newPage);
    if (newPageSize) {
      setPageSize(newPageSize);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 className="mb-2 font-bold text-3xl">Câu hỏi từ cộng đồng</h1>
        <Link to="/ask">
          <Button type="primary">+ Đặt câu hỏi</Button>
        </Link>
      </div>
      <div>
        <h3 className="mb-4">Số lượng câu hỏi: {total}</h3>
      </div>
      <div className="flex gap-2 mb-4">
        <div>
          <p>Sắp xếp theo</p>
          <Select
            value={sort}
            onChange={handleSortChange}
            style={{ width: 200 }}
            options={[
              { value: "newest", label: "Mới nhất" },
              { value: "popular", label: "Phổ biến" },
            ]}
          />
        </div>
        <div>
          <p>Hiển thị</p>
          <Select
            value={filter}
            onChange={handleFilterChange}
            style={{ width: 200 }}
            options={[
              { value: "all", label: "Tất cả câu hỏi" },
              { value: "no answer", label: "Chưa có câu trả lời" },
              { value: "answered", label: "Đã có câu trả lời" },
            ]}
          />
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Spin size="large" />
        </div>
      ) : questions.length > 0 ? (
        <div>
          {questions.map((question) => (
            <Question key={question.id} question={question} />
          ))}
          
          <div className="mt-4 flex justify-center">
            <Pagination
              current={page}
              pageSize={pageSize}
              total={total}
              onChange={handlePageChange}
              showSizeChanger
              showTotal={(total) => `Tổng cộng ${total} câu hỏi`}
            />
          </div>
        </div>
      ) : (
        <Empty
          description="Không tìm thấy câu hỏi nào"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
    </div>
  );
};

export default QuestionPage;
