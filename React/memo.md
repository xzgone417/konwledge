`useMemo` 和 `memo` 都是 React 中用于优化性能的工具，但它们的用途和工作方式有所不同。

### `useMemo` 和 `memo` 的主要区别：

1. **`useMemo`**:
   - **类型**: Hook
   - **作用**: 用于在组件内部缓存计算结果，以避免在每次渲染时重新计算相同的值。
   - **使用场景**: 当某些计算或操作较为耗时且结果在同一渲染期间不会改变时，`useMemo` 可以用于缓存这些计算结果，从而提升性能。
   - **工作方式**: `useMemo` 接受一个“创建函数”和依赖数组，它只会在依赖项发生变化时重新计算值。如果依赖项没有变化，`useMemo` 会返回缓存的值。
   - **代码示例**:

     ```jsx
     import React, { useMemo } from 'react';

     function ExpensiveCalculationComponent({ input }) {
       const calculatedValue = useMemo(() => {
         // 假设这是一个昂贵的计算
         return input * 2;
       }, [input]);

       return <div>Calculated Value: {calculatedValue}</div>;
     }
     ```

   在这个例子中，`calculatedValue` 只有在 `input` 发生变化时才会重新计算。

2. **`memo`**:
   - **类型**: 高阶组件（HOC）
   - **作用**: 用于将整个组件进行记忆化，以避免在父组件重新渲染时不必要的子组件重渲染。
   - **使用场景**: 当一个组件在同样的 props 下不需要重新渲染时，可以使用 `memo` 来记忆该组件的渲染结果，以减少不必要的渲染。
   - **工作方式**: `memo` 包装一个组件，并在组件的 props 没有发生变化时，跳过重新渲染该组件。它的工作方式类似于 `PureComponent`，只进行浅比较。
   - **代码示例**:

     ```jsx
     import React from 'react';

     const MyComponent = React.memo(function MyComponent({ data }) {
       console.log('Component rendered');
       return <div>{data}</div>;
     });

     function ParentComponent({ value }) {
       return <MyComponent data={value} />;
     }
     ```

   在这个例子中，`MyComponent` 只有在 `data` prop 发生变化时才会重新渲染。

### 总结：

- **`useMemo`**: 用于缓存函数内部的计算结果，主要用于优化计算密集型的操作。
- **`memo`**: 用于缓存组件的渲染结果，避免不必要的重新渲染，主要用于优化组件树中的渲染性能。

二者虽然都可以用于性能优化，但应用场景和作用对象不同：`useMemo` 针对计算结果，`memo` 针对整个组件。