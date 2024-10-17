在JavaScript中，`apply`、`bind`和 `call`是 `Function.prototype`对象上的三个方法，它们都可以用来指定函数执行时的 `this`值。这三个方法非常有用，特别是在需要改变函数的上下文（即 `this`的指向）时。

### `Function.prototype.apply()`

`apply`方法允许你调用一个函数，并能够指定这个函数运行时的 `this`值以及参数（以数组的形式）。
**语法**：

```javascript
function.apply(thisArg, [argsArray])
```

- `thisArg`：在函数运行时使用的 `this`值。
- `[argsArray]`：一个数组或类数组对象，其中的元素将作为单独的参数传给函数。
  **示例**：

```javascript
function greet(name, greeting) {
  return `${greeting}, ${name}!`;
}
const person = {
  name: 'Alice'
};
const message = greet.apply(person, ['Hello', 'Alice']);
console.log(message); // 输出：Hello, Alice!
```

在这个例子中，`apply`方法将 `greet`函数的 `this`设置为 `person`对象，并传入一个参数数组 `['Hello', 'Alice']`。

### `Function.prototype.call()`

`call`方法的作用和 `apply`一样，也是用来指定函数运行时的 `this`值，但参数是逐个传递的，而不是以数组的形式。
**语法**：

```javascript
function.call(thisArg, arg1, arg2, ...)
```

- `thisArg`：在函数运行时使用的 `this`值。
- `arg1, arg2, ...`：指定的参数列表。
  **示例**：

```javascript
function greet(name, greeting) {
  return `${greeting}, ${name}!`;
}
const person = {
  name: 'Bob'
};
const message = greet.call(person, 'Hi', 'Bob');
console.log(message); // 输出：Hi, Bob!
```

在这个例子中，`call`方法将 `greet`函数的 `this`设置为 `person`对象，并传入两个参数 `'Hi'`和 `'Bob'`。

### `Function.prototype.bind()`

`bind`方法创建一个新的函数，当调用这个新函数时，`this`会被绑定到 `bind`方法指定的对象，并且可以预设一些参数。
**语法**：

```javascript
function.bind(thisArg, arg1, arg2, ...)
```

- `thisArg`：当绑定函数被调用时，该参数会作为 `this`的值。
- `arg1, arg2, ...`：当绑定函数被调用时，这些参数将先被填充。
  **示例**：

```javascript
function greet(greeting) {
  return `${greeting}, ${this.name}!`;
}
const person = {
  name: 'Charlie'
};
const boundGreet = greet.bind(person, 'Hello');
const message = boundGreet();
console.log(message); // 输出：Hello, Charlie!
```

在这个例子中，`bind`方法创建了一个新函数 `boundGreet`，这个新函数的 `this`被永久绑定到 `person`对象，并且预设了参数 `'Hello'`。
总结：

- `apply`和 `call`都会立即执行函数，而 `bind`会返回一个新的函数，需要手动调用。
- `apply`和 `call`的区别在于传递参数的形式不同：`apply`接受一个数组作为参数，而 `call`接受参数列表。
- `bind`可以预设函数的一些参数，并且返回一个新的函数，该函数可以稍后调用。
