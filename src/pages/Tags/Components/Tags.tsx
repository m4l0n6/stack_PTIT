import React, { useState } from 'react';
import { Card, Tag, Row, Col, Typography, Input, Button, Space, Pagination } from 'antd';
const { Title, Text } = Typography;


interface TagItem {
  name: string;
  count: number;
  description: string;
}


const generateFakeTags = (): TagItem[] => {
  const tags: TagItem[] = [];
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

const Tags: React.FC = () => {
  const [tags] = useState<TagItem[]>(generateFakeTags());
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
    <div style={{ padding: 16, background: '#fff' }}>
      <Title level={2} style={{ color: '#000' }}>
        Tags
      </Title>
      <Text style={{ color: '#000', marginBottom: 16 }}>
        A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.
      </Text>
      <Space style={{ marginBottom: 24 }}>
        <Input
          placeholder="Filter by tag name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ width: 200 }}
        />
        <Button type="link" style={{ color: '#000' }}>
          Show all tag synonyms
        </Button>
      </Space>

      <Row gutter={[24, 24]}>
        {paginatedTags.map((tag) => (
          <Col key={tag.name} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              style={{
                height: 200,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: '#fff',
                borderRadius: 8,
                border: '1px solid #e8e8e8',
              }}
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                <Tag
                  style={{
                    fontSize: 16,
                    color: '#fff',
                    background: '#1890ff',
                    border: 'none',
                    borderRadius: 4,
                    padding: '2px 8px',
                  }}
                >
                  {tag.name}
                </Tag>
                <Text style={{ color: '#000', marginBottom: 8 }}>
                  {tag.description}
                </Text>
                <Text strong style={{ color: '#000', marginBottom: 4 }}>
                  {tag.count} questions
                </Text>
                <Text style={{ color: '#000' }}>
                  {tag.count > 0 && (
                    <>
                      ({Math.floor(Math.random() * 40)} asked today, {tag.count} this week)
                    </>
                  )}
                </Text>
              </Space>
            </Card>
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

export default Tags;