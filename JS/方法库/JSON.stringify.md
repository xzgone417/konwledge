`JSON.stringify` 方法是JavaScript中用于将一个JavaScript值转换为JSON字符串的函数。这个方法接受三个参数，但通常只使用前两个参数。以下是各个参数及其作用：

1. `value`:
   - **必需**。需要转换成JSON字符串的JavaScript值（通常是一个对象或数组）。
2. `replacer`:
   - **可选**。这个参数可以是函数或者数组。
     - 如果 `replacer`是一个函数，则在序列化过程中，被序列化的每个属性都会经过这个函数的处理。函数接收两个参数，分别是键（key）和值（value），函数可以返回一个值，这个值将被序列化，或者返回 `undefined`来排除属性。
     - 如果 `replacer`是一个数组，那么 `JSON.stringify`将只序列化该数组中包含的属性名。
3. `space`:
   - **可选**。用于添加缩进、空格和换行符来美化输出的JSON字符串。
     - 如果 `space`是一个数字，则表示缩进的空格数。最大缩进空格数为10，超过10的值将视为10。
     - 如果 `space`是一个字符串（比如包含空格或制表符的字符串），则 `JSON.stringify`会在JSON字符串中的属性之间插入这个字符串。
     - 如果省略 `space`参数或者其值为 `null`或 `undefined`，则不会在JSON字符串中插入任何额外的空白。
       下面是一个简单的例子，展示了如何使用这三个参数：

```javascript
const obj = {
  name: "Alice",
  age: 30,
  details: {
    hobbies: ["reading", "games", "code"]
  }
};
// 只使用第一个参数
const simpleStringify = JSON.stringify(obj);
// 使用第二个参数为函数
const replacerFunction = JSON.stringify(obj, (key, value) => {
  if (key === "age") {
    return undefined; // 排除age属性
  }
  return value;
});
// 使用第二个参数为数组
const replacerArray = JSON.stringify(obj, ["name", "details.hobbies"]);
// 使用第三个参数为数字
const prettyPrint1 = JSON.stringify(obj, null, 2);
// 使用第三个参数为字符串
const prettyPrint2 = JSON.stringify(obj, null, "  ");
console.log(simpleStringify);
console.log(replacerFunction);
console.log(replacerArray);
console.log(prettyPrint1);
console.log(prettyPrint2);
```

在这个例子中，`simpleStringify`将输出没有格式化的JSON字符串，`replacerFunction`将排除 `age`属性，`replacerArray`将只包含 `name`和 `details.hobbies`属性，而 `prettyPrint1`和 `prettyPrint2`将输出格式化后的JSON字符串。
