以下是两个使用 `postMessage` 在父页面和 `<iframe>` 之间模拟 Electron 的 `ipcMain` 和 `ipcRenderer` 通信和数据交互的例子。

### 例子 1: 父页面向 `<iframe>` 发送消息

#### 父页面代码

```html
<!-- 父页面 HTML -->
<iframe id="myIframe" src="iframe.html"></iframe>
<script>
  // 父页面 JavaScript
  const iframe = document.getElementById('myIframe');
  // 当 iframe 加载完成后发送消息
  iframe.onload = function() {
    iframe.contentWindow.postMessage('Hello from parent!', '*');
  };
  // 监听来自 iframe 的消息
  window.addEventListener('message', (event) => {
    if (event.origin === 'http://example.com') {
      console.log('Received message from iframe:', event.data);
    }
  });
</script>
```

#### `<iframe>` 代码

```html
<!-- iframe.html -->
<script>
  // iframe JavaScript
  window.addEventListener('message', (event) => {
    if (event.origin === 'http://example.com') {
      console.log('Received message from parent:', event.data);
      // 回复父页面
      event.source.postMessage('Hello from iframe!', event.origin);
    }
  });
</script>
```

### 例子 2: `<iframe>` 向父页面发送消息

#### 父页面代码

```html
<!-- 父页面 HTML -->
<iframe id="myIframe" src="iframe.html"></iframe>
<script>
  // 父页面 JavaScript
  window.addEventListener('message', (event) => {
    if (event.origin === 'http://example.com') {
      console.log('Received message from iframe:', event.data);
      // 可以在这里处理消息并回复 iframe
    }
  });
</script>
```

#### `<iframe>` 代码

```html
<!-- iframe.html -->
<script>
  // iframe JavaScript
  // 当 iframe 准备好后，向父页面发送消息
  window.onload = function() {
    window.parent.postMessage('Hello from iframe!', '*');
  };
  // 监听来自父页面的消息
  window.addEventListener('message', (event) => {
    if (event.origin === 'http://example.com') {
      console.log('Received message from parent:', event.data);
    }
  });
</script>
```

在这两个例子中，我们使用了 `postMessage` 来发送消息，并通过监听 `message` 事件来接收消息。注意，出于安全考虑，应该检查 `event.origin` 来确保消息来源是可信的，而不是简单地使用 `'*'`。此外，在实际应用中，你可能需要处理跨域问题，确保 `iframe` 的源与父页面属于同一个域，或者正确设置 `CORS`。
