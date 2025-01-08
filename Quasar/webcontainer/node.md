WebContainers 是一个由 Fermyon Spinspark 提供的技术，它允许开发者在浏览器中运行完整的 Node.js 应用程序。WebContainers 使用 WebAssembly 和 Web Workers 在浏览器中模拟 Node.js 环境。
由于 WebContainers 旨在模拟 Node.js 环境，理论上它应该支持大多数 Node.js 核心模块和 API。然而，并不是所有的 Node.js API 都能在浏览器中完美运行，因为浏览器环境和服务器环境有很大的不同，例如，浏览器无法直接访问文件系统。
以下是一些可以在 WebContainers 中使用的 Node.js 方法（模块和API）：

1. `Buffer`
2. `console`
3. `process`
4. `setTimeout` 和 `setInterval`
5. `clearTimeout` 和 `clearInterval`
6. `setImmediate` 和 `clearImmediate`
7. `require`（用于加载模块，但只能是浏览器兼容的模块）
8. `module` 和 `exports`
9. `global`
10. `__dirname` 和 `__filename`
11. `URL` 和 `url`
12. `querystring`
13. `events`
14. `http` 和 `https`
15. `net`
16. `dgram`（可能有限制）
17. `stream`
18. `crypto`
19. `zlib`
20. `util`
21. `path`（可能有限制，因为无法直接访问文件系统）
22. `os`（部分功能，如 `os.platform` 和 `os.arch`）
23. `assert`
24. `tty`
25. `vm`
26. `fs/promises`（可能有限制，因为无法直接访问文件系统）
    需要注意的是，虽然上述方法可能在 WebContainers 中可用，但它们的行为可能会有所不同，以适应浏览器的安全限制。例如，文件系统访问通常是通过一个虚拟化的文件系统实现的，该系统与本地文件系统的功能和权限有所不同。
    此外，由于 WebContainers 技术不断发展，具体支持哪些 Node.js 方法可能会随着时间而变化。因此，最好的做法是查阅最新的官方文档或直接在 WebContainers 环境中进行测试，以确认哪些方法可用。
