`window.addEventListener` 和 `window.dispatchEvent` 是Web API中处理事件的核心方法，它们用于监听和触发自定义事件以及浏览器事件。

### window.addEventListener

`window.addEventListener` 方法用于将事件监听器添加到window对象上。当指定的事件在window对象上触发时，指定的回调函数会被执行。

#### 语法

```javascript
target.addEventListener(type, listener, options);
```

#### 参数

- `type`: 字符串，表示事件的类型，例如 `"click"`, `"load"`, `"error"` 等。
- `listener`: 当事件发生时，所要调用的函数。这个函数被称为事件处理程序（event handler）。
- `options` (可选): 一个指定有关 listener 属性的可选参数对象。可用的选项包括：
  - `capture`: 布尔值，表示 listener 是否会在捕获阶段触发，默认为 `false`。
  - `once`: 布尔值，表示 listener 在添加之后最多只调用一次。如果是 `true`，listener 在调用之后会自动移除。
  - `passive`: 布尔值，表示 listener 永远不会调用 `preventDefault()`。如果 listener 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。

#### 示例

```javascript
// 监听点击事件
window.addEventListener('click', function(event) {
  console.log('Window was clicked!');
}, false);
// 监听加载事件，且只监听一次
window.addEventListener('load', function(event) {
  console.log('Window finished loading!');
}, { once: true });
```

### window.dispatchEvent

`window.dispatchEvent` 方法用于触发window对象上的事件。这通常用于触发自定义事件，但也可以用于触发标准事件。

#### 语法

```javascript
target.dispatchEvent(event);
```

#### 参数

- `event`: 一个 Event 对象，描述了事件的类型和其他与事件相关的信息。

#### 示例

```javascript
// 创建一个新的事件
var event = new Event('build');
// 监听自定义事件
window.addEventListener('build', function (e) { 
  console.log('The build event has been triggered!');
}, false);
// 触发自定义事件
window.dispatchEvent(event);
```

在自定义事件的情况下，通常使用 `CustomEvent` 来传递更多的数据：

```javascript
// 创建一个带有detail的自定义事件
var customEvent = new CustomEvent('myevent', {
  detail: {
    username: 'user1'
  }
});
// 监听自定义事件
window.addEventListener('myevent', function (e) { 
  console.log('Custom event detail: ' + e.detail.username);
}, false);
// 触发自定义事件
window.dispatchEvent(customEvent);
```

### 注意事项

- `addEventListener` 不会覆盖已存在的事件处理程序。可以为同一事件添加多个监听器。
- 使用 `dispatchEvent` 触发事件时，事件必须至少有一个 `type` 属性，通常通过 `Event` 或 `CustomEvent` 构造函数来创建。
- 如果事件被设置为冒泡，那么它将沿着DOM树向上冒泡，除非它被 `event.stopPropagation()` 方法停止。
  这两个方法提供了灵活的事件处理机制，允许开发者自定义和控制页面的交互行为。
