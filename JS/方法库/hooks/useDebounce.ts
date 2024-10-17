import { useState, useEffect } from "react";

export default function useDebounce(callback: any, delay: number) {
  const [timeoutId, setTimeoutId] = useState(null) as any;

  const debouncedFunction = (...args: any) => {
    // 清除之前的定时器
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // 设置新的定时器
    const id = setTimeout(() => {
      callback(...args);
    }, delay);

    setTimeoutId(id);
  };

  // 清除定时器以避免内存泄漏
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return debouncedFunction;
}
