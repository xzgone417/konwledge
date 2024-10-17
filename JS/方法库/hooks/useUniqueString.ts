import { useState, useEffect } from "react";
import md5 from "blueimp-md5";
function useUniqueString() {
  const [uniqueString, setUniqueString] = useState("");
  const h5_sdk_i_mei = "h5sdkimei";

  // 获取浏览器支持的字体列表
  function getFonts() {
    let body = document.body;
    let style = document.createElement("style");
    style.type = "text/css";
    style.id = "font-detect";
    // 定义检测字体列表
    let fontsToDetect = ["Arial", "FontAwesome", "Comic Sans MS"];
    let detectedFonts = [];
    // 创建用于检测字体的div
    let div = document.createElement("div");
    div.id = "fonts";
    div.style.position = "absolute";
    div.style.visibility = "hidden";
    div.style.width = "auto";
    div.style.height = "auto";
    div.style.whiteSpace = "nowrap";
    body.appendChild(div);

    for (let i = 0; i < fontsToDetect.length; i++) {
      let font = fontsToDetect[i];
      let s = document.createElement("s");
      s.innerHTML = "xxxx";
      s.style.fontFamily = font + ",sans-serif";
      div.appendChild(s);
    }

    body.appendChild(style);

    // 使用@font-face规则检测字体
    for (let j = 0; j < fontsToDetect.length; j++) {
      let font = fontsToDetect[j];
      style.innerHTML +=
        '@font-face { font-family: "' +
        font +
        '"; src: url(https://example.com/nonexistent.eot); }';
      style.innerHTML +=
        "#fonts > s:nth-child(" +
        (j + 1) +
        ') { font-family: "' +
        font +
        '",sans-serif; font-size: 16px; }';
    }

    window.getComputedStyle(div.firstChild as any).fontFamily;
    detectedFonts = [];
    for (let k = 0; k < fontsToDetect.length; k++) {
      let detectedFont = window.getComputedStyle(
        div.childNodes[k] as any
      ).fontFamily;
      if (detectedFont.indexOf(fontsToDetect[k]) > -1) {
        detectedFonts.push(fontsToDetect[k]);
      }
    }

    body.removeChild(style);
    body.removeChild(div);

    return detectedFonts;
  }

  // 获取WebGL渲染器信息
  function getWebGLRenderer() {
    let canvas = document.createElement("canvas");
    let gl: any =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    let renderer = gl ? gl.getParameter(gl.RENDERER) : null;
    return renderer ? renderer.toString() : null;
  }

  // 获取Canvas指纹
  function getCanvasFingerprint() {
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    context!.font = "18pt Arial";
    context!.fillText("Hello, world!", 2, 15);
    return canvas.toDataURL();
  }
  function generateBrowserFingerprint() {
    let fingerprint = {} as any;
    // 获取用户代理字符串
    fingerprint.userAgent = navigator.userAgent;
    // 获取屏幕宽度和高度
    // fingerprint.screen = {
    //   width: screen.width,
    //   height: screen.height,
    // };
    // // 获取窗口大小
    // fingerprint.window = {
    //   width: window.innerWidth,
    //   height: window.innerHeight,
    // };
    // 获取字体列表
    // fingerprint.fonts = getFonts();
    // // 获取WebGL渲染器信息
    // fingerprint.webgl = getWebGLRenderer();
    // // 获取Canvas指纹
    // fingerprint.canvas = getCanvasFingerprint();
    // ... 可以继续添加其他指纹信息
    // 将指纹信息转化为字符串，便于存储和传输
    return JSON.stringify(fingerprint);
  }
  function setCookie(name: string, value: string, daysToLive: number) {
    let expires = "";
    if (daysToLive) {
      let date = new Date();
      date.setTime(date.getTime() + daysToLive * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
  function getCookie(name: string) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }
  function generateUniqueStringWithTimestampAndUUID() {
    // 获取浏览器指纹信息
    const fingerprintString = generateBrowserFingerprint();
    // 获取当前时间戳
    // const timestamp = Date.now().toString();
    // 生成一个UUID
    const uuid = crypto.randomUUID();
    // 将指纹信息、时间戳和UUID组合
    const combinedString = fingerprintString + uuid;

    // 使用MD5或其他哈希算法生成uniqueString
    const uniqueString = md5(combinedString);

    return uniqueString;
  }
  useEffect(() => {
    let readUniqueString = getCookie(h5_sdk_i_mei); // 读取名为"h5sdkimei"的Cookie的值
    let flag = false;
    if (readUniqueString) {
      setUniqueString(readUniqueString);
      //   uniqueString = readUniqueString;
      setCookie(h5_sdk_i_mei, uniqueString, 7); // 存储名为"h5sdkimei"的Cookie，值为"uniqueString"，有效期7天
    } else {
      //   readUniqueString = getLocalStorage(h5sdkimei); // 读取LocalStorage中的值
      readUniqueString = localStorage.getItem(h5_sdk_i_mei);
      if (readUniqueString) {
        const readUniqueJson = JSON.parse(readUniqueString); // 如果存储的是JSON字符串，需要解析为对象
        if (readUniqueJson.h5sdkimei) {
          //   uniqueString = readUniqueJson.h5sdkimei;
          setUniqueString(readUniqueJson.h5sdkimei);
          setCookie(h5_sdk_i_mei, uniqueString, 7); // 存储名为"h5sdkimei"的Cookie，值为"uniqueString"，有效期7天
        } else {
          flag = true;
        }
      } else {
        flag = true;
      }
    }
    //如果cookie 和 LocalStorage都没有取到设备 重新生成一个设备
    if (flag) {
      // 获取设备ID
      // let fingerprintString = generateBrowserFingerprint();
      // setUniqueString(md5(fingerprintString));
      setUniqueString(generateUniqueStringWithTimestampAndUUID);
      setCookie(h5_sdk_i_mei, uniqueString, 7); // 存储名为"h5sdkimei"的Cookie，值为"uniqueString"，有效期7天

      localStorage.setItem(
        h5_sdk_i_mei,
        JSON.stringify({ h5sdkimei: uniqueString })
      );
    }
  }, [uniqueString]);

  return uniqueString;
}

export default useUniqueString;
