import { Card, List, Tag, Row, Col } from "antd";
import React from "react";


const Activity: React.FC = () => {
  return (
    <div className="gap-4 grid grid-cols-2">
      <Card title="Câu trả lời">
        <List>
          {Array.from({ length: 3 }, (_, index) => (
            <List.Item key={index} className="hover:bg-[#f5f5f5]">
              <div className="flex justify-center items-center bg-green-500 mr-2 rounded-lg w-12 h-8 text-white">
                <div>5</div>
              </div>
              <List.Item.Meta title={<a href="#">Câu trả lời {index + 1}</a>} />
              <div>31/08/2005</div>
            </List.Item>
          ))}
        </List>
      </Card>

      <Card title="Câu hỏi">
        <List>
          {Array.from({ length: 3 }, (_, index) => (
            <List.Item key={index} className="hover:bg-[#f5f5f5]">
              <div className="flex justify-center items-center bg-green-500 mr-2 rounded-lg w-12 h-8 text-white">
                <div>5</div>
              </div>
              <List.Item.Meta title={<a href="#">Câu trả lời {index + 1}</a>} />
              <div>31/08/2005</div>
            </List.Item>
          ))}
        </List>
      </Card>

      <Card title="Thẻ">
        <List>
          {Array.from({ length: 3 }, (_, index) => (
            <List.Item key={index} className="hover:bg-[#f5f5f5]">
              <Tag color="blue">Thẻ {index + 1}</Tag>
              <div className="flex items-center">
                <div className="font-bold text-xl">{index + 1}</div>
                <div>Câu hỏi</div>
              </div>
            </List.Item>
          ))}
        </List>
      </Card>

      <Card title="Danh tiếng">Chưa có danh tiếng</Card>
    </div>
  );
};

export default Activity;
