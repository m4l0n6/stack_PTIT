import { Switch } from "antd";
import { useModel } from "umi";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useModel("theme");

  return (
    <Switch
      checked={theme === "dark"}
      onChange={toggleTheme}
      checkedChildren="🌙"
      unCheckedChildren="☀️"
    />
  );
};

export default ThemeSwitcher;
