import md5 from "blueimp-md5";
import { sdkInitConfig } from "./sofish-init";
export interface RequestConfigType {
  domain: string;
  url: string;
  lng: string;
  headers: Record<string, string>;
  secretKey: string;
  secretQuery: any;
}

export type ResponseHandlerType = {
  onError?: (data?: any) => any;
  onFinally?: (data?: any) => any;
  messageApi?: any;
  content?: string;
};

export const paramsSting = (params: any) => {
  const sortedParams = Object.keys(params)
    .sort()
    .reduce((result: any, key) => {
      result[key] = params[key];
      return result;
    }, {});

  const paramString = Object.keys(sortedParams)
    .map((key) => `${key}=${sortedParams[key]}`)
    .join("&");
  return paramString;
};

export function signParams(params: string, secretKey: string) {
  const paramStringSign = params + "&secretKey=" + secretKey;
  const signature = md5(paramStringSign).toUpperCase();
  return signature;
}

export function getTimestampManager() {
  let firstTimestamp: number | null = null;

  function getFirstTimestamp() {
    if (firstTimestamp === null) {
      firstTimestamp = Date.now();
    }
    return firstTimestamp;
  }

  function getNewTimestamp() {
    return Date.now();
  }

  return {
    getFirstTimestamp,
    getNewTimestamp,
  };
}

export const urlencodedFetch = async (
  _config: Partial<RequestConfigType> = {
    lng: "en",
    domain: "https://sf-api-manager.sofishgame.com",
    url: "",
    headers: {},
  },
  query: any,
  resHandler?: ResponseHandlerType
) => {
  const config = {
    lng: "en",
    domain: "https://sf-api-manager.sofishgame.com",
    url: "",
    ..._config,
  };
  let _headers = {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    "Accept-Language": config.lng,
    ..._config.headers,
  };
  try {
    const response = await fetch(config.domain + config.url, {
      method: "POST",
      headers: _headers,
      cache: "no-store",
      body: paramsSting(query),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    if (result?.code !== 0) {
      if (resHandler?.onError) resHandler.onError();
    }
    return result;
  } catch (err: any) {
    if (resHandler?.onError) resHandler.onError();
    return false;
  } finally {
    if (resHandler?.onFinally) resHandler.onFinally();
  }
};

//
export const signFetch = async (
  _config: Partial<RequestConfigType> = {
    lng: "en",
    domain: "https://api-server.sogamecdn.com",
    headers: {},
  },
  query: any,
  resHandler?: ResponseHandlerType
) => {
  const config = {
    lng: "en",
    domain: "https://api-server.sogamecdn.com",
    url: "",
    secretKey: "",
    ..._config,
  };
  const _timestamp = getTimestampManager().getNewTimestamp();
  const timezoneOffsetInHours = -(new Date().getTimezoneOffset() / 60);
  let _headers = {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    "Accept-Language": config.lng,
    deviceTime: _timestamp + "",
    zoneOffset: timezoneOffsetInHours + "",
    ..._config.headers,
  };
  const _query = {
    appID: sdkInitConfig.appID,
    timestamp: _timestamp,
    ...query,
  };
  let signature = "";
  signature = signParams(
    paramsSting(_query),
    config.secretKey || sdkInitConfig.secretKey
  );

  if (config?.secretQuery) {
    const once_secretQuery = {
      ...config.secretQuery,
      timestamp: _timestamp,
    };
    console.log(once_secretQuery, config.secretKey, "sss");
    signature = signParams(
      paramsSting(once_secretQuery),
      config.secretKey || sdkInitConfig.secretKey
    );
  }
  console.log(_query, "_qiuy");
  const once_query = paramsSting(_query) + "&sign=" + signature;
  try {
    const response = await fetch(config.domain + config.url, {
      method: "POST",
      headers: _headers,
      cache: "no-store",
      body: once_query,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    if (result?.code !== 0) {
      if (resHandler?.onError) {
        resHandler?.onError(result);
      } else {
        resHandler?.messageApi.open({
          type: "error",
          content: result?.msg || resHandler?.content || "Request Failure",
        });
      }
    }

    return result;
  } catch (err: any) {
    if (resHandler?.onError) {
      resHandler?.onError();
    } else {
      resHandler?.messageApi.open({
        type: "error",
        content: resHandler?.content || "Request Failure",
      });
    }
    return false;
  } finally {
    if (resHandler?.onFinally) resHandler.onFinally();
  }
};
