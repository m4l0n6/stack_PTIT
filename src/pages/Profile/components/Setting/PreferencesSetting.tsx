import React from "react";
import { Card, Divider, Row, Col, Flex, Form, Radio } from 'antd';

const PreferencesSetting: React.FC = () => {
    return (
      <>
        <h1 className="mb-4 font-bold text-2xl">Cài đặt giao diện</h1>
        <Divider />
        <Card title="Chủ đề" className="mb-4">
          <Form layout="vertical">
            <Form.Item label="Chọn chủ đề">
              <Radio.Group defaultValue="light">
                <Radio value="light">
                  <div className="bg-white shadow p-4 rounded-lg">
                    <p className="text-gray-800">Chủ đề sáng</p>
                  </div>
                </Radio>
                <Radio value="dark">
                  <div className="bg-gray-800 shadow p-4 rounded-lg text-white">
                    <p className="text-white">Chủ đề tối</p>
                  </div>
                </Radio>
                <Radio value="system">
                    <div className="bg-gray-200 shadow p-4 rounded-lg">
                        <p className="text-gray-800">Chủ đề theo hệ thống</p>
                    </div>
                </Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Card>
      </>
    );
}

export default PreferencesSetting;