
`zlib` 是 Node.js 中的一个核心模块，它提供了使用 Gzip 和 Deflate/Inflate 压缩算法的功能。`zlib` 可以用来压缩或解压缩数据流。以下是一些 `zlib` 模块中常用的 API 及其用途：

### 常用的 `zlib` 类和方法

1. **zlib.createGzip([options])**:
   - 创建一个 Gzip 流。
2. **zlib.createGunzip([options])**:
   - 创建一个解压 Gzip 流的流。
3. **zlib.createDeflate([options])**:
   - 创建一个 Deflate 流。
4. **zlib.createInflate([options])**:
   - 创建一个解压 Deflate 流的流。
5. **zlib.createDeflateRaw([options])**:
   - 创建一个 DeflateRaw 流，不添加 zlib 头。
6. **zlib.createInflateRaw([options])**:
   - 创建一个解压 DeflateRaw 流的流。
7. **zlib.createUnzip([options])**:
   - 创建一个流，可以解压 Gzip 或 Deflate 压缩的数据。
8. **zlib.gzip(buffer[, options], callback)**:
   - 压缩一个 Buffer 或字符串。
9. **zlib.gunzip(buffer[, options], callback)**:
   - 解压一个 Gzip 压缩的 Buffer。
10. **zlib.deflate(buffer[, options], callback)**:
    - 压缩一个 Buffer 或字符串。
11. **zlib.inflate(buffer[, options], callback)**:
    - 解压一个 Deflate 压缩的 Buffer。
12. **zlib.deflateRaw(buffer[, options], callback)**:
    - 压缩一个 Buffer 或字符串，不添加 zlib 头。
13. **zlib.inflateRaw(buffer[, options], callback)**:
    - 解压一个 DeflateRaw 压缩的 Buffer。
14. **zlib.unzip(buffer[, options], callback)**:
    - 解压一个 Gzip 或 Deflate 压缩的 Buffer。

### 选项（options）

每个方法都可以接受一个可选的 `options` 对象，该对象可以包含以下属性：

- `flush`: 控制刷新模式（默认为 `zlib.constants.Z_NO_FLUSH`）。
- `finishFlush`: 控制结束时的刷新模式（默认为 `zlib.constants.Z_FINISH`）。
- `chunkSize`: 用于压缩的内部缓冲区大小（默认为 16*1024）。
- `windowBits`: 基础压缩窗口大小（默认为 15）。
- `level`: 压缩级别（0-9，默认为 6）。
- `memLevel`: 内存使用级别（1-9，默认为 8）。
- `strategy`: 压缩策略（默认为 `zlib.constants.Z_DEFAULT_STRATEGY`）。

### 用法示例

压缩字符串：

```javascript
const zlib = require('zlib');
const input = 'Hello, world!';
zlib.gzip(input, (err, buffer) => {
  if (!err) {
    console.log(buffer);
  }
});
```

解压字符串：

```javascript
const zlib = require('zlib');
const input = Buffer.from('...'); // 假设这是压缩后的数据
zlib.gunzip(input, (err, buffer) => {
  if (!err) {
    console.log(buffer.toString());
  }
});
```

使用流来压缩文件：

```javascript
const fs = require('fs');
const zlib = require('zlib');
const gzip = zlib.createGzip();
const inp = fs.createReadStream('input.txt');
const out = fs.createWriteStream('input.txt.gz');
inp.pipe(gzip).pipe(out);
```

以上只是 `zlib` 模块的部分功能，它还提供了更多高级功能和选项。在 Node.js 文档中可以找到更详细的 `zlib` 模块信息。
