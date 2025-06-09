import { Statistic, Row, Col, List, Tag as AntTag, Space, Tabs, Typography, Spin, Tooltip } from "antd";
import { Link, useModel } from "umi";
import React, { useEffect } from "react";
import { User } from "@/services/Users/typing";
import { Question } from "@/services/Questions/typing";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { QuestionCircleOutlined, CommentOutlined, TagOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;
const { Text, Title } = Typography;

interface ProfileProps {
  user?: User | null;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const { 
    questions, 
    answers, 
    tags, 
    loading, 
    fetchUserData 
  } = useModel('profile');

  useEffect(() => {
    if (user?.id) {
      fetchUserData(user.id);
    }
  }, [user?.id, fetchUserData]);

  if (!user) {
    return <div>Không có thông tin người dùng</div>;
  }

  const questionVotes = questions.reduce((acc, question) => {
    return acc + (question.upvotes - question.downvotes);
  }, 0);

  return (
    <div className="flex md:flex-row flex-col">
      <div className="mr-4 mb-6 md:mb-0 w-full md:w-1/4">
        <h1 className="mb-2 text-2xl">Trạng thái</h1>
        <div className="mb-2 p-4 border rounded-lg">
          <Row gutter={16}>
            <Col span={12}>
              <Statistic title="Danh tiếng" value={user?.reputation || 0} />
            </Col>
            <Col span={12}>
              <Statistic title="Câu hỏi" value={questions.length} />
            </Col>
            <Col span={12}>
              <Statistic title="Câu trả lời" value={answers.length} />
            </Col>
            <Col span={12}>
              <Statistic title="Thẻ" value={tags.length} />
            </Col>
          </Row>
        </div>
      </div>

      <div className="w-full md:w-3/4">
        <div className="mb-4">
          <h1 className="mb-2 text-2xl">Giới thiệu</h1>
          <div className="mb-2 p-4 border rounded-lg">
            <p>{user?.bio || "Chưa có thông tin giới thiệu"}</p>
          </div>
        </div>

        <Tabs defaultActiveKey="questions">
          <TabPane
            tab={
              <span>
                <QuestionCircleOutlined /> Câu hỏi ({questions.length})
              </span>
            }
            key="questions"
          >
            <Spin spinning={loading.questions}>
              <List
                dataSource={questions}
                locale={{ emptyText: "Người dùng chưa có bài đăng nào" }}
                renderItem={(question: Question) => (
                  <List.Item
                    key={question.id}
                    className="hover:bg-[#f5f5f5] mb-2 border-2 border-gray-200 rounded-lg"
                  >
                    <div className="p-2 w-full">
                      <Link
                        to={`/question/${question.id}`}
                        className="font-medium hover:text-blue-600 text-lg"
                      >
                        {question.title}
                      </Link>

                      <div className="mt-2">
                        <Space>
                          <Tooltip
                            title={`Tiêu cực: ${question.upvotes} - Tích cực: ${question.downvotes}`}
                          >
                            <AntTag color="blue">
                              {question.upvotes - question.downvotes} votes
                            </AntTag>
                          </Tooltip>

                          <AntTag color="green">
                            {question.answer_count || 0} câu trả lời
                          </AntTag>
                          <AntTag color="orange">
                            {question.views} lượt xem
                          </AntTag>
                        </Space>
                      </div>

                      <div className="mt-2 mb-2">
                        {question.tags?.map((tag) => (
                          <AntTag key={tag.id} className="mr-1">
                            <Link to={`/questions/tagged/${tag.name}`}>
                              {tag.name}
                            </Link>
                          </AntTag>
                        ))}
                      </div>
                      <Text type="secondary">
                        Đăng{" "}
                        {formatDistanceToNow(new Date(question.created_at), {
                          addSuffix: true,
                          locale: vi,
                        })}
                      </Text>
                    </div>
                  </List.Item>
                )}
              />
            </Spin>
          </TabPane>
          <TabPane
            tab={
              <span>
                <CommentOutlined /> Câu trả lời ({answers.length})
              </span>
            }
            key="answers"
          >
            <Spin spinning={loading.answers}>
              <List
                dataSource={answers}
                locale={{ emptyText: "Người dùng chưa có câu trả lời nào" }}
                renderItem={(answer: any) => (
                  <List.Item
                    key={answer.id}
                    className="hover:bg-[#f5f5f5] p-4 border-b last:border-b-0"
                  >
                    <div className="w-full">
                      <Link
                        to={`/question/${answer.question_id}`}
                        className="font-medium hover:text-blue-600 text-lg"
                      >
                        {answer.question_title ||
                          `Câu trả lời cho câu hỏi #${answer.question_id}`}
                      </Link>

                      <div className="mt-2">
                        <div
                          className="bg-gray-50 p-2 rounded-md text-gray-600"
                          dangerouslySetInnerHTML={{
                            __html:
                              answer.content?.length > 200
                                ? `${answer.content.substring(0, 200)}...`
                                : answer.content,
                          }}
                        />
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <Space>
                          <AntTag color="blue">
                            {answer.upvotes - answer.downvotes} votes
                          </AntTag>
                          <AntTag color="cyan">
                            {answer.comments?.length || 0} bình luận
                          </AntTag>
                          {answer.is_accepted && (
                            <AntTag color="green">Đã chấp nhận</AntTag>
                          )}
                        </Space>
                        <Text type="secondary">
                          Trả lời{" "}
                          {formatDistanceToNow(new Date(answer.created_at), {
                            addSuffix: true,
                            locale: vi,
                          })}
                        </Text>
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            </Spin>
          </TabPane>
          <TabPane
            tab={
              <span>
                <TagOutlined /> Thẻ liên quan ({tags.length})
              </span>
            }
            key="tags"
          >
            <Spin spinning={loading.tags}>
              <div className="flex flex-wrap gap-4 p-4">
                {tags.length > 0 ? (
                  tags.map((tag: any) => (
                    <div
                      key={tag.id}
                      className="flex-1 bg-gray-50 p-4 border rounded-lg min-w-[200px]"
                    >
                      <Link
                        to={`/questions/tagged/${tag.name}`}
                        className="font-medium text-lg"
                      >
                        {tag.name}
                      </Link>
                      <div className="mt-2">
                        <AntTag color="blue">{tag.count || 0} bài đăng</AntTag>
                        {tag.description && (
                          <div className="mt-2 text-gray-600 text-sm">
                            {tag.description}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 w-full text-gray-500 text-center">
                    {" "}
                    Người dùng chưa có thẻ nào
                  </div>
                )}
              </div>
            </Spin>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
