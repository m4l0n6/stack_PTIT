import React, { useState, useEffect } from 'react';
import { Row, Col, Typography, Input, Button, Space, Pagination, message, Spin } from 'antd';
import Tags from '@/pages/Tags/components/Tags';
import { Tag } from '@/services/Tags/typing';
import { getTags, searchTags } from '@/services/Tags';

const { Title } = Typography;

const TagsPage: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12; // Số lượng thẻ mỗi trang
  
  // Lấy danh sách tags từ API
  const fetchTags = async () => {
    try {
      setLoading(true);
      const result = await getTags();
      if (result.success) {
        setTags(result.data);
      } else {
        message.error('Không thể lấy danh sách tags');
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
      message.error('Đã xảy ra lỗi khi lấy danh sách tags');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchTags();
  }, []);
  
  // Tìm kiếm tags
  const handleSearch = async () => {
    if (!filter) {
      fetchTags();
      return;
    }
    
    try {
      setLoading(true);
      const result = await searchTags(filter);
      if (result.success) {
        setTags(result.data);
        setCurrentPage(1); // Reset về trang đầu tiên khi tìm kiếm
      } else {
        message.error('Không thể tìm kiếm tags');
      }
    } catch (error) {
      console.error('Error searching tags:', error);
      message.error('Đã xảy ra lỗi khi tìm kiếm tags');
    } finally {
      setLoading(false);
    }
  };
  const paginatedTags = tags.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Reset về trang đầu tiên khi thay đổi filter
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  return (
    <>
      <Title level={2} className='text-black'>
        Tags
      </Title>
      <p className='mb-4 text-gray-600'>
        A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.
      </p>      <Space className='mb-6'>
        <Input
          placeholder="Filter by tag name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ width: 200 }}
          onPressEnter={handleSearch}
        />
        <Button type="primary" onClick={handleSearch}>
          Tìm kiếm
        </Button>
        <Button type="link" color='blue' onClick={fetchTags}>
          Hiển thị tất cả tags
        </Button>
      </Space>

      {loading ? (
        <div className="py-8 text-center">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Row gutter={[24, 24]}>
            {paginatedTags.length > 0 ? (
              paginatedTags.map((tag) => (
                <Col key={tag.id || tag.name} xs={24} sm={12} md={8} lg={6}>
                  <Tags tag={tag} />
                </Col>
              ))
            ) : (
              <Col span={24} className='text-center'>
                <Typography.Text type="secondary">
                  Không tìm thấy tags nào
                </Typography.Text>
              </Col>
            )}
          </Row>
          
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={tags.length}
            onChange={(page) => setCurrentPage(page)}
            style={{ marginTop: 24, textAlign: 'center', color: '#000' }}
            showSizeChanger={false}
          />
        </>
      )}
    </>
  );
};
export default TagsPage;