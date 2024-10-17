    使用React的Hooks可以让您在函数组件中使用状态和其他React特性，而无需编写类组件。以下是使用React Hooks的基本示例：

    1.**useState Hook**：用于在函数组件中添加状态。


- **代码示例**:

    ```jsx
    import React, { useState } from 'react';

    function Counter() {
    const [count, setCount] = useState(0);

    return (`<div>`
        `<p>`You clicked {count} times`</p>`
        <button onClick={()=> setCount(count + 1)}>
            Click me
        `</button>`
    `</div>`
    );
    }
    ```

    2.**useEffect Hook**：用于在函数组件中执行副作用操作（比如数据获取、订阅等）。

    ```jsx
    import React, { useState, useEffect } from 'react';

    function Example() {
    const [count, setCount] = useState(0);

    useEffect(() => {
    document.title =`You clicked ${count} times`;
    }, [count]);

    return (`<div>`
        `<p>`You clicked {count} times`</p>`
        <button onClick={()=> setCount(count + 1)}>
            Click me
        `</button>`
    `</div>`
    );
    }
    ```

    3.**自定义Hook**：可以创建自定义的Hook来重用逻辑。

    ```jsx
    import { useState } from 'react';

    function UseInput(initialValue) {
    const [value, setValue] = useState(initialValue);

    const handleChange = (e) => {
    setValue(e.target.value);
    };

    return {
    value,
    onChange: handleChange,
    };
    }

    function Form() {
    const firstName = UseInput('');
    const lastName = UseInput('');

    return (`<form>`
        <input {...firstName} placeholder="First Name" />
        <input {...lastName} placeholder="Last Name" />
    `</form>`
    );
    }
    ```

    这些是React Hooks的基本用法示例。您可以根据需要使用其他Hooks，如`useContext`、`useReducer`等。
    确保在函数组件的顶层使用Hooks，不要在循环、条件语句或嵌套函数中使用Hook。
