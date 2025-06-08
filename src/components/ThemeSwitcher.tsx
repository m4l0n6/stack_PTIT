import React, { useState } from "react";
import { Button, Tooltip } from "antd";
import { BulbOutlined, SettingOutlined } from "@ant-design/icons";
import { useModel } from "umi";
import ModalThemeSetting from "./Modal/ModalThemeSetting";

const ThemeSwitcher: React.FC = () => {
  const { toggleTheme, theme } = useModel("theme");
  const [settingVisible, setSettingVisible] = useState(false);

  return (
    <>
      <div className="flex items-center space-x-2">
        <Tooltip title="Bật/Tắt chế độ tối">
          <Button
            type="text"
            icon={<BulbOutlined />}
            onClick={toggleTheme}
            className={theme === "dark" ? "text-yellow-400" : ""}
          />
        </Tooltip>
        <Tooltip title="Tùy chỉnh giao diện">
          <Button
            type="text"
            icon={<SettingOutlined />}
            onClick={() => setSettingVisible(true)}
          />
        </Tooltip>
      </div>
      <ModalThemeSetting
        visible={settingVisible}
        setVisible={setSettingVisible}
      />
    </>
  );
};

export default ThemeSwitcher;
