import React from 'react';
import { Card, Tag as AntTag, Typography, Space } from 'antd';
import { Tag } from '@/services/Tags/typing';
import { Link } from 'umi';

const { Text } = Typography;

const TagCard: React.FC<{ tag: Tag }> = ({ tag }) => {
  return (
    <Link to={`/questions/tagged/${tag.name}`}>
      <Card
        hoverable
        className='flex flex-col justify-between bg-white hover:shadow-lg border border-[#e8e8e8] rounded-lg h-[200px] transition-all duration-200'
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
            {(tag.count ?? 0)} questions
          </Text>
          <Text style={{ color: '#000' }}>
            {(tag.count ?? 0) > 0 && (
              <>
                ({tag.count} asked today, {tag.count} this week)
              </>
            )}
          </Text>
        </Space>
      </Card>
    </Link>
  );
};

export default TagCard;