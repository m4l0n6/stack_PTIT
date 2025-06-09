import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Space, Typography, Popconfirm, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, TagOutlined } from "@ant-design/icons";
import { useModel } from "umi";

const { Title } = Typography;

const Tags: React.FC = () => {
  const tagModel = useModel('tag');
  const { tags: modelTags, fetchTags, loading } = tagModel;
  const [tags, setTags] = useState(modelTags);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingTag, setEditingTag] = useState<any>(null);
  const [form] = Form.useForm();

  // Đồng bộ tags khi modelTags thay đổi (khi fetchTags)
  React.useEffect(() => {
    setTags(modelTags);
  }, [modelTags]);

  // Thêm tag
  const handleAdd = () => {
    setIsEdit(false);
    setEditingTag(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  // Sửa tag
  const handleEdit = (tag: any) => {
    setIsEdit(true);
    setEditingTag(tag);
    form.setFieldsValue(tag);
    setIsModalVisible(true);
  };

  // Xóa tag
  const handleDelete = async (id: number) => {
    // Gọi API xóa tag ở đây (mock)
    message.success('Đã xóa tag!');
    fetchTags();
  };

  // Lưu tag (thêm/sửa)
  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (isEdit && editingTag) {
        const updatedTags = tags.map((t: any) =>
          t.id === editingTag.id ? { ...t, ...values } : t
        );
        setTags(updatedTags);
        message.success('Đã cập nhật tag!');
        setIsModalVisible(false);
      } else {
        // Thêm tag mới vào state
        const nextId = tags.length > 0 ? Math.max(...tags.map((t: any) => t.id)) + 1 : 1;
        setTags([...tags, { ...values, id: nextId, count: 0 }]);
        message.success('Đã thêm tag mới!');
        setIsModalVisible(false);
      }
    } catch (err) {}
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 60,
    },
    {
      title: 'Tên tag',
      dataIndex: 'name',
      render: (text: string) => <span><TagOutlined /> {text}</span>,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      render: (text: string) => text || <span className="text-gray-400">(Không có)</span>,
    },
    {
      title: 'Số câu hỏi',
      dataIndex: 'count',
      width: 120,
      render: (count: number) => count || 0,
    },
    {
      title: 'Hành động',
      key: 'actions',
      width: 140,
      render: (_: any, record: any) => (
        <Space>
          <Button icon={<EditOutlined />} size="small" onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Popconfirm title="Xác nhận xóa tag này?" onConfirm={() => handleDelete(record.id)} okText="Xóa" cancelText="Hủy">
            <Button danger icon={<DeleteOutlined />} size="small">Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ width: '100%', minHeight: '100vh', margin: 0, padding: 12, overflowX: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, maxWidth: 1400, marginLeft: 'auto', marginRight: 'auto' }}>
        <Title level={3} style={{ margin: 0 }}>Quản lý tag</Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>Thêm tag</Button>
      </div>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <Table
          dataSource={tags}
          columns={columns}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 5 }}
          bordered
          scroll={{ x: true }}
        />
      </div>
      <Modal
        open={isModalVisible}
        title={isEdit ? 'Sửa tag' : 'Thêm tag mới'}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleOk}
        okText={isEdit ? 'Cập nhật' : 'Thêm mới'}
        cancelText="Hủy"
        destroyOnClose
      >
        <Form form={form} layout="vertical" preserve={false}>
          <Form.Item name="name" label="Tên tag" rules={[{ required: true, message: 'Nhập tên tag!' }]}> 
            <Input placeholder="Tên tag" />
          </Form.Item>
          <Form.Item name="description" label="Mô tả">
            <Input.TextArea placeholder="Mô tả tag (không bắt buộc)" rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Tags;
