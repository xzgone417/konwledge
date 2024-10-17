数组：
for in 返回index        for of返回item

对象
只有for in   返回key  ，然后根据key从对象拿value ；object[key]

在JavaScript中，`for...in`和 `for...of`是两种用于迭代对象和数组的循环结构，但它们的工作方式和用途有所不同。

### for...in 循环

`for...in`循环用于遍历对象的可枚举属性，包括原型链上的可枚举属性。

```javascript
const obj = { a: 1, b: 2, c: 3 };
for (const key in obj) {
  console.log(key); // 输出 'a', 'b', 'c'
}
```

注意：

- `for...in`循环遍历的是对象的键（key），而不是值（value）。
- `for...in`循环会遍历对象的所有可枚举属性，包括原型链上的属性。通常在循环中使用 `hasOwnProperty`方法来过滤掉原型链上的属性。

```javascript
for (const key in obj) {
  if (obj.hasOwnProperty(key)) {
    console.log(key); // 只输出对象自身的属性
  }
}
```

### for...of 循环

`for...of`循环用于遍历可迭代对象（如数组、字符串、Map、Set等）的值。

```javascript
const array = [1, 2, 3];
for (const value of array) {
  console.log(value); // 输出 1, 2, 3
}
```

注意：

- `for...of`循环直接遍历的是对象的值（value），而不是键（key）。
- `for...of`循环不会遍历对象的属性名，而是遍历对象的值。因此，它不能直接用于普通对象，除非对象实现了 `Symbol.iterator`方法。
  如果你想要使用 `for...of`来遍历对象属性，你可以使用 `Object.keys()`、`Object.values()`或 `Object.entries()`来获取对象的键、值或键值对数组，然后再进行遍历。

```javascript
for (const [key, value] of Object.entries(obj)) {
  console.log(key, value); // 输出 'a' 1, 'b' 2, 'c' 3
}
```

总结来说，`for...in`用于遍历对象的键，而 `for...of`用于遍历可迭代对象的值。选择使用哪个循环取决于你想要迭代的是对象的键还是值。
