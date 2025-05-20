import React from 'react';
import { Card, Tag as AntTag, Typography, Space } from 'antd';
const { Text } = Typography;

export interface TagItem {
  name: string;
  count: number;
  description: string;
}

// Component for individual tag card
const Tags: React.FC<{ tag: TagItem }> = ({ tag }) => {
  return (
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
        <AntTag
          style={{
            fontSize: 16,
            borderRadius: 4,
            padding: '2px 8px',
          }}
          color='blue'
        >
          {tag.name}
        </AntTag>
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
  );
};

export default Tags;