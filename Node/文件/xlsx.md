在 Node.js 中读取 Excel 文件并将数据存储到一个变量中，可以使用 `xlsx` 库。以下是一个示例代码，展示了如何读取 Excel 文件并将数据存储到一个变量中：

1. 首先，确保你已经安装了 `xlsx` 库。如果没有安装，可以使用以下命令进行安装：
   <pre><pre class="hljs language-bash"><div class="code-title"><div class="code-language">bash</div><div class="code-tools"><div class="code-action"><span class="icon"></span><span>复制代码</span></div></div></div><code>npm install xlsx
   </code></pre></pre>
2. 然后，使用以下代码读取 Excel 文件并将数据存储到一个变量中：
   <pre><pre class="hljs language-javascript"><div class="code-title"><div class="code-language">javascript</div><div class="code-tools"><div class="code-action"><span class="icon"></span><span>复制代码</span></div></div></div><code>const XLSX = require('xlsx');

   // 指定Excel文件的路径
   const sourceFilePath = 'path/to/your/file.xlsx';

   // 读取Excel文件
   const workbook = XLSX.readFile(sourceFilePath);

   // 获取第一个工作表的名称
   const sheetName = workbook.SheetNames[0];

   // 获取第一个工作表的数据
   const worksheet = workbook.Sheets[sheetName];

   // 将工作表数据转换为JSON格式
   const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

   // 打印数据
   console.log(data);

   // 现在你可以将数据存储到一个变量中，用于后续操作
   const excelData = data;

   // 示例：遍历数据
   excelData.forEach(row => {
     console.log(row);
   });
   </code></pre></pre>

在这个示例中，我们首先使用 `XLSX.readFile` 读取 Excel 文件，然后获取第一个工作表的名称和数据。接着，使用 `XLSX.utils.sheet_to_json` 将工作表数据转换为 JSON 格式，并将其存储在 `excelData` 变量中。你可以根据需要对 `excelData` 进行后续操作。

### 详细步骤说明

1. **读取Excel文件** ：

<pre><pre class="hljs language-javascript"><div class="code-title"><div class="code-language">javascript</div><div class="code-tools"><div class="code-action"><span class="icon"></span><span>复制代码</span></div></div></div><code>const workbook = XLSX.readFile(sourceFilePath);
   </code></pre></pre>

   这行代码读取指定路径的 Excel 文件，并返回一个工作簿对象。

1. **获取工作表名称** ：

<pre><pre class="hljs language-javascript"><div class="code-title"><div class="code-language">javascript</div><div class="code-tools"><div class="code-action"><span class="icon"></span><span>复制代码</span></div></div></div><code>const sheetName = workbook.SheetNames[0];
   </code></pre></pre>

   这行代码获取工作簿中的第一个工作表的名称。

1. **获取工作表数据** ：

<pre><pre class="hljs language-javascript"><div class="code-title"><div class="code-language">javascript</div><div class="code-tools"><div class="code-action"><span class="icon"></span><span>复制代码</span></div></div></div><code>const worksheet = workbook.Sheets[sheetName];
   </code></pre></pre>

   这行代码获取指定名称的工作表数据。

1. **将工作表数据转换为JSON格式** ：

<pre><pre class="hljs language-javascript"><div class="code-title"><div class="code-language">javascript</div><div class="code-tools"><div class="code-action"><span class="icon"></span><span>复制代码</span></div></div></div><code>const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
   </code></pre></pre>

   这行代码将工作表数据转换为 JSON 格式，并将其存储在 `data` 变量中。`{ header: 1 }` 选项表示将第一行作为表头。

1. **存储数据到变量中** ：

<pre><pre class="hljs language-javascript"><div class="code-title"><div class="code-language">javascript</div><div class="code-tools"><div class="code-action"><span class="icon"></span><span>复制代码</span></div></div></div><code>const excelData = data;
   </code></pre></pre>

   这行代码将转换后的数据存储到 `excelData` 变量中。

