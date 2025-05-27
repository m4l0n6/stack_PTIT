import React from "react";
import { Card, Divider, Row, Col, Flex, Form } from 'antd';

const PreferencesSetting: React.FC = () => {
    return (
        <>
            <h1 className="mb-4 font-bold text-2xl">Cài đặt giao diện</h1>
            <Divider />
            <Card title="Chủ đề" className="mb-4">
                <Form layout="vertical">
                    <Form.Item label="Chọn chủ đề">
                        <Row gutter={16}>
                            <Col span={8}>
                                <div className="bg-white shadow hover:shadow-lg p-4 rounded transition-shadow">
                                    <Flex className="h-full">
                                        <span className="text-center">Sáng</span>
                                    </Flex>
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className="bg-gray-800 shadow hover:shadow-lg p-4 rounded text-white transition-shadow">
                                    <Flex className="h-full">
                                        <span className="text-center">Tối</span>
                                    </Flex>
                                </div>
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item label="Ngôn ngữ">
                      
                    </Form.Item>

                    <Form.Item>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white transition-colors">
                            Lưu cài đặt
                        </button>
                    </Form.Item>
                </Form>
                
            </Card>
        </>
    )
}

export default PreferencesSetting;