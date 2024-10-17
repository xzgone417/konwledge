// import CryptoJS from "crypto-js";

export function decodeJwtResponse(token: any) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export async function decryptAES(ciphertext: any, key: any, iv: any) {
  const decrypted = await CryptoJS.AES.decrypt(
    { ciphertext: CryptoJS.enc.Base64.parse(ciphertext) },
    CryptoJS.enc.Utf8.parse(key),
    { iv: CryptoJS.enc.Utf8.parse(iv) }
  );

  const decryptedStr = decrypted
    .toString(CryptoJS.enc.Utf8)
    .replace(/[\u0000-\u001F\u007F-\u009F]+/g, "")
    .trim();

  return decryptedStr;
}