通过这种方式，你可以将 Excel 文件中的数据读取并存储到一个变量中，以便在后续操作中使用。

「tokens: 662, speed: 14.07 tokens/s」

// 获取第一个工作表的名称 const sheetName = workbook.SheetNames[0];

// 获取第一个工作表的数据 const worksheet = workbook.Sheets[sheetName];

// 将工作表数据转换为JSON格式 const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); 改成遍历多个工作表，并且sheet_to_json中的参数是什么意思？header有什么用，除了header还有其他参数吗?

要遍历多个工作表并将每个工作表的数据转换为 JSON 格式，可以使用 `XLSX.utils.sheet_to_json` 函数的 `header` 参数。`header` 参数用于指定表头的处理方式。以下是一个示例代码，展示了如何遍历多个工作表并将每个工作表的数据存储到一个变量中：

<pre><pre class="hljs language-javascript"><div class="code-title"><div class="code-language">javascript</div><div class="code-tools"><div class="code-action"><span class="icon"></span><span>复制代码</span></div></div></div><code>const XLSX = require('xlsx');

// 指定Excel文件的路径
const sourceFilePath = 'path/to/your/file.xlsx';

// 读取Excel文件
const workbook = XLSX.readFile(sourceFilePath);

// 遍历所有工作表
workbook.SheetNames.forEach(sheetName => {
  // 获取工作表数据
  const worksheet = workbook.Sheets[sheetName];

  // 将工作表数据转换为JSON格式
  const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

  // 打印数据
  console.log(`Data from sheet ${sheetName}:`, data);

  // 现在你可以将数据存储到一个变量中，用于后续操作
  const excelData = data;

  // 示例：遍历数据
  excelData.forEach(row => {
    console.log(row);
  });
});
</code></pre></pre>

在这个示例中，我们使用 `workbook.SheetNames.forEach` 遍历所有工作表，并对每个工作表执行以下操作：

1. **获取工作表数据** ：

<pre><pre class="hljs language-javascript"><div class="code-title"><div class="code-language">javascript</div><div class="code-tools"><div class="code-action"><span class="icon"></span><span>复制代码</span></div></div></div><code>const worksheet = workbook.Sheets[sheetName];
   </code></pre></pre>

   这行代码获取指定名称的工作表数据。

1. **将工作表数据转换为JSON格式** ：

<pre><pre class="hljs language-javascript"><div class="code-title"><div class="code-language">javascript</div><div class="code-tools"><div class="code-action"><span class="icon"></span><span>复制代码</span></div></div></div><code>const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
   </code></pre></pre>

   这行代码将工作表数据转换为 JSON 格式，并将其存储在 `data` 变量中。`{ header: 1 }` 选项表示将第一行作为表头。

### `header` 参数的用途

* **`header: 1`** ：将第一行作为表头，并将数据存储为二维数组。每一行是一个数组，表头作为数组的第一个元素。
* **`header: A`** ：将第一行作为表头，并将数据存储为对象数组。每一行是一个对象，表头作为对象的属性名。
* **`header: [1, 2, 3]`** ：将指定的行作为表头，并将数据存储为二维数组。每一行是一个数组，表头作为数组的第一个元素。
* **`header: false`** ：不使用表头，将数据存储为二维数组。每一行是一个数组。

### 其他参数

除了 `header` 参数外，`XLSX.utils.sheet_to_json` 还有其他一些常用的参数：

* **`raw`** ：是否将单元格的原始值返回。默认值为 `false`。
* **`defval`** ：如果单元格为空或未定义，返回的默认值。默认值为 `undefined`。
* **`blankrows`** ：是否包含空行。默认值为 `true`。
* **`dateNF`** ：日期格式字符串。默认值为 `null`。
* **`cellDates`** ：是否将日期格式的单元格转换为 JavaScript 日期对象。默认值为 `false`。
* **`sheet`** ：指定要转换的工作表名称或索引。

通过这些参数，你可以根据需要自定义数据转换的行为。
