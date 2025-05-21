import React, { useState } from 'react';
import { Form, Input, Button, Select, message, Card } from 'antd';
import { useModel, history } from 'umi';

const { TextArea } = Input;
const { Option } = Select;

const QuestionCreatePage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      console.log('Question values:', values);
      setTimeout(() => {
        message.success('Question submitted successfully!');
        history.push('/questions');
      }, 1000);
    } catch (error) {
      console.error('Error submitting question:', error);
      message.error('Failed to submit question');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Đặt câu hỏi" className="shadow-sm">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ tags: [] }}
      >
        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[
            { required: true, message: 'Vui lòng nhập tiêu đề câu hỏi' },
            { min: 10, message: 'Tiêu đề phải có ít nhất 10 ký tự' }
          ]}
        >
          <Input placeholder="Ví dụ: Làm thế nào để tạo một chương trình Java đơn giản?" />
        </Form.Item>

        <Form.Item
          label="Nội dung"
          name="body"
          rules={[
            { required: true, message: 'Vui lòng nhập nội dung câu hỏi' },
            { min: 30, message: 'Nội dung phải có ít nhất 30 ký tự' }
          ]}
        >
          <TextArea
            rows={10}
            placeholder="Mô tả chi tiết câu hỏi của bạn. Nêu rõ vấn đề, những gì bạn đã thử và kết quả mong muốn."
          />
        </Form.Item>

        <Form.Item
          label="Tags"
          name="tags"
          rules={[
            { required: true, message: 'Vui lòng chọn ít nhất một tag' }
          ]}
        >
          <Select
            mode="tags"
            placeholder="Thêm tags liên quan (tối đa 5)"
            maxTagCount={5}
          >
            <Option value="java">Java</Option>
            <Option value="python">Python</Option>
            <Option value="javascript">JavaScript</Option>
            <Option value="c#">C#</Option>
            <Option value="c++">C++</Option>
            <Option value="react">React</Option>
            <Option value="angular">Angular</Option>
            <Option value="vue">Vue</Option>
            <Option value="database">Database</Option>
            <Option value="sql">SQL</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Đăng câu hỏi
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default QuestionCreatePage;