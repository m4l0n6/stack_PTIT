// src/pages/Profile/components/Saves.tsx
import { Card, List, Button } from "antd";
import React from "react";
import { Link, useParams } from "umi";
import { ArrowLeftOutlined } from "@ant-design/icons";

const Saves: React.FC = () => {
  const params = useParams<{ id: string }>();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h1 className="ml-4 font-bold text-2xl">Tất cả bài viết lưu trữ</h1>
        </div>
      </div>

      <div>
        <Card>
          <h1 className="mb-2 font-bold">Bài viết đã lưu</h1>
          <List>
            {Array.from({ length: 5 }, (_, index) => (
              <List.Item key={index} className="hover:bg-[#f5f5f5]">
                <div className="flex justify-center items-center bg-green-500 mr-2 rounded-lg w-12 h-8 text-white">
                  <div>5</div>
                </div>
                <List.Item.Meta
                  title={<a href="#">Bài viết {index + 1}</a>}
                  description="Mô tả ngắn về bài viết đã lưu"
                />
                <div>31/08/2005</div>
              </List.Item>
            ))}
          </List>
        </Card>
      </div>
    </div>
  );
};

export default Saves;
