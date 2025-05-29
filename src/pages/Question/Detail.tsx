import React, { useEffect, useState, useRef } from 'react';
import { useParams, useModel, history, Link } from 'umi';
import { 
  getQuestionDetail, 
  voteQuestion, 
  voteAnswer, 
  acceptAnswer, 
  createAnswer,
  createComment
} from '@/services/Questions';
import { Question } from '@/services/Questions/typing';
import { Comment } from '@/services/Comments/typing';
import { Answer } from '@/services/Answers/typing';
import TinyEditor from '@/components/TinyEditor';
import { 
  Card, 
  Typography, 
  Space, 
  Tag, 
  Avatar, 
  Button, 
  Divider, 
  Spin, 
  message,
  Tooltip,
  Form,
  Input,
  List
} from 'antd';
import { 
  ArrowUpOutlined, 
  ArrowDownOutlined,
  EyeOutlined,
  MessageOutlined,
  ClockCircleOutlined,
  CheckCircleFilled,
  CommentOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const QuestionDetail: React.FC = () => {
  const {id} = useParams<{id: string}>();
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useModel('user');
  const [answerForm] = Form.useForm();
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);
  const [commentForms, setCommentForms] = useState<{[key: number]: boolean}>({});
  const [submittingComments, setSubmittingComments] = useState<{[key: number]: boolean}>({});
  const editorRef = useRef<any>(null);

  const fetchQuestionDetail = async () => {
    try {
      const result = await getQuestionDetail(parseInt(id!, 10));
      if (result?.success) {
        setQuestion(result.data);
      } else {
        message.error('Không thể tải thông tin câu hỏi');
      }
    } catch (error) {
      console.error('Error fetching question details:', error);
      message.error('Đã xảy ra lỗi khi tải thông tin câu hỏi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestionDetail();
  }, [id]);

  const handleVote = async (direction: 'up' | 'down') => {
    if (!user) {
      message.warning('Vui lòng đăng nhập để bình chọn');
      return;
    }

    try {
      const result = await voteQuestion(parseInt(id!, 10), direction);
      if (result?.success) {
        setQuestion(result.data);
        message.success(
          direction === 'up' 
            ? 'Đã bình chọn tích cực cho câu hỏi' 
            : 'Đã bình chọn tiêu cực cho câu hỏi'
        );
      }
    } catch (error) {
      console.error('Error voting question:', error);
      message.error('Không thể bình chọn. Vui lòng thử lại sau');
    }
  };

  const handleVoteAnswer = async (answerId: number, direction: 'up' | 'down') => {
    if (!user) {
      message.warning('Vui lòng đăng nhập để bình chọn');
      return;
    }

    try {
      const result = await voteAnswer(parseInt(id!, 10), answerId, direction);
      if (result?.success) {
        // Cập nhật câu trả lời trong state
        if (question && question.answers) {
          const updatedAnswers = question.answers.map((a: Answer) => 
            a.id === answerId ? result.data : a
          );
          setQuestion({...question, answers: updatedAnswers});
        }
        
        message.success(
          direction === 'up' 
            ? 'Đã bình chọn tích cực cho câu trả lời' 
            : 'Đã bình chọn tiêu cực cho câu trả lời'
        );
      }
    } catch (error) {
      console.error('Error voting answer:', error);
      message.error('Không thể bình chọn. Vui lòng thử lại sau');
    }
  };

  const handleAcceptAnswer = async (answerId: number) => {
    if (!user) {
      message.warning('Vui lòng đăng nhập để chấp nhận câu trả lời');
      return;
    }

    try {
      const result = await acceptAnswer(parseInt(id!, 10), answerId);
      if (result?.success) {
        // Cập nhật tất cả câu trả lời trong state
        if (question && question.answers) {
          const updatedAnswers = question.answers.map((a: Answer) => {
            if (a.id === answerId) {
              return {...a, is_accepted: true};
            }
            return {...a, is_accepted: false};
          });
          setQuestion({...question, answers: updatedAnswers});
        }
        
        message.success('Đã chấp nhận câu trả lời');
      }
    } catch (error) {
      console.error('Error accepting answer:', error);
      message.error('Không thể chấp nhận câu trả lời. Vui lòng thử lại sau');
    }
  };

  const handleSubmitAnswer = async () => {
    if (!user) {
      message.warning('Vui lòng đăng nhập để trả lời');
      history.push('/auth/login');
      return;
    }

    if (editorRef.current) {
      const content = editorRef.current.getContent();
      
      if (!content || content.length < 30) {
        message.error('Câu trả lời phải có ít nhất 30 ký tự');
        return;
      }
      
      setIsSubmittingAnswer(true);
      try {
        const result = await createAnswer(parseInt(id!, 10), content);
        if (result?.success) {
          message.success('Đã thêm câu trả lời thành công');
          // Cập nhật state với câu trả lời mới
          if (question) {
            const newAnswers = question.answers ? [...question.answers, result.data] : [result.data];
            setQuestion({
              ...question, 
              answers: newAnswers,
              answer_count: (question.answer_count || 0) + 1
            });
          }
          // Reset editor
          editorRef.current.setContent('');
        } else {
          message.error('Không thể thêm câu trả lời');
        }
      } catch (error) {
        console.error('Error creating answer:', error);
        message.error('Đã xảy ra lỗi khi thêm câu trả lời');
      } finally {
        setIsSubmittingAnswer(false);
      }
    }
  };

  const toggleCommentForm = (answerId: number) => {
    setCommentForms(prev => ({
      ...prev,
      [answerId]: !prev[answerId]
    }));
  };

  const handleSubmitComment = async (answerId: number, values: any) => {
    if (!user) {
      message.warning('Vui lòng đăng nhập để bình luận');
      history.push('auth/login');
      return;
    }

    setSubmittingComments(prev => ({...prev, [answerId]: true}));
    try {
      const result = await createComment(parseInt(id!, 10), answerId, values.content);
      if (result?.success) {
        message.success('Đã thêm bình luận thành công');
        
        // Cập nhật state với bình luận mới
        if (question && question.answers) {
          const updatedAnswers = question.answers.map(a => {
            if (a.id === answerId) {
              const comments = a.comments ? [...a.comments, result.data] : [result.data];
              return {
                ...a, 
                comments,
                comment_count: (a.comment_count || 0) + 1
              };
            }
            return a;
          });
          setQuestion({...question, answers: updatedAnswers});
        }
        
        // Reset form và đóng form
        setCommentForms(prev => ({...prev, [answerId]: false}));
      } else {
        message.error('Không thể thêm bình luận');
      }
    } catch (error) {
      console.error('Error creating comment:', error);
      message.error('Đã xảy ra lỗi khi thêm bình luận');
    } finally {
      setSubmittingComments(prev => ({...prev, [answerId]: false}));
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
        <Button type="primary" onClick={() => history.push('/questions')}>
          Quay lại danh sách câu hỏi
        </Button>
      </div>
    );
  }

  // Sắp xếp câu trả lời để hiển thị câu được chấp nhận đầu tiên
  const sortedAnswers = question.answers ? 
    [...question.answers].sort((a, b) => {
      if (a.is_accepted) return -1;
      if (b.is_accepted) return 1;
      return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
    }) : [];

  return (
    <div className="question-detail">
      {/* Tiêu đề và thông tin câu hỏi */}
      <div className="mb-6">
        <Title level={2}>{question.title}</Title>
        <div className="flex items-center mb-4 text-gray-500 text-sm">
          <div className="flex items-center mr-4">
            <EyeOutlined className="mr-1" />
            {question.views} lượt xem
          </div>
          <div className="flex items-center mr-4">
            <MessageOutlined className="mr-1" />
            {question.answer_count} trả lời
          </div>
          <div className="flex items-center">
            <ClockCircleOutlined className="mr-1" />
            {question.created_at}
          </div>
        </div>
      </div>

      {/* Nội dung câu hỏi */}
      <div className="flex">
        {/* Cột voting bên trái */}
        <div className="flex flex-col items-center mr-4 w-[50px] voting">
          <Tooltip title="Bình chọn tích cực">
            <Button
              type="text"
              icon={<ArrowUpOutlined />}
              onClick={() => handleVote("up")}
              className="vote-button"
            />
          </Tooltip>
          <div className="my-1 font-bold text-lg text-center vote-count">
            {question.upvotes - question.downvotes}
          </div>
          <Tooltip title="Bình chọn tiêu cực">
            <Button
              type="text"
              icon={<ArrowDownOutlined />}
              onClick={() => handleVote("down")}
              className="vote-button"
            />
          </Tooltip>
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

          {/* Phần câu trả lời */}
          <div className="mt-8 answers">
            <Title level={4}>{question.answer_count} Câu trả lời</Title>

            {sortedAnswers.length > 0 ? (
              <div className="answer-list">
                {sortedAnswers.map((answer) => (
                  <Card key={answer.id} className="mb-4 answer-card">
                    <div className="flex">
                      {/* Voting column */}
                      <div className="flex flex-col items-center mr-4 w-[50px] voting">
                        <Tooltip title="Bình chọn tích cực">
                          <Button
                            type="text"
                            icon={<ArrowUpOutlined />}
                            onClick={() => handleVoteAnswer(answer.id, "up")}
                            className="vote-button"
                          />
                        </Tooltip>
                        <div className="my-1 font-bold text-lg text-center vote-count">
                          {answer.upvotes - answer.downvotes}
                        </div>
                        <Tooltip title="Bình chọn tiêu cực">
                          <Button
                            type="text"
                            icon={<ArrowDownOutlined />}
                            onClick={() => handleVoteAnswer(answer.id, "down")}
                            className="vote-button"
                          />
                        </Tooltip>
                        {answer.is_accepted && (
                          <Tooltip title="Câu trả lời được chấp nhận">
                            <CheckCircleFilled className="mt-2 text-green-500 text-2xl" />
                          </Tooltip>
                        )}
                        {!answer.is_accepted &&
                          user &&
                          question.user?.id === user.id && (
                            <Tooltip title="Chấp nhận câu trả lời này">
                              <Button
                                type="text"
                                icon={<CheckCircleFilled />}
                                onClick={() => handleAcceptAnswer(answer.id)}
                                className="mt-2"
                              />
                            </Tooltip>
                          )}
                      </div>

                      {/* Answer content */}
                      <div className="flex-1">
                        <div
                          className="answer-content"
                          dangerouslySetInnerHTML={{ __html: answer.content }}
                        />

                        <div className="flex justify-between items-center mt-4">
                          <div>
                            <Button
                              type="text"
                              icon={<CommentOutlined />}
                              onClick={() => toggleCommentForm(answer.id)}
                            >
                              Thêm bình luận
                            </Button>
                          </div>
                          <div className="bg-blue-50 p-3 rounded-md">
                            <div className="text-gray-500 text-sm">
                              Đã trả lời vào {answer.created_at}
                            </div>
                            <div className="flex items-center mt-2">
                              <Avatar src={answer.user?.avatar} />
                              <Link
                                to={`/users/${answer.user?.id}/${answer.user?.username.replace(/\s+/g, "-")}`}
                              >
                                <Text
                                  strong
                                  className="ml-2 hover:text-[#1890ff]"
                                >
                                  {answer.user?.username}
                                </Text>
                              </Link>
                            </div>
                          </div>
                        </div>

                        {/* Comment form */}
                        {commentForms[answer.id] && (
                          <div className="mt-4">
                            <Form
                              layout="vertical"
                              onFinish={(values) =>
                                handleSubmitComment(answer.id, values)
                              }
                            >
                              <Form.Item
                                name="content"
                                rules={[
                                  {
                                    required: true,
                                    message: "Vui lòng nhập nội dung bình luận",
                                  },
                                ]}
                              >
                                <TextArea
                                  rows={2}
                                  placeholder="Nhập bình luận của bạn..."
                                  maxLength={500}
                                />
                              </Form.Item>
                              <Form.Item>
                                <Button
                                  type="primary"
                                  htmlType="submit"
                                  loading={submittingComments[answer.id]}
                                >
                                  Thêm bình luận
                                </Button>
                                <Button
                                  className="ml-2"
                                  onClick={() => toggleCommentForm(answer.id)}
                                >
                                  Hủy
                                </Button>
                              </Form.Item>
                            </Form>
                          </div>
                        )}

                        {/* Comments */}
                        {answer.comments && answer.comments.length > 0 && (
                          <div className="bg-gray-50 mt-4 p-4 rounded-md comments">
                            <List
                              itemLayout="horizontal"
                              dataSource={answer.comments}
                              renderItem={(comment: Comment) => (
                                <List.Item>
                                  <List.Item.Meta
                                    avatar={
                                      <Avatar src={comment.user?.avatar} />
                                    }
                                    title={
                                      <Link
                                        to={`/users/${comment.user?.id}/${comment.user?.username.replace(/\s+/g, "-")}`}
                                      >
                                        <Text
                                          strong
                                          className="hover:text-[#1890ff]"
                                        >
                                          {comment.user?.username}
                                        </Text>
                                      </Link>
                                    }
                                    description={
                                      <>
                                        <p>{comment.content}</p>
                                        <Text
                                          type="secondary"
                                          className="text-xs"
                                        >
                                          {comment.created_at}
                                        </Text>
                                      </>
                                    }
                                  />
                                </List.Item>
                              )}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <div className="py-6 text-center">
                  <Text type="secondary">
                    Chưa có câu trả lời cho câu hỏi này
                  </Text>
                </div>
              </Card>
            )}

            {/* Answer form with TinyMCE */}
            <div className="mt-6">
              <Card title="Câu trả lời của bạn">
                {user ? (
                  <div>
                    <TinyEditor
                      onEditorInit={(editor) => {
                        editorRef.current = editor;
                      }}
                    />
                    <div className="mt-4">
                      <Button
                        type="primary"
                        onClick={handleSubmitAnswer}
                        loading={isSubmittingAnswer}
                      >
                        Đăng câu trả lời
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="py-4 text-center">
                    <Text type="secondary">
                      Vui lòng{" "}
                      <a onClick={() => history.push("/auth/login")}>
                        đăng nhập
                      </a>{" "}
                      để trả lời câu hỏi này
                    </Text>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          .question-content img, .answer-content img {
            max-width: 100%;
            height: auto;
          }
          
          .question-content pre, .answer-content pre {
            background-color: #f6f8fa;
            border-radius: 3px;
            padding: 16px;
            overflow: auto;
            font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
            font-size: 85%;
          }
          
          .question-content code, .answer-content code {
            font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
            padding: 0.2em 0.4em;
            margin: 0;
            font-size: 85%;
            background-color: rgba(27,31,35,0.05);
            border-radius: 3px;
          }
          
          .question-content pre code, .answer-content pre code {
            background-color: transparent;
            padding: 0;
            margin: 0;
            font-size: 100%;
            word-break: normal;
            white-space: pre;
            overflow: visible;
          }
        `}
      </style>
    </div>
  );
};

export default QuestionDetail;