import React from 'react';
import { Card, Tag as AntTag, Typography, Space } from 'antd';
import { Tag } from '@/services/Tags/typing';

const { Text } = Typography;

const TagCard: React.FC<{ tag: Tag }> = ({ tag }) => {
  return (
    <Card
      hoverable
      className="flex flex-col justify-between bg-white border border-[#e8e8e8] rounded-lg h-[200px]"
    >
      <Space direction="vertical" className="w-full">
        <AntTag color="blue" className="px-2 py-1 rounded-lg text-sm">
          {tag.name}
        </AntTag>
        <Text className="mb-2 min-h-[4.5em] text-black line-clamp-3">
          {tag.description}
        </Text>
        <div className="flex justify-between items-center">
          <Text className="text-gray-500 text-sm">
            {tag.count ?? 0} questions
          </Text>
          <Text style={{ color: "#000" }}>
            {(tag.count ?? 0) > 0 && (
              <>
                ({tag.count} asked today, {tag.count} this week)
              </>
            )}
          </Text>
        </div>
      </Space>
    </Card>
  );
};

export default TagCard;