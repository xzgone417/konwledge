// service-worker.js
var CACHE_VERSION = "1.0.0";
var CACHE_NAME = "1.0.0";
var CACHE_STALE_NAME = "1.0.0";
var CACHE_DOCUMENT = "1.0.0";
var CACHE_FIRST_NAME = "1.0.0";
var CACHE_DOC_NAME = "1.0.0";
var cacheAssets = ["index.html", "box.js", "body.css"];
// importScripts("./foo.js");
// 安装 Service Worker
// self.addEventListener("install", function (event) {
//   console.log("install事件");
//   self.skipWaiting(); //用来强制更新的servicework跳过等待时间

// });
self.addEventListener("install", (event) => {
  console.log("install事件");
  //用来强制更新的servicework跳过等待时间
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});
// 激活 Service Worker
// self.addEventListener("activate", (event) => {
//   console.log("activate事件");
//   var cacheWhitelist = [CACHE_NAME];
//   self.clients.claim(); // 保证 激活之后能够马上作用于所有的终端
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheWhitelist.indexOf(cacheName) === -1) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

// // 拦截网络请求并返回缓存
// // self.addEventListener("fetch", function (event) {
// //   console.log("Fetch intercepted for:", event.request.url);
// //   event.respondWith(
// //     caches.match(event.request).then(function (response) {
// //       return response || fetch(event.request);
// //     })
// //   );
// // });
// // 先用缓存同时更新缓存（频繁更换的资源：document, 外部依赖 js）
// function staleWhileRevalidateHandler(cacheResponse, event, name) {
//   const fetchResponse = fetch(event.request).then((networkResponse) =>
//     caches
//       .open(CACHE_STALE_NAME)
//       .then((cache) => {
//         // 存入缓存
//         cache.put(name, networkResponse.clone());
//         return networkResponse;
//       })
//       .catch(() => cacheResponse)
//   );

//   return cacheResponse || fetchResponse;
// }

// // 采用缓存优先的策略
// function cacheFirstHandler(cacheResponse, event) {
//   // 有缓存，就直接使用
//   if (cacheResponse) {
//     return cacheResponse;
//   }
//   // 没有缓存，再去请求服务端
//   return fetch(event.request).then((networkResponse) =>
//     caches
//       .open(CACHE_FIRST_NAME)
//       .then((cache) => {
//         // 存入缓存
          // const clonedResponse = networkResponse.clone();
          // clonedResponse.headers.append(
          //   "X-Cache-Expiration",
          //   cacheExpirationTime.toString()
          // );
          // cache.put(event.request, clonedResponse);
//         cache.put(event.request, networkResponse.clone());
//         return networkResponse;
//       })
//       .catch(() => cacheResponse)
//   );
// }

// // 拦截全部请求
// self.addEventListener("fetch", (event) => {
//   console.log("serviceWorker fetch request", event.request);
//   const { url, method } = event.request;
//   if (method === "POST" || !(url.indexOf("http") === 0)) {
//     return;
//   }

//   // document 处理
//   if (url.includes(CACHE_DOC_NAME)) {
//     event.respondWith(
//       caches.open(CACHE_STALE_NAME).then(() =>
//         caches.match(CACHE_DOCUMENT).then((cacheResponse) => {
//           return staleWhileRevalidateHandler(
//             cacheResponse,
//             event,
//             CACHE_DOCUMENT
//           );
//         })
//       )
//     );
//     return;
//   }

//   // 外部依赖 js 处理
//   if (CACHE_URL_LIST.find((val) => url.indexOf(val) > -1)) {
//     event.respondWith(
//       caches.open(CACHE_STALE_NAME).then(() =>
//         caches.match(event.request).then((cacheResponse) => {
//           return staleWhileRevalidateHandler(
//             cacheResponse,
//             event,
//             event.request
//           );
//         })
//       )
//     );
//     return;
//   }

//   // 静态资源类型处理 script, style, font
//   if (CACHE_FIRST_LIST.includes(event.request.destination)) {
//     event.respondWith(
//       caches.open(CACHE_FIRST_NAME).then(() =>
//         caches.match(event.request).then((cacheResponse) => {
//           return cacheFirstHandler(cacheResponse, event);
//         })
//       )
//     );
//     return;
//   }

//   const fetchEvent = fetch(event.request)
//     .then((response) => response)
//     .catch((err) => {
//       console.log(err);
//     });
//   event.respondWith(fetchEvent);
// });

// 通信
// self.addEventListener("message", (event) => {
//   console.log("页面传递过来的数据", event.data); // 收到主线程传递的信息
//   event.source.postMessage("this message is from sw.js to page"); // 向主线程传递信息
// });
// 卸载
// navigator.serviceWorker.getRegistrations().then(function (registrations) {
//   for (let registration of registrations) {
//     //安装在网页的service worker不止一个，找到我们的那个并删除
//     console.log(registration);
//     // if (registration && registration.scope === 'http://localhost:8080/') {
//     //   registration.unregister()
//     // }
//   }
// });

// 手动更新
// navigator.serviceWorker.ready.then((registration) => {
//   registration.update();
// });
