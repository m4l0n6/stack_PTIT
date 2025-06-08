import React from 'react';
import { Modal, Button, Radio, Space, Divider, Switch } from 'antd';
import { useModel } from 'umi';
import { BgColorsOutlined, FontSizeOutlined } from '@ant-design/icons';

interface ModalThemeSettingProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const ModalThemeSetting: React.FC<ModalThemeSettingProps> = ({ 
  visible, 
  setVisible 
}) => {
  const { theme, fontSize, setTheme, changeFontSize } = useModel('theme');

  // Lưu các tùy chọn giao diện
  const handleSave = () => {
    setVisible(false);
  };

  return (
    <Modal
      title="Tùy chỉnh giao diện"
      open={visible}
      footer={[
        <Button key="cancel" onClick={() => setVisible(false)}>
          Hủy
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Lưu thay đổi
        </Button>,
      ]}
      onCancel={() => setVisible(false)}
      width={400}
    >
      <div className="flex flex-col gap-4">
        <div>
          <Space align="center" className="mb-2">
            <BgColorsOutlined />
            <span className="font-semibold">Chế độ hiển thị</span>
          </Space>
          
          <Radio.Group
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full"
          >
            <Space direction="vertical" className="w-full">
              <Radio.Button value="light" className="flex items-center py-2 pl-4 w-full">
                <div className="flex justify-between items-center w-full">
                  <span>Sáng</span>
                  <span className="bg-white border border-gray-200 rounded-full w-6 h-6"></span>
                </div>
              </Radio.Button>
              <Radio.Button value="dark" className="flex items-center py-2 pl-4 w-full">
                <div className="flex justify-between items-center w-full">
                  <span>Tối</span>
                  <span className="bg-gray-800 border border-gray-700 rounded-full w-6 h-6"></span>
                </div>
              </Radio.Button>
            </Space>
          </Radio.Group>
        </div>

        <Divider className="my-2" />

        <div>
          <Space align="center" className="mb-2">
            <FontSizeOutlined />
            <span className="font-semibold">Kích thước chữ</span>
          </Space>
          
          <Radio.Group
            value={fontSize}
            onChange={(e) => changeFontSize(e.target.value)}
            className="w-full"
          >
            <Space direction="vertical" className="w-full">
              <Radio.Button value="small" className="flex items-center py-2 pl-4 w-full">
                <div className="flex justify-between items-center w-full">
                  <span>Nhỏ</span>
                  <span className="text-xs">Aa</span>
                </div>
              </Radio.Button>
              <Radio.Button value="medium" className="flex items-center py-2 pl-4 w-full">
                <div className="flex justify-between items-center w-full">
                  <span>Vừa</span>
                  <span className="text-base">Aa</span>
                </div>
              </Radio.Button>
              <Radio.Button value="large" className="flex items-center py-2 pl-4 w-full">
                <div className="flex justify-between items-center w-full">
                  <span>Lớn</span>
                  <span className="text-lg">Aa</span>
                </div>
              </Radio.Button>
            </Space>
          </Radio.Group>
        </div>
      </div>
    </Modal>
  );
};

export default ModalThemeSetting;