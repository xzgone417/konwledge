在 React 中使用 `Suspense` 组件时，通常是与 `React.lazy()` 和 `React.Suspense` 一起使用，以处理动态加载的组件。要在自定义请求中触发 `Suspense` 的加载状态，我们可以使用 **React 18 引入的 `useTransition` 和 `Suspense` 的机制**，或者使用 `React` 的 **`Suspense` 和 `useDeferredValue`**，结合 **React Query 或 SWR** 等库。

但是，如果你需要自己实现一个类似于 `Suspense` 的加载机制，并控制自定义请求的加载状态，那么你需要使用以下步骤：

### 实现思路：

1. **使用 `React.Suspense` 组件：** 通过 `React.Suspense` 可以渲染一个包含加载指示器的组件。
2. **使用自定义的 `fetchData` 函数：** 在自定义的 `fetchData` 函数中处理数据请求，并使用一个 `Promise` 来模拟 Suspense 的功能。
3. **利用 `throw` 来触发 Suspense 的回退状态：** 当数据尚未加载完成时，抛出一个 `Promise`，从而触发 `Suspense` 的加载状态。

### 示例代码：

下面的示例展示了如何实现一个自定义的请求函数，并利用 React 的 `Suspense` 组件来显示加载状态：

```jsx
import React, { Suspense, useState } from 'react';

// 模拟的 fetch 函数，返回一个数据 Promise
const fetchData = () => {
  let status = 'pending';
  let result;
  const suspender = new Promise((resolve) => {
    setTimeout(() => {
      status = 'success';
      result = { data: 'Hello, Suspense!' };
      resolve(result);
    }, 2000);
  }).then((res) => {
    result = res;
    status = 'success';
  });

  return {
    read() {
      if (status === 'pending') {
        throw suspender; // 如果数据还在加载中，抛出 Promise，触发 Suspense 的 fallback
      } else if (status === 'success') {
        return result; // 返回数据
      } else {
        throw new Error('Error loading data'); // 出现错误时抛出异常
      }
    },
  };
};

// 调用 fetchData 函数，获取 resource 对象
const resource = fetchData();

// 一个简单的组件，用于显示从 Suspense 加载的数据
function DataComponent() {
  const data = resource.read(); // 读取数据
  return <div>Data: {data.data}</div>;
}

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        {/* 当数据加载时显示 DataComponent，否则显示 Loading... */}
        <DataComponent />
      </Suspense>
    </div>
  );
}

export default App;
```

### 解释：

1. **`fetchData` 函数：**
   - 它模拟了一个异步请求，并在 2 秒后返回数据。我们使用了一个状态 `status` 来跟踪请求的状态（`pending`、`success` 或错误）。
   - 如果数据仍然在加载中 (`pending`)，我们通过 `throw suspender` 抛出一个 `Promise`，触发 `Suspense` 的 `fallback` 渲染状态。
   - 当数据成功加载 (`success`) 后，它会返回结果数据。

2. **`Suspense` 组件：**
   - `Suspense` 组件使用 `fallback` 属性来定义在异步数据加载期间显示的内容。在本例中，它会显示 "Loading..." 文本。
   - 当 `Suspense` 中的子组件（即 `DataComponent`）触发一个 `Promise` 抛出时，React 将会中断渲染，并显示 `Suspense` 的 `fallback` 组件。

3. **`DataComponent` 组件：**
   - 通过 `resource.read()` 获取数据。`read()` 方法在数据成功加载时返回数据，在数据未加载时抛出 `Promise`。

### 优化建议：

- 在实际项目中，可以使用 `React Query` 或 `SWR` 等库来实现 `Suspense` 支持的异步数据加载和缓存管理，以更好地处理请求和数据的状态管理。这些库提供了更强大的 API 和优化，例如缓存、错误处理、刷新等功能。

- 这种方式适合小型项目或希望自定义数据加载机制的场景，在处理更复杂的数据逻辑时，建议使用专业的状态管理库。
```jsx
  async function messagePromise() {
    const once_config = {
      url: "/officialweb/sfwebgamelist/search",
    };
    const once_query = {
      currentPage: 1,
      pageSize: 100,
      gametype: 2,
    };
    const res = await urlencodedFetch(once_config, once_query);
    if (res.code === 0) {
      return res.data;
    } else {
      return false;
    }
  }
  const ActiveContainer = (params: any) => {
    const messageContent = use(params.messagePromise());
    console.log("🚀XZG ~ ActiveContainer ~ messageContent:", messageContent);
    // console.log("🚀XZG ~ ActiveContainer ~ messageContent:", messageContent);
    return <p>Here is the message: {messageContent.total}</p>;

    // return <>{}</>;
            <Suspense fallback={<Loading></Loading>}>
          <ActiveContainer messagePromise={messagePromise}></ActiveContainer>
        </Suspense>
  };


```