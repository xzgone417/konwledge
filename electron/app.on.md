Electron 的 `app` 模块是控制应用程序生命周期的事件模块。以下是一些 `app.on` 支持的事件（指令）：

1. `will-finish-launching` - 当应用程序完成基本的启动的时候被触发。
2. `ready` - 当 Electron 完成初始化时触发。
3. `window-all-closed` - 当所有的窗口都被关闭时触发。
4. `before-quit` - 在应用程序开始关闭窗口之前触发。
5. `will-quit` - 当所有窗口都已经关闭，且应用程序将退出时触发。
6. `quit` - 在应用程序退出时触发。
7. `open-file` 或 `open-url` - 当用户尝试打开一个文件或 URL 时触发。
8. `activate` - 当应用被激活时触发（通常在点击应用的坞站图标时）。
9. `browser-window-blur` - 当任何一个浏览器窗口失去焦点时触发。
10. `browser-window-focus` - 当任何一个浏览器窗口获得焦点时触发。
11. `browser-window-created` - 当创建一个新的浏览器窗口时触发。
12. `web-contents-created` - 当一个新的 webContents 被创建时触发。
13. `session-created` - 当 Electron 创建了一个新的 session 时触发。
14. `second-instance` - 当运行第二个实例时, 将会在此实例上触发该事件。
15. `render-process-gone` - 当渲染进程意外退出时触发。
16. `child-process-gone` - 当子进程意外退出时触发。
17. `browser-window-resized` - 当一个浏览器窗口被调整大小时触发。
18. `browser-window-moved` - 当一个浏览器窗口被移动时触发。
    这些事件可以让你控制应用程序的生命周期，响应用户的动作，以及处理窗口和进程的创建和销毁。你可以使用 `app.on` 方法来监听这些事件，如下所示：

```javascript
const { app } = require('electron');
app.on('ready', () => {
  // 应用程序已经准备好
});
app.on('window-all-closed', () => {
  // 所有窗口都已关闭
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  // 在 macOS 上，当点击 dock 图标并且没有其他窗口打开时，通常会重新创建一个窗口
});
```

请注意，这个列表并不全面，Electron 可能会随着版本更新而添加或移除某些事件。因此，最好查阅最新的 Electron 文档来获取完整的事件列表。
