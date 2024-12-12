
在 Electron 中，`app.requestSingleInstanceLock()` 是一个方法，用于确保应用程序的单一实例运行。在应用程序启动时，你可以调用这个方法来检查是否已经有一个实例在运行。如果返回 `true`，则当前实例是唯一的，可以继续启动；如果返回 `false`，则已经有一个实例在运行，并且通常你应该直接退出当前实例。
以下是如何使用 `app.requestSingleInstanceLock()` 的示例：

```javascript
const { app } = require('electron');
function createWindow() {
  // 创建浏览器窗口的代码
}
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  // 如果无法获取单实例锁，则退出
  app.quit();
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // 当运行第二个实例时, 将会聚焦到 mainWindow 这个窗口
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
  // 创建 mainWindow, 加载应用的其余部分等等...
  app.whenReady().then(createWindow);
}
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  // 在 macOS 上，当点击 dock 图标并且没有其他窗口打开时，通常会重新创建一个窗口
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
```

在这个例子中，如果 `app.requestSingleInstanceLock()` 返回 `false`，则应用程序会立即退出。如果返回 `true`，则应用程序会继续运行，并且会设置一个 `second-instance` 事件监听器。如果尝试启动第二个实例，Electron 会激活 `second-instance` 事件，并且你可以决定如何处理它，例如将焦点切换回已经打开的窗口。
请注意，`requestSingleInstanceLock()` 方法仅在应用程序准备就绪（即 `app.on('ready', ...)`）之前调用才有效。如果你在应用程序准备就绪之后调用它，它将始终返回 `false`。
