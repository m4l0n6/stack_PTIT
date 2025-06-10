import { useState, useEffect } from "react";
import { useModel } from "umi";
import { message } from "antd";
import { addTag, updateTag, deleteTag } from '@/services/Tags';

export default () => {
  const tagModel = useModel('tag');
  const { tags: modelTags, fetchTags, loading } = tagModel;
  const [tags, setTags] = useState(modelTags);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingTag, setEditingTag] = useState<any>(null);

  useEffect(() => {
    setTags(modelTags);
  }, [modelTags]);

  const handleAdd = (form: any) => {
    setIsEdit(false);
    setEditingTag(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (tag: any, form: any) => {
    setIsEdit(true);
    setEditingTag(tag);
    form.setFieldsValue(tag);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTag(id);
      message.success('Đã xóa tag!');
      fetchTags();
    } catch (err) {
      message.error('Xóa tag thất bại!');
    }
  };

  const handleOk = async (form: any) => {
    try {
      const values = await form.validateFields();
      if (isEdit && editingTag) {
        await updateTag(editingTag.id, values);
        message.success('Đã cập nhật tag!');
      } else {
        await addTag(values);
        message.success('Đã thêm tag mới!');
      }
      setIsModalVisible(false);
      fetchTags();
    } catch (err) {
      message.error('Thao tác thất bại!');
    }
  };

  return {
    tags,
    setTags,
    isModalVisible,
    setIsModalVisible,
    isEdit,
    setIsEdit,
    editingTag,
    setEditingTag,
    handleAdd,
    handleEdit,
    handleDelete,
    handleOk,
    fetchTags,
    loading,
  };
}
