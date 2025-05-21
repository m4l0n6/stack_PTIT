import React from 'react';
import { Card, Tag as AntTag, Typography, Space } from 'antd';
import { Tag } from '@/services/Tags/typing';

const { Text } = Typography;

const TagCard: React.FC<{ tag: Tag }> = ({ tag }) => {
  return (
    <Card
      hoverable
      className='flex flex-col justify-between bg-white border border-[#e8e8e8] rounded-lg h-[200px]'
    >
      <Space direction="vertical" className='w-full'>
        <AntTag
          color='blue'
          className='px-2 py-1 rounded-lg text-sm'
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

export default TagCard;