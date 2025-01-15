`fs-extra` 是一个 Node.js 的模块，它是原生 `fs`（文件系统）模块的增强版。`fs-extra` 提供了所有 `fs` 模块的方法，并且增加了额外的实用方法，这些方法在日常文件操作中非常有用，比如复制文件和目录、递归创建目录、删除目录等。
以下是 `fs-extra` 的一些主要用法和功能：

1. **复制文件和目录**：
   - `copy(src, dest, [options], callback)`
   - `copySync(src, dest, [options])`
     示例：

   ```javascript
   const fs = require('fs-extra');
   // 异步复制文件
   fs.copy('source.txt', 'destination.txt', err => {
     if (err) return console.error(err);
     console.log('文件复制成功！');
   });
   // 同步复制文件
   fs.copySync('source.txt', 'destination.txt');
   ```
2. **递归创建目录**：
   - `mkdirs(dir, [options], callback)`
   - `mkdirsSync(dir, [options])`
     示例：

   ```javascript
   // 异步递归创建目录
   fs.mkdirs('/tmp/some/long/path', err => {
     if (err) return console.error(err);
     console.log('目录创建成功！');
   });
   // 同步递归创建目录
   fs.mkdirsSync('/tmp/another/long/path');
   ```
3. **删除目录**：
   - `remove(dir, callback)`
   - `removeSync(dir)`
     示例：

   ```javascript
   // 异步删除目录（包括所有子目录和文件）
   fs.remove('/tmp/some/long/path', err => {
     if (err) return console.error(err);
     console.log('目录删除成功！');
   });
   // 同步删除目录
   fs.removeSync('/tmp/another/long/path');
   ```
4. **确保路径存在**：
   - `ensureFile(file, callback)`
   - `ensureFileSync(file)`
   - `ensureDir(dir, [options], callback)`
   - `ensureDirSync(dir, [options])`
     示例：

   ```javascript
   // 确保文件存在（如果不存在则创建）
   fs.ensureFile('file.txt', err => {
     if (err) return console.error(err);
     console.log('文件确保存在！');
   });
   // 确保目录存在（如果不存在则创建）
   fs.ensureDir('/tmp/ensure', err => {
     if (err) return console.error(err);
     console.log('目录确保存在！');
   });
   ```
5. **读取文件信息**：
   - `stat(path, callback)`
   - `statSync(path)`
     示例：

   ```javascript
   // 异步读取文件信息
   fs.stat('file.txt', (err, stats) => {
     if (err) return console.error(err);
     console.log(`文件大小: ${stats.size}`);
   });
   // 同步读取文件信息
   const stats = fs.statSync('file.txt');
   console.log(`文件大小: ${stats.size}`);
   ```

`fs-extra` 还提供了其他一些有用的方法，比如 `move`（移动文件或目录）、`outputFile`（写入文件，如果目录不存在则创建）、`readJson` 和 `writeJson`（读取和写入 JSON 文件）等。这些方法使得文件操作更加简单和直观。在使用 `fs-extra` 之前，需要通过 npm 安装它：

```bash
npm install fs-extra
```
