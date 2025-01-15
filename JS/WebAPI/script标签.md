`<script>` 标签的 `crossorigin` 属性可以有以下两个值：

1. `anonymous`：
   - 发起一个不带认证信息（如 cookies 或 HTTP 认证信息）的跨源请求。
   - 如果服务器没有返回正确的 CORS 响应头，则脚本不会被加载。
2. `use-credentials`：
   - 发起一个带有认证信息的跨源请求。
   - 服务器必须返回带有 `Access-Control-Allow-Credentials: true` 的 CORS 响应头，并且 `Access-Control-Allow-Origin` 不能设置为 `*`。
     只填写 `crossorigin` 不写等号和值的话，默认值是 `anonymous`。这意味着浏览器会尝试以匿名方式加载脚本，不会发送认证信息。
     不添加该属性的情况：

- 如果不添加 `crossorigin` 属性，那么脚本可以正常加载，但是如果脚本是从不同源加载的，浏览器将不会发送认证信息。
- 如果脚本与页面同源，则无论是否添加 `crossorigin` 属性，脚本都会正常加载。
- 如果脚本是从不同源加载的，并且服务器没有设置适当的 CORS 响应头，那么即使没有 `crossorigin` 属性，脚本也可能因为同源策略而被阻止加载。
  总结：
- `crossorigin`（默认为 `anonymous`）：发起不带认证信息的跨源请求。
- `crossorigin="anonymous"`：明确指定发起不带认证信息的跨源请求。
- `crossorigin="use-credentials"`：发起带认证信息的跨源请求。
- 不添加 `crossorigin` 属性：不会特别处理跨源请求，不会发送认证信息，但脚本可能会根据同源策略和服务器配置被加载或被阻止。
