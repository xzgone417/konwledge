在 Lombok 库中，`@Builder` 注解和它的 `builder()` 方法是用来生成复杂对象的构建器模式的便捷方式。
### @Builder 注解
`@Builder` 是一个 Lombok 注解，它可以自动生成一个内部的静态类，这个类包含了构建目标对象的全部参数。这个注解的作用如下：
1. **简化对象创建**: 使用构建器模式可以避免编写冗长的构造函数或者 setter 方法链来创建对象。
2. **可读性**: 使用构建器模式可以让代码更加易读，尤其是在创建具有多个参数的对象时。
3. **链式调用**: 构建器允许链式调用方法，使得代码更加简洁。
4. **默认值**: 可以在构建器中为参数提供默认值，使得创建对象时不必为每个参数都指定值。
使用 `@Builder` 注解的类示例：
```java
@Builder
public class User {
    private final String name;
    private final int age;
    private final String email;
}
```
这个注解会自动生成一个名为 `UserBuilder` 的内部静态类，你可以这样使用它：
```java
User user = User.builder()
                .name("Alice")
                .age(30)
                .email("alice@example.com")
                .build();
```
### builder() 方法
`@Builder` 注解的 `builder()` 方法是构建器模式中的一个关键部分。它是自动生成的，当你调用这个方法时，它会返回一个构建器实例，你可以通过这个实例设置对象的属性。以下是 `builder()` 方法的作用：
1. **创建构建器实例**: `builder()` 方法用于创建构建器实例，这是开始构建对象的起点。
2. **链式调用**: `builder()` 方法返回的构建器实例允许你通过链式调用来设置对象的属性。
`@Builder(toBuilder = true)` 中的 `toBuilder = true` 参数指示 Lombok 生成一个 `toBuilder()` 方法，这个方法会返回一个构建器实例，其属性值被初始化为当前对象的值。这使得你可以基于现有的对象创建一个新的对象，同时可能修改一些属性。
使用 `toBuilder()` 方法的示例：
```java
User user = User.builder()
                .name("Alice")
                .age(30)
                .email("alice@example.com")
                .build();
User updatedUser = user.toBuilder()
                      .age(31)
                      .build();
```
在这个例子中，`updatedUser` 对象是基于 `user` 对象创建的，但是年龄被更新为 31。其他的属性保持不变。这样的功能在需要基于现有对象创建一个新对象并进行少量修改时非常有用。
