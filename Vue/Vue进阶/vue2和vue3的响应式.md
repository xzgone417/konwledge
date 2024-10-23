Vue.js 的响应式系统是其核心特性之一，它允许开发者通过声明式地绑定数据到视图，实现数据和视图的同步更新。Vue 2 和 Vue 3 在实现响应式系统方面有一些显著的不同。

### Vue 2 的响应式实现

Vue 2 使用了 Object.defineProperty() 方法来实现响应式系统。以下是它的主要步骤：

1. **依赖收集**：在初始化组件时，Vue 会遍历 data 对象的所有属性，并使用 Object.defineProperty() 为每个属性添加 getter 和 setter。
2. **getter**：当读取属性值时，getter 会被触发，此时 Vue 会将该属性的依赖（即使用了该属性的视图或计算属性）收集起来。
3. **setter**：当属性值被修改时，setter 会被触发，此时 Vue 会通知所有依赖该属性的视图或计算属性进行更新。
   以下是简化的代码示例：

```javascript
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      return val;
    },
    set: function reactiveSetter(newVal) {
      if (newVal === val) return;
      val = newVal;
      // 通知更新
      notifyUpdate();
    }
  });
}
```

### Vue 3 的响应式实现

Vue 3 使用了 ES6 的 Proxy 特性来实现响应式系统，这使得它的响应式系统更为高效和强大。以下是它的主要步骤：

1. **Proxy 代理**：Vue 3 使用 Proxy 来代理整个对象，而不是对象的单个属性。这样可以一次性拦截对象的所有操作，包括属性的新增和删除。
2. **依赖收集**：当读取属性时，Vue 3 会使用一个名为 `effect` 的函数来跟踪副作用（即视图更新函数或其他响应式依赖）。
3. **触发更新**：当属性被修改时，Vue 3 会触发之前收集的副作用，从而更新视图。
   以下是简化的代码示例：

```javascript
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      // 收集依赖
      track(target, key);
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver);
      // 触发更新
      trigger(target, key);
      return result;
    }
  });
}
function track(target, key) {
  // ...依赖收集逻辑
}
function trigger(target, key) {
  // ...触发更新逻辑
}
```

### Vue 3 响应式系统的优势

- **更好的性能**：Proxy 可以一次性代理整个对象，而不是每个属性，减少了内存使用，提高了代理效率。
- **更好的语法支持**：Proxy 可以拦截更多种类的操作，包括数组索引和长度的修改，以及对象的添加和删除操作。
- **更好的类型支持**：Vue 3 的响应式系统与 TypeScript 的集成更为友好。
  总的来说，Vue 3 的响应式系统在 Vue 2 的基础上进行了重大改进，提供了更为现代和高效的实现方式。
