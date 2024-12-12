
Node.js 的核心模块是指那些随 Node.js 安装包一起提供的模块，不需要通过 npm 安装即可使用。以下是一些核心模块及其常用 API 的概览，以及推荐的文档资源。
核心模块与常用 API

1. fs（文件系统）
   fs.readFile(path, callback)：异步读取文件。
   fs.readFileSync(path)：同步读取文件。
   fs.writeFile(file, data, callback)：异步写入文件。
   fs.writeFileSync(file, data)：同步写入文件。
   fs.stat(path, callback)：获取文件信息。
2. http（HTTP）
   http.createServer([options][, requestListener])：创建一个新的 HTTP 服务器。
   http.get(options, callback)：发送一个 HTTP GET 请求。
   http.request(options, callback)：发送一个 HTTP 请求。
3. https（HTTPS）
   https.createServer(options, requestListener)：创建一个安全的 HTTPS 服务器。
4. os（操作系统）
   os.type()：返回操作系统类型。
   os.hostname()：返回操作系统的主机名。
   os.freemem()：返回系统空闲内存量。
5. path（路径）
   path.join([...paths])：将所有给定的 path 片段连接到一起，并规范化结果路径。
   path.resolve([...paths])：将路径或路径片段的序列解析为绝对路径。
   path.basename(path[, ext])：返回路径的最后一部分。
6. url（网址）
   url.parse(urlString[, parseQueryString[, slashesDenoteHost]])：解析 URL 字符串。
   url.format(urlObject)：将 URL 对象转换为字符串。
7. events（事件）
   events.EventEmitter：用于处理事件的核心类。
   emitter.on(event, listener)：添加事件监听器。
   emitter.emit(event, [arg1], [arg2], [...])：触发事件。
8. buffer（缓冲区）
   Buffer.from(array)：创建一个新的 Buffer 实例。
   buffer.toString([encoding])：返回一个解码的字符串。
9. stream（流）
   stream.Readable：用于读取数据的流。
   stream.Writable：用于写入数据的流。
10. child_process（子进程）
    child_process.spawn(command[, args][, options])：异步地衍生子进程。
    child_process.exec(command[, options][, callback])：异步地衍生 shell 并执行命令。
    推荐文档
    Node.js 官方文档：这是最权威的资源，提供了详尽的 API 文档和指南。Node.js 官方文档([Index | Node.js v16.20.2 Documentation](https://nodejs.org/dist/latest-v16.x/docs/api/))
    MDN Web Docs：虽然主要针对浏览器 API，但 MDN 也提供了关于 Node.js 核心模块的文档。MDN Node.js 文档([Standard built-in objects - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects))
    npm 文档：虽然 npm 主要用于第三方模块，但有时也会包含一些核心模块的信息。npm 文档()
    在使用这些核心模块时，建议始终参考最新的官方文档，因为 Node.js 的 API 可能会随着版本更新而发生变化。
