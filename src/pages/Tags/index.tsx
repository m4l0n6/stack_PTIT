import React, { useState } from 'react';
import { Layout, Row, Col, Typography, Input, Button, Space, Pagination } from 'antd';
import Tags from './components/Tags';
import { Tag } from '@/services/Tags/typing';

const { Content } = Layout;
const { Title } = Typography;

// Function to generate fake tags data
const generateFakeTags = (): Tag[] => {
  const tags: Tag[] = [];
  const baseTags = ['javascript', 'python', 'java', 'c#', 'php', 'android', 'html', 'jquery', 'c++', 'css', 'ios', 'sql'];
  for (let i = 0; i < 50; i++) {
    const randomBaseTag = baseTags[Math.floor(Math.random() * baseTags.length)];
    tags.push({
      name: `${randomBaseTag}-${i + 1}`,
      count: Math.floor(Math.random() * 1000),
      description: `Câu hỏi về ${randomBaseTag}, công nghệ phổ biến trong ${Math.floor(Math.random() * 10) + 1} năm qua`,
    });
  }
  return tags;
};

const TagsPage: React.FC = () => {
  const [tags] = useState<Tag[]>(generateFakeTags());
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12; // Số lượng thẻ mỗi trang

  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(filter.toLowerCase())
  );

  const paginatedTags = filteredTags.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      <Title level={2} className='text-black'>
        Tags
      </Title>
      <p className='mb-4 text-gray-600'>
        A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.
      </p>

      <Space className='mb-6'>
        <Input
          placeholder="Filter by tag name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ width: 200 }}
        />
        <Button type="link" color='blue'>
          Show all tag synonyms
        </Button>
      </Space>

      <Row gutter={[24, 24]}>
        {paginatedTags.map((tag) => (
          <Col key={tag.name} xs={24} sm={12} md={8} lg={6}>
            <Tags tag={tag} />
          </Col>
        ))}
      </Row>
      
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={filteredTags.length}
        onChange={(page) => setCurrentPage(page)}
        style={{ marginTop: 24, textAlign: 'center', color: '#000' }}
        showSizeChanger={false}
      />
    </div>

  );
};

export default TagsPage;