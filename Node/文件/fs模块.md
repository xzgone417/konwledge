以下是Node.js `fs`模块中一些常见的方法及其作用和参数说明：

### 异步方法

#### fs.access(path[, mode], callback)

- **作用**：检查文件是否存在，以及Node.js是否有权限对其进行操作。
- **参数**：
  - `path`：要检查的路径。
  - `mode`（可选）：权限位，可以是 `fs.constants.F_OK`（文件是否存在）、`fs.constants.R_OK`（文件是否可读）、`fs.constants.W_OK`（文件是否可写）、`fs.constants.X_OK`（文件是否可执行）。
  - `callback`：回调函数，带有可能的错误参数。

#### fs.appendFile(file, data[, options], callback)

- **作用**：将数据追加到文件的末尾，如果文件不存在则创建文件。
- **参数**：
  - `file`：文件名或文件描述符。
  - `data`：要追加的数据。
  - `options`（可选）：包含 `encoding`（默认为'utf8'）和 `mode`（默认为0o666）的属性。
  - `callback`：回调函数，带有可能的错误参数。

#### fs.writeFile(file, data[, options], callback)

- **作用**：将数据写入文件，如果文件已存在则覆盖文件。
- **参数**：
  - `file`：文件名或文件描述符。
  - `data`：要写入的数据。
  - `options`（可选）：包含 `encoding`（默认为'utf8'）、`mode`（默认为0o666）和 `flag`（默认为'w'）的属性。
  - `callback`：回调函数，带有可能的错误参数。

#### fs.readFile(path[, options], callback)

- **作用**：读取文件的全部内容。
- **参数**：
  - `path`：文件名或文件描述符。
  - `options`（可选）：包含 `encoding`（默认为null）、`flag`（默认为'r'）的属性。
  - `callback`：回调函数，带有可能的错误参数和文件内容。

#### fs.stat(path, callback)

- **作用**：获取文件的状态。
- **参数**：
  - `path`：文件名或文件描述符。
  - `callback`：回调函数，带有可能的错误参数和 `fs.Stats`对象。

#### fs.mkdir(path[, options], callback)

- **作用**：创建目录。
- **参数**：
  - `path`：要创建的目录路径。
  - `options`（可选）：包含 `recursive`（是否以递归方式创建所有必需的目录）和 `mode`（默认为0o777）的属性。
  - `callback`：回调函数，带有可能的错误参数。

#### fs.rmdir(path[, options], callback)

- **作用**：删除目录。
- **参数**：
  - `path`：要删除的目录路径。
  - `options`（可选）：包含 `recursive`（是否以递归方式删除目录及其所有子目录和文件）的属性。
  - `callback`：回调函数，带有可能的错误参数。

#### fs.readdir(path[, options], callback)

- **作用**：读取目录的内容。
- **参数**：
  - `path`：要读取的目录路径。
  - `options`（可选）：包含 `encoding`（默认为'utf8'）的属性。
  - `callback`：回调函数，带有可能的错误参数和目录内容的数组。

### 同步方法

同步方法与异步方法相似，但是它们会阻塞事件循环直到操作完成，并且没有回调函数，而是直接返回结果或抛出错误。
例如：

- `fs.readFileSync(path[, options])`：同步版本的 `fs.readFile`。
- `fs.writeFileSync(file, data[, options])`：同步版本的 `fs.writeFile`。
- `fs.existsSync(path)`：同步版本的 `fs.access`，用于检查文件是否存在。
  每个同步方法的参数与对应的异步方法相同，只是没有回调函数。
  这些方法涵盖了文件系统操作的基本功能，如读取、写入、创建、删除文件和目录，以及获取文件状态等。由于Node.js的 `fs`模块非常庞大，这里只列出了部分常见方法。完整的列表和详细文档可以在Node.js官方文档中找到。
