import { Card, List } from "antd";
import React from "react";

const Saves: React.FC = () => {
  return (
    <div>
      <h1 className="mb-2 text-2xl">Tất cả lưu trữ</h1>
      <div>
        <Card>
          <h1 className="mb-2 font-bold">Bài viết</h1>
          <List>
            {Array.from({ length: 5 }, (_, index) => (
              <List.Item key={index} className="hover:bg-[#f5f5f5]">
                <div className="bg-green-500 mr-2 rounded-lg w-12 h-8 text-white text-center">
                  5
                </div>
                <List.Item.Meta
                  title={<a href="#">Bài viết {index + 1}</a>}
                  description="Mô tả ngắn về bài viết"
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
