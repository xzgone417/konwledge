import { useEffect, useState } from "react";

const useDisableScroll = () => {
  const [shouldDisable, setShouldDisable] = useState(false);
  useEffect(() => {
    if (shouldDisable) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // 清理函数，组件卸载或shouldDisable改变时恢复滚动
    return () => {
      document.body.style.overflow = "";
    };
  }, [shouldDisable]);
  return { setShouldDisable };
};

export default useDisableScroll;
