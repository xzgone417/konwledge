`child_process` 模块允许Node.js进程启动子进程，并与它们进行交互。以下是 `child_process.spawn` 和 `child_process.exec` 方法返回的 `ChildProcess` 实例的一些常见属性：

### ChildProcess 属性

- `pid`: 子进程的进程标识符。
- `stdio`: 一个代表子进程stdio的管道数组。这可以用来重新映射子进程的stdio流。
- `stdout`: 一个可读流，表示子进程的标准输出。
- `stderr`: 一个可读流，表示子进程的标准错误。
- `stdin`: 一个可写流，表示子进程的标准输入。
- `channel`: 如果子进程是通过IPC通道创建的，则此属性是IPC通道的引用。
- `kill(signal)`: 方法，用于发送信号给子进程。
- `connected`: 布尔值，表示是否仍可以通过IPC与子进程通信。
- `exitCode`: 子进程退出时的代码，如果子进程尚未退出，则为null。
- `signalCode`: 子进程被终止时收到的信号代码。

### stdout 和 stderr 属性

`stdout` 和 `stderr` 都是 `Readable` 流的实例，它们具有以下属性和方法：

#### Readable 流的属性：

- `readable`: 布尔值，表示流是否可读。
- `readableHighWaterMark`: 流内部缓冲区的大小限制。
- `readableLength`: 当前缓冲区中的字节数。
- `readableFlowing`: 布尔值，表示流是否处于流动模式。

#### Readable 流的方法：

- `pipe(destination)`: 将数据传输到 `Writable` 流。
- `read([size])`: 从流中读取数据。
- `setEncoding(encoding)`: 设置流的默认编码。
- `pause()`: 暂停流。
- `resume()`: 恢复暂停的流。
- `isPaused()`: 检查流是否处于暂停状态。
- `unpipe([destination])`: 停止将数据传输到 `Writable` 流。
- `unshift(chunk)`: 将数据块推回流中。
- `wrap(stream)`: 将可读流转换为 `Readable`。

#### 事件：

- `'data'`: 当流中有数据可读时触发。
- `'end'`: 当没有更多数据可读时触发。
- `'error'`: 当在读取时发生错误时触发。
- `'close'`: 当流或其底层资源被关闭时触发。
- `'pause'`: 当流被暂停时触发。
- `'resume'`: 当流被恢复时触发。

### 示例

以下是一个使用 `child_process.spawn` 来启动一个子进程，并监听其 `stdout` 和 `stderr` 的示例：
typescript
const { spawn } = require('child_process');
// 启动一个子进程
const child = spawn('ls', ['-lh', '/usr']);
// 监听标准输出
child.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});
// 监听标准错误
child.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});
// 监听退出事件
child.on('close', (code) => {
  console.log(`子进程退出，退出码 ${code}`);
});
// 监听错误事件
child.on('error', (err) => {
  console.error(`子进程启动失败: ${err}`);
});
在这个例子中，我们启动了一个子进程来执行 `ls -lh /usr` 命令，并监听它的标准输出和标准错误。当子进程输出数据时，我们通过 `'data'` 事件处理函数将其打印到控制台。如果子进程退出，我们通过 `'close'` 事件来获取退出码。如果子进程启动失败，我们通过 `'error'` 事件来捕获错误。



在Node.js中，事件监听是通过 `EventEmitter`类实现的，该类是Node.js核心的一部分，用于处理事件和回调函数。`child_process`模块创建的子进程是 `EventEmitter`的实例，因此它们可以触发和监听事件。
以下是一些与子进程相关的重要事件及其如何被监听：

### 事件监听方法

- `.on(event, listener)`: 为指定事件添加一个监听器到监听器数组的末尾。当事件被触发时，所有监听器都会按顺序被调用。

### 常用的事件及其用途

- `'close'`: 当子进程的stdio流被关闭时触发。这意味着子进程已经结束，并且stdio流不再可读或可写。
- `'exit'`: 当子进程结束时触发，参数是退出码。
- `'error'`: 当发生错误时触发，例如无法启动子进程。
- `'disconnect'`: 当父进程或子进程调用 `.disconnect()`方法时触发，用于断开IPC通道。
- `'message'`: 当子进程使用 `process.send()`发送消息时触发。

### 如何监听事件结束

要监听子进程的结束，你可以监听 `'exit'`或 `'close'`事件。这两个事件之间的主要区别在于它们触发的时机：

- `'exit'`: 在子进程结束时立即触发，无论stdio流是否关闭。
- `'close'`: 在子进程的stdio流被关闭后触发。
  以下是如何监听这些事件的示例：
  typescript
  const { spawn } = require('child_process');
  // 启动子进程
  const child = spawn('ls', ['-lh', '/usr']);
  // 监听子进程退出事件
  child.on('exit', (code, signal) => {
  console.log(`子进程退出，退出码: ${code}`);
  if (signal) {
  console.log(`子进程被信号 ${signal} 终止`);
  }
  });
  // 监听子进程的stdio流关闭事件
  child.on('close', (code) => {
  console.log(`子进程的stdio流已关闭，退出码: ${code}`);
  });
  // 监听子进程的错误事件
  child.on('error', (err) => {
  console.error(`子进程启动失败: ${err}`);
  });
  在这个例子中，我们监听了 `'exit'`和 `'close'`事件。当子进程退出时，`'exit'`事件会立即触发，并提供退出码。如果子进程是被信号终止的，那么还会提供信号代码。之后，当所有stdio流都关闭时，`'close'`事件会被触发。
  请注意，在某些情况下，你可能只想监听这两个事件中的一个，具体取决于你的应用程序需求。如果你只关心子进程是否结束，而不关心stdio流的状态，那么监听 `'exit'`事件就足够了。如果你需要确保所有资源都被清理（例如，stdio流），则应该监听 `'close'`事件。
