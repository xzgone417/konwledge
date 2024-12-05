`HttpStatus` 是 Spring 框架中的一个枚举，它定义了标准的 HTTP 状态码及其描述。HTTP 状态码分为以下几类：
- 信息响应（1xx）
- 成功响应（2xx）
- 重定向（3xx）
- 客户端错误（4xx）
- 服务器错误（5xx）
以下是 `HttpStatus` 中定义的所有状态码及其含义：
### 信息响应（1xx）
- `HttpStatus.CONTINUE` (100): 服务器收到了请求的初始部分，客户端应该继续发送请求。
- `HttpStatus.SWITCHING_PROTOCOLS` (101): 服务器正在根据客户端的请求切换协议。
- `HttpStatus.PROCESSING` (102): 服务器已经收到并正在处理请求，但没有响应可用。
### 成功响应（2xx）
- `HttpStatus.OK` (200): 请求成功，并返回了请求的资源。
- `HttpStatus.CREATED` (201): 请求成功，并且创建了新的资源。
- `HttpStatus.ACCEPTED` (202): 请求已被接受处理，但处理尚未完成。
- `HttpStatus.NON_AUTHORITATIVE_INFORMATION` (203): 请求成功，但返回的信息可能来自缓存或非原始源。
- `HttpStatus.NO_CONTENT` (204): 请求成功，但没有返回任何内容。
- `HttpStatus.RESET_CONTENT` (205): 请求成功，客户端应该重置视图。
- `HttpStatus.PARTIAL_CONTENT` (206): 请求成功，但只返回了部分资源。
- `HttpStatus.MULTI_STATUS` (207): WebDAV 扩展状态码，表示多个状态码可能在响应体中返回。
- `HttpStatus.ALREADY_REPORTED` (208): WebDAV 扩展状态码，表示订阅已经报告且不需要再次报告。
- `HttpStatus.IM_USED` (226): WebDAV 扩展状态码，表示请求的资源已经在其位置使用。
### 重定向（3xx）
- `HttpStatus.MULTIPLE_CHOICES` (300): 请求的资源有多个位置，用户可以选择一个。
- `HttpStatus.MOVED_PERMANENTLY` (301): 请求的资源已永久移动到新位置。
- `HttpStatus.FOUND` (302): 请求的资源现在临时位于另一个 URI。
- `HttpStatus.SEE_OTHER` (303): 服务器发送了一个不同的 URI，客户端应该从该位置获取资源。
- `HttpStatus.NOT_MODIFIED` (304): 资源未修改，可以使用缓存版本。
- `HttpStatus.USE_PROXY` (305): 请求的资源只能通过代理访问。
- `HttpStatus.TEMPORARY_REDIRECT` (307): 请求的资源现在临时位于另一个 URI。
- `HttpStatus.PERMANENT_REDIRECT` (308): 请求的资源已永久移动到新位置。
### 客户端错误（4xx）
- `HttpStatus.BAD_REQUEST` (400): 请求格式错误，服务器无法理解。
- `HttpStatus.UNAUTHORIZED` (401): 请求需要用户认证。
- `HttpStatus.FORBIDDEN` (403): 服务器理解请求，但拒绝执行。
- `HttpStatus.NOT_FOUND` (404): 服务器找不到请求的资源。
- `HttpStatus.METHOD_NOT_ALLOWED` (405): 请求的方法不允许。
- `HttpStatus.NOT_ACCEPTABLE` (406): 服务器无法生成符合客户端要求的响应。
- `HttpStatus.PROXY_AUTHENTICATION_REQUIRED` (407): 请求需要代理认证。
- `HttpStatus.REQUEST_TIMEOUT` (408): 请求超时。
- `HttpStatus.CONFLICT` (409): 请求与服务器上的资源状态冲突。
- `HttpStatus.GONE` (410): 请求的资源不再可用。
- `HttpStatus.LENGTH_REQUIRED` (411): 服务器拒绝处理没有定义 Content-Length 的请求。
- `HttpStatus.PRECONDITION_FAILED` (412): 服务器不满足请求的先决条件。
- `HttpStatus.PAYLOAD_TOO_LARGE` (413): 请求实体过大，服务器拒绝处理。
- `HttpStatus.REQUEST_URI_TOO_LONG` (414): 请求的 URI 过长，服务器拒绝处理。
- `HttpStatus.UNSUPPORTED_MEDIA_TYPE` (415): 请求的媒体类型不受支持。
- `HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE` (416): 请求的范围无效或无法满足。
- `HttpStatus.EXPECTATION_FAILED` (417): 服务器无法满足期望请求头。
- `HttpStatus.I_AM_A_TEAPOT` (418): 这是一个 April Fools' joke（愚人节玩笑）。
- `HttpStatus.MISDIRECTED_REQUEST` (421): 请求被定向到了无法生成响应的服务器。
- `HttpStatus.UNPROCESSABLE_ENTITY` (422): 请求格式正确，但无法处理。
- `HttpStatus.LOCKED` (423): 当前资源被锁定。
- `HttpStatus.FAILED_DEPENDENCY` (424): 由于之前的请求失败，请求失败。
-
