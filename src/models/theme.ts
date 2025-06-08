import { useState, useEffect } from "react";
import { message } from "antd";

export default function useTheme() {
  // Khởi tạo theme từ localStorage hoặc mặc định là 'light'
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem("theme") || "light";
  });

  // Khởi tạo fontSize từ localStorage hoặc mặc định là 'medium'
  const [fontSize, setFontSize] = useState<string>(() => {
    return localStorage.getItem("fontSize") || "medium";
  });

  // Cập nhật theme trong localStorage khi thay đổi
  useEffect(() => {
    localStorage.setItem("theme", theme);
    // Cập nhật class trên body để áp dụng theme
    document.body.className = theme === "dark" ? "dark-theme" : "light-theme";
  }, [theme]);

  // Cập nhật fontSize trong localStorage khi thay đổi
  useEffect(() => {
    localStorage.setItem("fontSize", fontSize);
    // Cập nhật font size trên html để áp dụng kích thước chữ
    document.documentElement.setAttribute("data-font-size", fontSize);
  }, [fontSize]);

  // Chuyển đổi theme giữa light và dark
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    message.success(
      `Đã chuyển sang giao diện ${
        newTheme === "light" ? "sáng" : "tối"
      }`
    );
  };

  // Thay đổi font size
  const changeFontSize = (size: string) => {
    if (["small", "medium", "large"].includes(size)) {
      setFontSize(size);
      message.success(
        `Đã thay đổi kích thước chữ: ${
          size === "small" ? "Nhỏ" : size === "medium" ? "Vừa" : "Lớn"
        }`
      );
    }
  };

  return {
    theme,
    fontSize,
    setTheme,
    setFontSize,
    toggleTheme,
    changeFontSize,
  };
}
