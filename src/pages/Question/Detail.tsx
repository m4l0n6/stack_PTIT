import React, { useEffect, useState, useRef } from 'react';
import { useParams, useModel, history, Link } from 'umi';
import { 
  Typography, 
  Button, 
  Spin, 
} from 'antd';

import QuestionHeader from './components/Detail/QuestionHeader';
import QuestionContent from './components/Detail/QuestionContent';
import AnswerList from './components/Detail/AnswerList';
import AnswerForm from './components/Detail/AnswerForm';

const { Title } = Typography;

const QuestionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useModel("user");
  const {
    question,
    loading,
    isSubmittingAnswer,
    commentForms,
    submittingComments,
    fetchQuestionDetail,
    handleVote,
    handleVoteAnswer,
    handleAcceptAnswer,
    handleSubmitAnswer,
    toggleCommentForm,
    handleSubmitComment,
    getSortedAnswers,
  } = useModel("Question.questiondetail");

  const editorRef = useRef<any>(null);
  const questionId = parseInt(id!, 10);

  // Fetch question detail on mount or when ID changes
  useEffect(() => {
    if (id) {
      fetchQuestionDetail(questionId);
    }
  }, [id, fetchQuestionDetail]);

  // Hàm wrapper để phù hợp với interface
  const onVoteQuestion = (direction: "up" | "down") => {
    return handleVote(questionId, direction, user);
  };

  const onVoteAnswer = (answerId: number, direction: "up" | "down") => {
    return handleVoteAnswer(questionId, answerId, direction, user);
  };

  const onAcceptAnswer = (answerId: number) => {
    return handleAcceptAnswer(questionId, answerId, user);
  };

  const onSubmitComment = (answerId: number, values: any) => {
    return handleSubmitComment(questionId, answerId, values.content, user);
  };

  const onSubmitAnswer = async () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      const success = await handleSubmitAnswer(questionId, content, user);
      if (success) {
        editorRef.current.setContent("");
      }
    }
  };

  // Hiển thị loading spin khi đang tải
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spin size="large" />
      </div>
    );
  }

  // Hiển thị thông báo nếu không tìm thấy câu hỏi
  if (!question) {
    return (
      <div className="py-20 text-center">
        <Title level={3}>Không tìm thấy câu hỏi này</Title>
        <Button type="primary" onClick={() => history.push("/questions")}>
          Quay lại danh sách câu hỏi
        </Button>
      </div>
    );
  }

  const sortedAnswers = getSortedAnswers();
  return (
    <div className="question-detail">
      {/* Tiêu đề và thông tin câu hỏi */}
      <QuestionHeader question={question} />

      {/* Nội dung câu hỏi */}
      <QuestionContent question={question} handleVote={onVoteQuestion} />

      {/* Câu trả lời */}
      <AnswerList
        answers={sortedAnswers}
        questionId={questionId}
        questionUserId={question.user?.id}
        currentUserId={user?.id}
        answerCount={question.answer_count || 0}
        handleVoteAnswer={onVoteAnswer}
        handleAcceptAnswer={onAcceptAnswer}
        toggleCommentForm={toggleCommentForm}
        handleSubmitComment={onSubmitComment}
        commentForms={commentForms}
        submittingComments={submittingComments}
      />

      {/* Form thêm câu trả lời */}
      <AnswerForm
        isAuthenticated={!!user}
        isSubmitting={isSubmittingAnswer}
        handleSubmit={onSubmitAnswer}
        onEditorInit={(editor) => {
          editorRef.current = editor;
        }}
      />
    </div>
  );
};

export default QuestionDetail;