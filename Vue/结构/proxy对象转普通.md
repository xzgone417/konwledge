在Vue 3中，`ref` 用于创建一个响应式的数据源，它返回的是一个带有`.value`属性的对象，这个`.value`属性是响应式的。如果你想将一个由 `ref` 定义的响应式对象转换成普通对象，或者将一个由 `ref` 对象组成的数组转换成普通对象数组，你可以通过直接访问 `.value` 属性来实现。
以下是如何进行转换的示例：
```javascript
import { ref } from 'vue';
// 创建一个 ref 对象
const refObject = ref({
  name: 'Vue',
  version: 3
});
// 创建一个由 ref 对象组成的数组
const refArray = ref([refObject]);
// 将 ref 对象转换为普通对象
const plainObject = refObject.value;
// 将由 ref 对象组成的数组转换为普通对象数组
const plainArray = refArray.value.map(refItem => refItem.value);
```
在这个例子中：
- `refObject.value` 获取了 `refObject` 中存储的普通对象。
- `refArray.value.map(refItem => refItem.value)` 遍历了 `refArray` 数组，并使用每个 `ref` 对象的 `.value` 属性来获取对应的普通对象，从而创建了一个新的普通对象数组。
这样，`plainObject` 就是一个普通的JavaScript对象，而 `plainArray` 就是一个由普通对象组成的数组。这些普通对象和数组将不再具有响应性，所以任何对它们的修改都不会触发Vue的更新机制。


在Vue 3中，`reactive` 函数用于创建一个响应式的对象，它返回的是一个Proxy对象。如果你想将一个由 `reactive` 定义的响应式Proxy对象转换成普通对象，你可以使用 `toRaw` 函数。`toRaw` 是Vue提供的工具函数，它可以从响应式Proxy对象中返回原始的普通对象。
以下是如何使用 `toRaw` 将Proxy对象转换为普通对象的示例：
```javascript
import { reactive, toRaw } from 'vue';
// 创建一个响应式的Proxy对象
const proxyObject = reactive({
  name: 'Vue',
  version: 3
});
// 将Proxy对象转换为普通对象
const plainObject = toRaw(proxyObject);
console.log(plainObject); // 输出普通对象，与proxyObject结构相同，但不是响应式的
```
在这个例子中，`toRaw(proxyObject)` 将 `proxyObject` 转换回了原始的普通对象 `plainObject`。这个普通对象与原始响应式Proxy对象具有相同的结构和数据，但它不再具有响应性，所以对它的修改不会触发视图更新。
请注意，`toRaw` 函数只能用于由 `reactive` 或 `ref` 创建的响应式对象。如果你尝试对一个非响应式对象或由 `ref` 创建的对象使用 `toRaw`，它将不会返回原始对象，而是返回该对象本身。对于 `ref` 对象，你可以直接访问 `.value` 属性来获取普通值。
