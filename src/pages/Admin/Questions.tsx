import React, { useState } from 'react';
import { Table, Button, Space, Card, Tag, Modal, Avatar, Descriptions, Typography } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Question } from '@/services/Questions/typing';

const { Text } = Typography;

const RecentPosts: React.FC = () => {
  const [isAnswerModalVisible, setIsAnswerModalVisible] = useState(false);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [isQuestionDetailModalVisible, setIsQuestionDetailModalVisible] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<{ id: number; name: string; avatar: string; joinDate?: string; expireDate?: string; status?: string; intro?: string; posts?: number } | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  // Dữ liệu tĩnh
  const data: Question[] = [
    {
      id: 1,
      title: 'Cách học TypeScript hiệu quả',
      content: 'Nội dung chi tiết về cách học TypeScript một cách hiệu quả...',
      tags: ['typescript', 'programming'],
      user: {
        id: 101,
        name: 'Nguyễn Văn A',
        avatar: 'https://example.com/avatar1.jpg',
      },
      createdAt: '2025-05-25',
      voteCount: 50,
      answerCount: 2,
      viewCount: 1200,
      answers: [
        {
          id: 1,
          content: 'Bạn nên bắt đầu với các tài liệu chính thức của TypeScript.',
          user: { id: 102, name: 'Trần Thị B', avatar: 'avatar2.jpg' },
          createdAt: '2025-05-25',
          voteCount: 10,
          isAccepted: true,
          commentCount: 3,
          comments: [],
        },
        {
          id: 2,
          content: 'Học qua các dự án thực tế sẽ rất hiệu quả.',
          user: { id: 103, name: 'Lê Văn C', avatar: 'avatar3.jpg' },
          createdAt: '2025-05-26',
          voteCount: 5,
          isAccepted: false,
          commentCount: 1,
          comments: [],
        },
      ],
    },
    {
      id: 2,
      title: 'Hướng dẫn sử dụng Ant Design',
      content: 'Hướng dẫn chi tiết về cách sử dụng Ant Design trong React...',
      tags: ['antd', 'react'],
      user: {
        id: 102,
        name: 'Trần Thị B',
        avatar: 'https://example.com/avatar2.jpg',
      },
      createdAt: '2025-05-24',
      voteCount: 30,
      answerCount: 1,
      viewCount: 850,
      answers: [
        {
          id: 3,
          content: 'Ant Design rất dễ sử dụng với React.',
          user: { id: 101, name: 'Nguyễn Văn A', avatar: 'avatar1.jpg' },
          createdAt: '2025-05-24',
          voteCount: 8,
          isAccepted: false,
          commentCount: 2,
          comments: [],
        },
      ],
    },
    {
      id: 3,
      title: 'Tối ưu hóa hiệu suất React',
      content: 'Các phương pháp tối ưu hóa hiệu suất cho ứng dụng React...',
      tags: ['react', 'performance'],
      user: {
        id: 103,
        name: 'Lê Văn C',
        avatar: 'https://example.com/avatar3.jpg',
      },
      createdAt: '2025-05-23',
      voteCount: 75,
      answerCount: 0,
      viewCount: 2000,
      answers: [],
    },
  ];

  const showAnswerModal = (answers: any[]) => {
    setSelectedAnswers(answers);
    setIsAnswerModalVisible(true);
  };

  const showUserModal = (user: { id: number; name: string; avatar: string }) => {
    setSelectedUser({
      ...user,
      joinDate: '2025-01-01',
      expireDate: '2025-12-31',
      status: 'Hoạt động',
      intro: 'Thành viên tích cực, yêu thích lập trình.',
      posts: 5,
    });
    setIsUserModalVisible(true);
  };

  const showQuestionDetailModal = (question: Question) => {
    setSelectedQuestion(question);
    setIsQuestionDetailModalVisible(true);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
      align: 'center' as const,
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      width: 280,
      ellipsis: true,
      render: (text: string) => <Text strong style={{ color: '#1890ff' }}>{text}</Text>,
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content',
      width: 320,
      ellipsis: true,
      render: (text: string) => <Text type="secondary">{text}</Text>,
    },
    {
      title: 'Tác giả',
      dataIndex: 'user',
      key: 'user',
      width: 160,
      align: 'center' as const,
      render: (user: { id: number; name: string; avatar: string }) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '4px' }}>
          <Avatar
            src={user.avatar}
            size={32}
            onClick={() => showUserModal(user)}
            style={{ cursor: 'pointer', border: '2px solid #1890ff' }}
          />
          <Text style={{ fontSize: '11px', textAlign: 'center' }}>{user.name}</Text>
        </div>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 240,
      align: 'center' as const,
      render: (_: any, record: Question) => (
        <Space size="small">
          <Button 
            type="primary" 
            icon={<EyeOutlined />} 
            size="small"
            style={{ borderRadius: '6px' }}
            onClick={() => showQuestionDetailModal(record)}
          >
            Xem
          </Button>
          <Button 
            type="default" 
            icon={<EditOutlined />} 
            size="small"
            style={{ borderRadius: '6px' }}
          >
            Sửa
          </Button>
          <Button 
            type="default" 
            danger 
            icon={<DeleteOutlined />} 
            size="small"
            style={{ borderRadius: '6px' }}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card
        title="Danh sách bài viết gần đây"
        style={{ borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
        headStyle={{ backgroundColor: '#f0f5ff', color: '#1d39c4', fontSize: '18px', fontWeight: 'bold' }}
      >
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            current: 1,
            pageSize: 10,
            total: 30,
            size: 'small',
            style: { marginTop: '16px' },
          }}
          rowClassName={() => 'custom-row'}
          style={{ backgroundColor: '#fff', borderRadius: '8px' }}
          scroll={{ x: 1060 }}
        />
      </Card>

      {/* Modal chi tiết câu hỏi */}
      <Modal
        title={
          <div style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '16px 20px',
            margin: '-20px -24px 20px -24px',
            borderRadius: '12px 12px 0 0',
            textAlign: 'center'
          }}>
            <Text strong style={{ fontSize: '20px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <EyeOutlined />
              Chi tiết câu hỏi
            </Text>
          </div>
        }
        open={isQuestionDetailModalVisible}
        onCancel={() => setIsQuestionDetailModalVisible(false)}
        footer={null}
        width={900}
        style={{ top: 20 }}
        bodyStyle={{ 
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', 
          padding: '0px',
          borderRadius: '12px'
        }}
      >
        {selectedQuestion ? (
          <div style={{ padding: '24px' }}>
            {/* Header với ID và tiêu đề */}
            <div style={{ 
              background: 'white',
              padding: '20px',
              borderRadius: '12px',
              marginBottom: '20px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              border: '1px solid #e8f4f8'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <Tag color="blue" style={{ fontSize: '12px', fontWeight: 'bold' }}>
                  ID: {selectedQuestion.id}
                </Tag>
              </div>
              <Text strong style={{ 
                fontSize: '24px', 
                color: '#1d39c4',
                lineHeight: '1.4',
                display: 'block'
              }}>
                {selectedQuestion.title}
              </Text>
            </div>

            {/* Nội dung */}
            <div style={{ 
              background: 'white',
              padding: '20px',
              borderRadius: '12px',
              marginBottom: '20px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              border: '1px solid #e8f4f8'
            }}>
              <Text strong style={{ fontSize: '16px', color: '#595959', marginBottom: '12px', display: 'block' }}>
                📄 Nội dung:
              </Text>
              <div style={{ 
                fontSize: '15px',
                lineHeight: '1.6',
                color: '#262626',
                backgroundColor: '#f8f9fa',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #e9ecef'
              }}>
                {selectedQuestion.content}
              </div>
            </div>

            {/* Tags và Tác giả */}
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
              <div style={{ 
                background: 'white',
                padding: '20px',
                borderRadius: '12px',
                flex: 1,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                border: '1px solid #e8f4f8'
              }}>
                <Text strong style={{ fontSize: '16px', color: '#595959', marginBottom: '12px', display: 'block' }}>
                  🏷️ Tags:
                </Text>
                <Space size={8} wrap>
                  {selectedQuestion.tags.map((tag) => (
                    <Tag 
                      key={tag} 
                      color="geekblue" 
                      style={{ 
                        borderRadius: '20px',
                        padding: '4px 12px',
                        fontSize: '13px',
                        fontWeight: '500'
                      }}
                    >
                      {tag}
                    </Tag>
                  ))}
                </Space>
              </div>

              <div style={{ 
                background: 'white',
                padding: '20px',
                borderRadius: '12px',
                flex: 1,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                border: '1px solid #e8f4f8'
              }}>
                <Text strong style={{ fontSize: '16px', color: '#595959', marginBottom: '12px', display: 'block' }}>
                  👤 Tác giả:
                </Text>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Avatar
                    src={selectedQuestion.user.avatar}
                    size={50}
                    style={{ 
                      border: '3px solid #1890ff',
                      cursor: 'pointer'
                    }}
                    onClick={() => showUserModal(selectedQuestion.user)}
                  />
                  <div>
                    <Text strong style={{ fontSize: '15px', display: 'block' }}>
                      {selectedQuestion.user.name}
                    </Text>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      Đăng ngày: {selectedQuestion.createdAt}
                    </Text>
                  </div>
                </div>
              </div>
            </div>

            {/* Thống kê */}
            <div style={{ 
              background: 'white',
              padding: '20px',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              border: '1px solid #e8f4f8'
            }}>
              <Text strong style={{ fontSize: '16px', color: '#595959', marginBottom: '16px', display: 'block' }}>
                📊 Thống kê:
              </Text>
              <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                <div style={{ 
                  padding: '12px 20px',
                  backgroundColor: '#f6ffed',
                  borderRadius: '8px',
                  border: '1px solid #b7eb8f',
                  minWidth: '100px'
                }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>
                    {selectedQuestion.voteCount}
                  </div>
                  <Text type="secondary" style={{ fontSize: '12px' }}>Lượt vote</Text>
                </div>
                
                <div 
                  style={{ 
                    padding: '12px 20px',
                    backgroundColor: selectedQuestion.answerCount > 0 ? '#e6f7ff' : '#f5f5f5',
                    borderRadius: '8px',
                    border: selectedQuestion.answerCount > 0 ? '1px solid #91d5ff' : '1px solid #d9d9d9',
                    minWidth: '100px',
                    cursor: selectedQuestion.answerCount > 0 ? 'pointer' : 'default'
                  }}
                  onClick={() => selectedQuestion.answerCount > 0 && showAnswerModal(selectedQuestion.answers || [])}
                >
                  <div style={{ 
                    fontSize: '24px', 
                    fontWeight: 'bold', 
                    color: selectedQuestion.answerCount > 0 ? '#1890ff' : '#8c8c8c'
                  }}>
                    {selectedQuestion.answerCount}
                  </div>
                  <Text type="secondary" style={{ fontSize: '12px' }}>Câu trả lời</Text>
                </div>
                
                <div style={{ 
                  padding: '12px 20px',
                  backgroundColor: '#fff7e6',
                  borderRadius: '8px',
                  border: '1px solid #ffd591',
                  minWidth: '100px'
                }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fa8c16' }}>
                    {selectedQuestion.viewCount}
                  </div>
                  <Text type="secondary" style={{ fontSize: '12px' }}>Lượt xem</Text>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <Text type="secondary" style={{ fontSize: '16px' }}>Không có thông tin câu hỏi.</Text>
          </div>
        )}
      </Modal>

      {/* Modal hiển thị danh sách câu trả lời */}
      <Modal
        title={<Text strong style={{ fontSize: '18px', color: '#1d39c4' }}>Danh sách câu trả lời</Text>}
        open={isAnswerModalVisible}
        onCancel={() => setIsAnswerModalVisible(false)}
        footer={null}
        style={{ borderRadius: '12px' }}
        bodyStyle={{ backgroundColor: '#f0f5ff', padding: '24px', borderRadius: '12px' }}
      >
        {selectedAnswers.length > 0 ? (
          <div>
            {selectedAnswers.map((answer, index) => (
              <div
                key={answer.id}
                style={{
                  marginBottom: '24px',
                  padding: '16px',
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                  transition: 'all 0.3s',
                }}
              >
                <Descriptions
                  title={<Text strong style={{ color: '#1d39c4' }}>Câu trả lời {index + 1}</Text>}
                  column={1}
                  labelStyle={{ fontWeight: 'bold', color: '#595959' }}
                  contentStyle={{ color: '#262626' }}
                >
                  <Descriptions.Item label="ID">{answer.id}</Descriptions.Item>
                  <Descriptions.Item label="Nội dung">
                    <Text style={{ color: '#595959' }}>{answer.content}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Người trả lời">{answer.user.name}</Descriptions.Item>
                  <Descriptions.Item label="Ngày trả lời">{answer.createdAt}</Descriptions.Item>
                  <Descriptions.Item label="Số lượt vote">
                    <Text style={{ color: '#52c41a' }}>{answer.voteCount}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Được chấp nhận">
                    <Tag color={answer.isAccepted ? 'green' : 'red'}>
                      {answer.isAccepted ? 'Có' : 'Không'}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Số bình luận">{answer.commentCount}</Descriptions.Item>
                </Descriptions>
              </div>
            ))}
          </div>
        ) : (
          <Text type="secondary">Không có câu trả lời.</Text>
        )}
      </Modal>

      {/* Modal hiển thị hồ sơ người dùng */}
      <Modal
        title={<Text strong style={{ fontSize: '18px', color: '#1d39c4' }}>Hồ sơ người dùng</Text>}
        open={isUserModalVisible}
        onCancel={() => setIsUserModalVisible(false)}
        footer={null}
        style={{ borderRadius: '12px' }}
        bodyStyle={{ backgroundColor: '#f0f5ff', padding: '24px', borderRadius: '12px' }}
      >
        {selectedUser ? (
          <div style={{ textAlign: 'center' }}>
            <Avatar src={selectedUser.avatar} size={80} style={{ marginBottom: '16px', border: '2px solid #1890ff' }} />
            <Descriptions
              column={1}
              labelStyle={{ fontWeight: 'bold', color: '#595959', fontSize: '14px' }}
              contentStyle={{ color: '#262626', fontSize: '14px' }}
              style={{ maxWidth: '300px', margin: '0 auto' }}
            >
              <Descriptions.Item label="Tên">{selectedUser.name}</Descriptions.Item>
              <Descriptions.Item label="Ngày tham gia">{selectedUser.joinDate}</Descriptions.Item>
              <Descriptions.Item label="Ngày hết hạn">{selectedUser.expireDate}</Descriptions.Item>
              <Descriptions.Item label="Trạng thái">{selectedUser.status}</Descriptions.Item>
              <Descriptions.Item label="Giới thiệu">{selectedUser.intro}</Descriptions.Item>
              <Descriptions.Item label="Bài viết">{selectedUser.posts}</Descriptions.Item>
            </Descriptions>
          </div>
        ) : (
          <Text type="secondary">Không có thông tin người dùng.</Text>
        )}
      </Modal>

      {/* CSS tùy chỉnh */}
      <style>
        {`
          .custom-row:hover {
            background-color: #f5f7fa !important;
            transition: background-color 0.3s;
          }
          .custom-row td {
            padding: 12px !important;
            font-size: 14px !important;
          }
          .ant-table-thead th {
            background-color: #f0f5ff !important;
            color: #1d39c4 !important;
            font-weight: bold !important;
            border-bottom: 2px solid #d9e4ff !important;
          }
          .ant-table-tbody td {
            border-bottom: 1px solid #f0f0f0 !important;
          }
        `}
      </style>
    </div>
  );
};

export default RecentPosts;