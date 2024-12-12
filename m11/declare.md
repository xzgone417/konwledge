### `declare` 关键字

#### 用途

`declare` 关键字用于告诉TypeScript编译器某个变量、函数、类或接口已经存在，但其实现不是在当前文件中。这主要用于以下场景：

- 为全局变量或全局函数提供类型定义。
- 为非TypeScript文件（如纯JavaScript库）提供类型信息。

#### 使用场景

- 当你在使用第三方JavaScript库时，但没有对应的 `.d.ts`类型声明文件。
- 当你在全局范围内定义了某些变量或函数，而这些变量或函数在TypeScript文件中不可见。

#### 使用方法

```typescript
// 声明一个全局变量
declare var myGlobalVariable: string;
// 声明一个全局函数
declare function myGlobalFunction(): void;
// 声明一个全局类
declare class MyClass {
  constructor();
  myMethod(): void;
}
```

### `declare module` 语法

#### 用途

`declare module` 用于声明一个模块的类型定义，这通常用于为模块化的代码提供类型信息，或者扩展模块的类型定义。

#### 使用场景

- 当你需要为某个模块（如第三方库）提供类型定义。
- 当你需要扩展某个模块的类型定义，比如添加新的导出成员。

#### 使用方法

```typescript
// 声明一个模块的类型定义
declare module 'myModule' {
  export function myFunction(): void;
  export class MyClass {
    constructor();
    myMethod(): void;
  }
}
// 扩展一个模块的类型定义
declare module 'someExistingModule' {
  export let newProperty: string;
  export function newFunction(): void;
}
```

### 区别

- **范围**：`declare` 用于单个实体（如变量、函数、类），而 `declare module` 用于整个模块。
- **结构**：`declare` 直接跟随实体名称，而 `declare module` 需要指定模块名称，并在大括号内提供模块的类型定义。
- **目的**：`declare` 用于声明单个实体，而 `declare module` 用于声明或扩展模块的类型定义。

### 实际应用示例

#### 使用 `declare`

假设你正在使用一个全局的JavaScript库，它提供了一个全局函数 `myGlobalFunction`。

```typescript
// 在一个声明文件中，例如 globalLib.d.ts
declare function myGlobalFunction(): void;
// 在你的TypeScript文件中
myGlobalFunction(); // 现在具有类型检查
```

#### 使用 `declare module`

假设你正在使用一个名为 `myModule` 的第三方模块，并且需要为它提供类型定义。

```typescript
// 在一个声明文件中，例如 myModule.d.ts
declare module 'myModule' {
  export function doSomething(): void;
}
// 在你的TypeScript文件中
import { doSomething } from 'myModule';
doSomething(); // 现在具有类型检查
```

在编写声明文件时，通常会将这些声明放在 `.d.ts`文件中，这样它们就不会被编译成JavaScript代码，而是用来提供类型信息。
