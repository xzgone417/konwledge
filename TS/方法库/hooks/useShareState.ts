// hooks/useSharedState.js
import { useState, useEffect } from "react";

// 自定义 Hook，使用 localStorage 存储并获取数据
export function useSharedState(key: string, defaultValue: any = "") {
  const [shareData, setShareData] = useState(() => {
    // 初始化时从 localStorage 中读取数据
    if (typeof window !== "undefined") {
      const storedValue = sessionStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : defaultValue;
    }
    return defaultValue;
  });

  // 当 value 改变时，更新 sessionStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(key, JSON.stringify(shareData));
    }
  }, [key, shareData]);

  return [shareData, setShareData];
}
