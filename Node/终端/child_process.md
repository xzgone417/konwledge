
下面是 Node.js `child_process` 模块中各个方法的示例代码，以及它们的使用说明：

### 1. exec

```javascript
const { exec } = require('child_process');
exec('ls -l', (error, stdout, stderr) => {
  if (error) {
    console.error(`执行出错: ${error}`);
    return;
  }
  console.log(`标准输出: ${stdout}`);
  console.error(`标准错误: ${stderr}`);
});
```

用途：执行一个shell命令并缓冲命令的输出。`exec` 适合于执行简单的命令，并获取命令的输出。

### 2. execFile

```javascript
const { execFile } = require('child_process');
execFile('ls', ['-l', '/usr'], (error, stdout, stderr) => {
  if (error) {
    console.error(`执行出错: ${error}`);
    return;
  }
  console.log(`标准输出: ${stdout}`);
  console.error(`标准错误: ${stderr}`);
});
```

用途：与 `exec` 类似，但直接执行特定的程序，不通过shell。这可以提高安全性，因为它不需要shell来解析命令。

### 3. execSync

```javascript
const { execSync } = require('child_process');
try {
  const output = execSync('ls -l');
  console.log(`标准输出: ${output}`);
} catch (error) {
  console.error(`执行出错: ${error}`);
}
```

用途：`exec` 的同步版本，它会阻塞Node.js的事件循环，直到命令执行完毕，并返回输出。

### 4. execFileSync

```javascript
const { execFileSync } = require('child_process');
try {
  const output = execFileSync('ls', ['-l', '/usr']);
  console.log(`标准输出: ${output}`);
} catch (error) {
  console.error(`执行出错: ${error}`);
}
```

用途：`execFile` 的同步版本，同步执行一个可执行文件，并返回输出。

### 5. spawn

```javascript
const { spawn } = require('child_process');
const ls = spawn('ls', ['-lh', '/usr']);
ls.stdout.on('data', (data) => {
  console.log(`标准输出: ${data}`);
});
ls.stderr.on('data', (data) => {
  console.error(`标准错误: ${data}`);
});
ls.on('close', (code) => {
  console.log(`子进程退出，退出码 ${code}`);
});
```

用途：启动一个新的进程，并与之交互。它不会缓冲输出，适合于处理大量数据。

### 6. fork

```javascript
const { fork } = require('child_process');
const child = fork('subprocess.js');
child.on('message', (msg) => {
  console.log('从子进程收到消息:', msg);
});
child.send({ hello: 'world' });
```

用途：用于创建一个新的Node.js进程。它是 `spawn` 的特殊形式，专门用于创建Node.js子进程。

### 7. spawnSync

```javascript
const { spawnSync } = require('child_process');
const output = spawnSync('ls', ['-l', '/usr']);
console.log(`标准输出: ${output.stdout}`);
console.error(`标准错误: ${output.stderr}`);
```

用途：`spawn` 的同步版本，它会阻塞Node.js的事件循环，直到子进程退出，并返回结果。

### 8. ChildProcess

`ChildProcess` 是一个类，通常不直接实例化，而是通过上述方法间接创建子进程。
这些方法可以根据不同的需求选择使用，例如执行外部程序、处理大量数据输出、同步或异步执行命令等。在选择方法时，应考虑是否需要缓冲输出、是否需要与子进程交互、是否需要同步执行等因素。
