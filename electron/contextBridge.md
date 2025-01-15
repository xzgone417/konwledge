`contextBridge` 是 Electron 提供的一个功能，用于在主进程和渲染进程之间安全地暴露 API。在 Electron 中，主进程和渲染进程是分离的，它们通过 IPC（Inter-Process Communication）进行通信。为了防止恶意代码访问敏感的 Electron API 或主进程功能，Electron 引入了 `contextBridge`。
`contextBridge` 的主要目的是在隔离的渲染进程中暴露一个安全的、定义良好的 API，这样渲染进程可以与主进程通信，而不会直接暴露 Electron 的内部实现。
以下是 `contextBridge` 的基本用法：

### 1. 在主进程中设置 `contextBridge`

在主进程中，你需要使用 `contextBridge` 来暴露你想要在渲染进程中访问的 API。以下是一个基本的例子：

```javascript
// 在主进程的 preload.js 文件中
const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electronAPI', {
  send: (channel, data) => {
    // whitelist channels
    let validChannels = ['toMain'];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    let validChannels = ['fromMain'];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender` 
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  }
});
```

在这个例子中，我们通过 `contextBridge.exposeInMainWorld` 方法暴露了一个名为 `electronAPI` 的对象，它有两个方法：`send` 和 `receive`，用于发送和接收消息。

### 2. 在渲染进程中使用 `contextBridge`

在渲染进程中，你可以直接通过 `window` 对象访问 `electronAPI`：

```javascript
// 在渲染进程的 JavaScript 文件中
window.electronAPI.send('toMain', 'some data');
window.electronAPI.receive('fromMain', (data) => {
  console.log(`Received ${data} from main process`);
});
```

### `contextBridge` 的所有用法

`contextBridge` 的用法主要集中在以下几个方面：

- **暴露方法**：通过 `exposeInMainWorld` 方法，你可以暴露函数、对象、甚至是异步函数。
- **限制访问**：你可以通过白名单或其他逻辑来限制哪些 IPC 通道可以被渲染进程访问。
- **数据验证**：在发送和接收数据时，可以添加验证逻辑来确保数据的完整性和安全性。
- **异步处理**：如果你需要处理异步操作，可以在暴露的方法中使用 Promise。
  以下是一些更高级的用法：

```javascript
contextBridge.exposeInMainWorld('advancedAPI', {
  asyncMethod: async (arg) => {
    return await someAsyncOperation(arg);
  },
  complexObject: {
    property: 'value',
    method: (arg) => {
      // Do something with arg
    }
  }
});
```

在使用 `contextBridge` 时，重要的是要确保只暴露必要的 API，并且始终对通过 IPC 传递的数据进行验证，以避免安全漏洞。
