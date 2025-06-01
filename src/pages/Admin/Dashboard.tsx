import React, { useState } from 'react';
import { ArrowLeft, Maximize2, MoreHorizontal } from 'lucide-react';
import { Card, Row, Col, Statistic, Button } from 'antd';
import { UserOutlined, FileTextOutlined, CommentOutlined, EyeOutlined } from '@ant-design/icons';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('posts');

  // Tạo mảng nhãn cho 5 ngày gần nhất (27/05/2025 - 31/05/2025)
  const labels = ['27/05/2025', '28/05/2025', '29/05/2025', '30/05/2025', '31/05/2025'];

  // Dữ liệu giả lập cho thống kê người dùng (đăng nhập trong 5 ngày gần nhất)
  const userChartData = {
    labels,
    datasets: [
      {
        label: 'Số sinh viên đăng nhập',
        data: [120, 130, 140, 145, 150],
        backgroundColor: '#FF9800',
        borderColor: '#F57C00',
        borderWidth: 1,
      },
      {
        label: 'Số giảng viên đăng nhập',
        data: [15, 18, 17, 19, 20],
        backgroundColor: '#2196F3',
        borderColor: '#1976D2',
        borderWidth: 1,
      },
    ],
  };

  // Dữ liệu giả lập cho thống kê bài viết (hoàn thành và đăng trong 5 ngày gần nhất)
  const postChartData = {
    labels,
    datasets: [
      {
        label: 'Bài viết hoàn thành',
        data: [25, 28, 30, 32, 30],
        backgroundColor: '#4CAF50',
        borderColor: '#388E3C',
        borderWidth: 1,
      },
      {
        label: 'Bài viết được đăng',
        data: [40, 45, 48, 50, 50],
        backgroundColor: '#FF4D4F',
        borderColor: '#F5222D',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Thống kê 5 ngày gần nhất (27/05/2025 - 31/05/2025)' },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Số lượng' } },
      x: { title: { display: true, text: 'Ngày' } },
    },
  };

  return (
    <div className="bg-gray-50 p-6 min-h-screen">
      {/* Tiêu đề */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <button className="hover:bg-gray-200 p-2 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center space-x-2">
            <h1 className="font-semibold text-gray-800 text-xl">Bảng Điều Khiển Quản Trị</h1>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="hover:bg-gray-200 p-2 rounded-lg transition-colors">
            <Maximize2 className="w-4 h-4 text-gray-600" />
          </button>
          <button className="hover:bg-gray-200 p-2 rounded-lg transition-colors">
            <MoreHorizontal className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="gap-6 grid grid-cols-12">
        {/* Hàng đầu tiên - Thống kê chính */}
        <div className="col-span-3">
          <div className="bg-white shadow-sm p-6 border border-gray-200 rounded-lg">
            <Statistic
              title="Tổng số người dùng"
              value={3892}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </div>
        </div>

        <div className="col-span-3">
          <div className="bg-white shadow-sm p-6 border border-gray-200 rounded-lg">
            <Statistic
              title="Tổng số bài viết"
              value={1245}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </div>
        </div>

        <div className="col-span-3">
          <div className="bg-white shadow-sm p-6 border border-gray-200 rounded-lg">
            <Statistic
              title="Tổng số bình luận"
              value={8567}
              prefix={<CommentOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </div>
        </div>

        <div className="col-span-3">
          <div className="bg-white shadow-sm p-6 border border-gray-200 rounded-lg">
            <Statistic
              title="Tổng số lượt xem"
              value={125890}
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
            <Bar
              data={activeTab === 'posts' ? postChartData : userChartData}
              options={chartOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;