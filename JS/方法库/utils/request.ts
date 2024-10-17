import md5 from "blueimp-md5";

export type ResponseHandlerType = {
  onSuccess: (params?: any) => any;
  onReadyStatus: (params?: any) => any;
  onStatusFail: (params?: any) => any;
  onCodeFail: (params?: any) => any;
};

export interface RequestConfigType {
  appID: any;
  uid: any;
  timestamp: any;
  secretKey: any;
  apiUrl: any;
  truthUrl: any;
  appVersion: any;
  sdkVersion: any;
  platformId: any;
  uniqueString: any;
  method: any;
  acceptLanguage: string;
}
export type RequestQueryType = Partial<{
  appID: any;
  timestamp: any;
  uid: any;
  deviceID: any;
  token: any;
  currentPage: any;
  pageSize: any;
  accountType: any;
  roleID: any;
  serverID: any;
  username: any;
  password: any;
  code: any;
  email: any;
  loginName: any;
  accountID: any;
  validType: any;
  extraData: any;
  channelID: any;
  oldAccountType: any;
  oldName: any;
  qid: any;
  qname: any;
  roleName: any;
  serverName: any;
  optionlist: any;
  giftID: any;
  productID: any;
  vip: any;
  appLang: any;
  price: any;
  currency: any;
  thirdPrice: any;
  thirdCurrency: any;
  payChannel: any;
  productName: any;
  productDesc: any;
  payCountry: any;
  cpOrderID: any;
  payNotifyUrl: any;
  extra: any;
}>;

function signParams(params: string, secretKey: string) {
  const paramStringSign = params + "&secretKey=" + secretKey;
  const signature = md5(paramStringSign).toUpperCase();
  return signature;
}
function paramsSting(params: {
  [x: string]: any;
  appID?: any;
  timestamp?: number;
  uid?: any;
  accountType?: any;
  roleID?: string;
  serverID?: string;
  username?: any;
  password?: string;
  code?: string;
  email?: any;
  deviceID?: string;
  token?: any;
  validType?: number;
  currentPage?: number;
  pageSize?: number;
  qid?: number;
}) {
  // 假设params是一个对象，键是参数名，值是参数值
  // 首先，将参数按键名排序
  const sortedParams = Object.keys(params)
    .sort()
    .reduce((result: any, key) => {
      result[key] = params[key];
      return result;
    }, {});
  // 然后，将排序后的参数拼接成一个字符串
  const paramString = Object.keys(sortedParams)
    .map((key) => `${key}=${sortedParams[key]}`)
    .join("&");

  return paramString;
}

export function sdkRequest(
  config: RequestConfigType,
  query: RequestQueryType,
  resHandler: ResponseHandlerType
) {
  const xhr = new XMLHttpRequest();
  const signature = signParams(paramsSting(query), config.secretKey);
  const once_query = paramsSting(query) + "&sign=" + signature;
  const { onSuccess, onStatusFail, onCodeFail, onReadyStatus } = resHandler;
  xhr.open(config.method, config.apiUrl + config.truthUrl, true);
  xhr.setRequestHeader(
    "Content-Type",
    "application/x-www-form-urlencoded;charset=utf-8"
  );
  xhr.setRequestHeader("appVersion", config.appVersion);
  xhr.setRequestHeader("sdkVersion", config.sdkVersion);
  xhr.setRequestHeader("platformId", config.platformId);
  xhr.setRequestHeader("appID", config.appID);
  xhr.setRequestHeader("deviceID", config.uniqueString);
  xhr.setRequestHeader("Accept-Language", config.acceptLanguage);
  xhr.setRequestHeader("deviceTime", Date.now() + "");
  const timezoneOffsetInHours = -(new Date().getTimezoneOffset() / 60);
  xhr.setRequestHeader("zoneOffset", timezoneOffsetInHours + "");
  onReadyStatus(xhr);
  xhr.send(once_query);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var responseData = JSON.parse(xhr.responseText);
        if (responseData.code == 0) {
          onSuccess(responseData);
        } else {
          onCodeFail(responseData);
        }
      } else {
        onStatusFail(xhr);
      }
    }
  };
}
