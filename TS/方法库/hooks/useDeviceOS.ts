import { useState, useEffect } from "react";

function useDeviceOS() {
  const [deviceOS, setDeviceOS] = useState({ name: "desktop", id: 11 });
  function getDeviceOS() {
    const userAgent = navigator.userAgent;

    if (/android/i.test(userAgent)) {
      return { name: "android", id: 12 };
    }
    if (/iPad|iPhone|iPod|ios/i.test(userAgent)) {
      return { name: "ios", id: 13 };
    }
    return { name: "desktop", id: 11 };
  }

  useEffect(() => {
    setDeviceOS(getDeviceOS());
  }, []);

  return deviceOS;
}

export default useDeviceOS;
