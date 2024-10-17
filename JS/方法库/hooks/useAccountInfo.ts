import { useState, useEffect } from "react";

function useAccountInfo() {
  const [accountInfo, setAccountInfo] = useState({}) as any;
  const [accountInfoList, setAccountInfoList] = useState([]) as any[];
  const toSetLocalAccountInfo = (params: any) => {
    localStorage.setItem("accountInfo", JSON.stringify(params));
  };
  const toSetLocalAccountInfoList = (params: any) => {
    if (accountInfoList) {
      let haveAccount = accountInfoList.findIndex(
        (item: any) => item.uid === params.uid
      );
      if (haveAccount > -1) return;
    }
    localStorage.setItem(
      "accountInfoList",
      JSON.stringify([...accountInfoList, params])
    );
  };
  useEffect(() => {
    if (!(accountInfo && Object.keys(accountInfo)?.length > 0)) {
      setAccountInfo(JSON.parse(localStorage.getItem("accountInfo") + ""));
    }
  }, [accountInfo]);

  useEffect(() => {
    if (!(accountInfoList && accountInfoList?.length > 0)) {
      if (JSON.parse(localStorage.getItem("accountInfoList") + "")) {
        setAccountInfoList(
          JSON.parse(localStorage.getItem("accountInfoList")!)
        );
      }
    }
  }, [accountInfoList]);
  return {
    accountInfo: accountInfo,
    accountInfoList: accountInfoList,
    setAccountInfo: setAccountInfo,
    setAccountInfoList: setAccountInfoList,
    toSetLocalAccountInfo: toSetLocalAccountInfo,
    toSetLocalAccountInfoList: toSetLocalAccountInfoList,
  };
}

export default useAccountInfo;
