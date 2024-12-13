在 TypeScript 中，`protected` 关键字用于访问修饰符，它指定类成员（属性或方法）在派生类中是可访问的，但在类的外部是不可访问的。`protected` 提供了一种比 `private` 更宽松的隐私级别，因为它允许继承类的访问，但是仍然防止类的使用者直接访问这些成员。
以下是一个简单的例子来说明 `protected` 的使用：

```typescript
class Base {
    protected name: string;
    constructor(name: string) {
        this.name = name;
    }
    protected getName(): string {
        return this.name;
    }
}
class Derived extends Base {
    constructor(name: string) {
        super(name);
    }
    showName(): void {
        // 在派生类中可以访问 protected 属性和方法
        console.log("Name: " + this.getName());
    }
}
const base = new Base("Base");
// 下面这行代码会报错，因为 name 是 protected 的
// console.log(base.name);
const derived = new Derived("Derived");
// 下面这行代码也会报错，因为 getName 是 protected 的
// console.log(derived.getName());
// 但是可以通过派生类的方法来访问
derived.showName();
```

在这个例子中，`name` 属性和 `getName` 方法都是 `protected` 的，这意味着它们只能在 `Base` 类及其派生类 `Derived` 中被访问。在类的实例上直接访问这些 `protected` 成员是不允许的，这会引发编译错误。
