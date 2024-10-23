TypeScript（TS）是 JavaScript 的一个超集，它为 JavaScript 添加了静态类型选项。TypeScript 自身提供了一些常用的 API 和工具类型，这些 API 和工具类型在开发过程中非常有用。以下是一些 TypeScript 中常用的 API 和工具类型：

### 1. 类型保护

- `typeof`: 用于检查一个变量的类型。
- `instanceof`: 用于检查一个实例是否属于某个类。

```typescript
function isString(test: any): test is string {
  return typeof test === 'string';
}
function example(value: any) {
  if (isString(value)) {
    console.log(value.toUpperCase()); // 类型为 string
  }
}
```

### 2. 类型推断

- `infer`: 在条件类型中使用，用于推断类型。

```typescript
type Flatten<T> = T extends Array<infer U> ? U : T;
```

### 3. 工具类型

- `Partial<T>`: 将类型 `T` 的所有属性转换为可选的。
- `Required<T>`: 将类型 `T` 的所有属性转换为必选的。
- `Readonly<T>`: 将类型 `T` 的所有属性转换为只读的。
- `Record<K, T>`: 创建一个对象类型，其键为 `K`，值为 `T`。
- `Pick<T, K>`: 从类型 `T` 中选取一组属性 `K`。
- `Omit<T, K>`: 从类型 `T` 中剔除一组属性 `K`。
- `Exclude<T, U>`: 从类型 `T` 中排除那些可以赋值给 `U` 的类型。
- `Extract<T, U>`: 提取 `T` 中可以赋值给 `U` 的类型。
- `NonNullable<T>`: 从类型 `T` 中排除 `null` 和 `undefined`。
- `ReturnType<T>`: 获取函数类型 `T` 的返回类型。
- `InstanceType<T>`: 获取构造函数类型 `T` 的实例类型。

```typescript
interface Person {
  name: string;
  age: number;
  location: string;
}
type PartialPerson = Partial<Person>;
type ReadonlyPerson = Readonly<Person>;
type PersonWithoutLocation = Omit<Person, 'location'>;
type PersonName = Pick<Person, 'name'>;
```

### 4. 泛型

- `Array<T>`: 表示一个元素类型为 `T` 的数组。
- `Promise<T>`: 表示一个解析为 `T` 的 Promise 对象。

```typescript
const names: Array<string> = ['Alice', 'Bob'];
const promise: Promise<number> = new Promise(resolve => resolve(42));
```

### 5. 装饰器

装饰器是一种特殊类型的声明，它能够被附加到类声明、方法、访问符、属性或参数上。装饰器使用 `@` 符号进行标记。

```typescript
function enumerable(value: boolean) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = value;
  };
}
class Greeter {
  @enumerable(false)
  greet() {
    return "Hello, world!";
  }
}
```

这些是 TypeScript 中一些常用的 API 和工具类型，它们可以帮助你编写更安全、更易于维护的代码。当然，TypeScript 的功能远不止这些，还包括模块、命名空间、枚举等许多其他特性。
