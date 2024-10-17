import { useState, useEffect } from "react";

function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(document.documentElement.clientWidth);
    const handleResize = () => {
      setWindowWidth(document.documentElement.clientWidth);
    };

    // 添加 resize 事件监听器
    window.addEventListener("resize", handleResize);

    // 组件卸载时移除事件监听器
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // 空依赖数组确保只在挂载和卸载时执行

  return windowWidth;
}

export default useWindowWidth;
