import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Button, message } from 'antd';
import { UserOutlined, FileTextOutlined, CommentOutlined, EyeOutlined, ArrowLeftOutlined, ExpandOutlined, ExpandAltOutlined } from '@ant-design/icons';
import { Bar } from '@ant-design/plots';
import { useModel } from 'umi';
import { users } from '@/mock/users';
import comments from '@/mock/comments';
import dayjs from 'dayjs';

const AdminDashboard: React.FC = () => {
  // Lấy dữ liệu từ model
  const user  = useModel('user');
  const questions = useModel('Question.question');
  const [activeTab, setActiveTab] = useState('posts');

  // Lấy 5 ngày gần nhất (dạng dd/MM/yyyy, luôn đủ 2 số)
  const labels = Array.from({ length: 5 }, (_, i) => dayjs().subtract(4 - i, 'day').format('DD/MM/YYYY'));

  // Thống kê số user đăng ký mới mỗi ngày (theo created_at)
  const userChartData = labels.flatMap(date => [
    {
      type: 'Số sinh viên đăng ký',
      date,
      value: users.filter(u => u.role === 'student' && dayjs(u.created_at).format('DD/MM/YYYY') === date).length,
    },
    {
      type: 'Số giảng viên đăng ký',
      date,
      value: users.filter(u => u.role === 'teacher' && dayjs(u.created_at).format('DD/MM/YYYY') === date).length,
    },
  ]);

  // Thống kê bài viết được đăng mỗi ngày (theo created_at)
  const postChartData = labels.flatMap(date => [
    {
      type: 'Bài viết được đăng',
      date,
      value: Number(questions.questions.filter(q => q.created_at && dayjs(q.created_at).format('DD/MM/YYYY') === date).length),
    },
  ]);

  const chartConfig = {
    data: activeTab === 'posts' ? postChartData : userChartData,
    xField: 'date',
    yField: 'value',
    seriesField: 'type',
    isGroup: true,
    legend: {
      position: 'top',
      itemName: {
        style: {
          fontWeight: 600,
          fontSize: 16,
        },
      },
    },
    color: activeTab === 'posts'
      ? ['#4CAF50', '#FF4D4F']
      : ['#FF9800', '#2196F3'],
    label: { position: 'right' as const },
    xAxis: { title: { text: 'Số lượng' } },
    yAxis: { title: { text: 'Ngày' } },
    height: 350,
  };

  // Lấy dữ liệu mock
  const totalUsers = users.length;
  const totalQuestions = questions.questions.length;
  const totalComments = comments.length;
  // Tính tổng số lượt xem từ tất cả questions
  const totalViews = questions.questions.reduce((sum: number, q: any) => sum + (q.views || 0), 0);

  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      {/* Tiêu đề */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <Button className="hover:bg-gray-200 p-2 rounded-lg transition-colors">
            <ArrowLeftOutlined className="w-5 h-5 text-gray-600" />
          </Button>
          <div className="flex items-center space-x-2">
            <h1 className="font-semibold text-gray-800 text-xl">Bảng Điều Khiển Quản Trị</h1>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button className="hover:bg-gray-200 p-2 rounded-lg transition-colors">
            <ExpandAltOutlined className="w-4 h-4 text-gray-600" />
          </Button>
          <Button className="hover:bg-gray-200 p-2 rounded-lg transition-colors">
            <ExpandOutlined className="w-4 h-4 text-gray-600" />
          </Button>
        </div>
      </div>

      <div className="gap-6 grid grid-cols-12">
        {/* Hàng đầu tiên - Thống kê chính */}
        <div className="col-span-3">
          <div className="bg-white shadow-sm p-6 border border-gray-200 rounded-lg">
            <Statistic
              title="Tổng số người dùng"
              value={totalUsers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </div>
        </div>

        <div className="col-span-3">
          <div className="bg-white shadow-sm p-6 border border-gray-200 rounded-lg">
            <Statistic
              title="Tổng số bài viết"
              value={totalQuestions}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </div>
        </div>

        <div className="col-span-3">
          <div className="bg-white shadow-sm p-6 border border-gray-200 rounded-lg">
            <Statistic
              title="Tổng số bình luận"
              value={totalComments}
              prefix={<CommentOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </div>
        </div>

        <div className="col-span-3">
          <div className="bg-white shadow-sm p-6 border border-gray-200 rounded-lg">
            <Statistic
              title="Tổng số lượt xem"
              value={totalViews}
              prefix={<EyeOutlined />}
              valueStyle={{ color: '#8b5cf6' }}
            />
          </div>
        </div>

        {/* Hàng thứ hai - Nút chuyển đổi và biểu đồ */}
        <div className="col-span-12">
          <div className="bg-white shadow-sm p-6 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-gray-800 text-lg">
                {activeTab === 'posts'
                  ? 'Thống kê bài viết 5 ngày gần nhất'
                  : 'Thống kê đăng nhập 5 ngày gần nhất'}
              </h3>
              <div>
                <Button
                  type={activeTab === 'posts' ? 'primary' : 'default'}
                  onClick={() => setActiveTab('posts')}
                  style={{ marginRight: '10px' }}
                >
                  Thống kê bài đăng
                </Button>
                <Button
                  type={activeTab === 'users' ? 'primary' : 'default'}
                  onClick={() => setActiveTab('users')}
                >
                  Thống kê người dùng
                </Button>
              </div>
            </div>
            <Bar {...chartConfig} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
