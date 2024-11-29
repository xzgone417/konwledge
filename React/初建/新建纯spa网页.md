要使用React搭建一套纯前端框架，并且包括Redux和React Router等基础功能，你可以按照以下步骤进行：
### 1. 初始化项目
首先，你需要创建一个新的React项目。如果你已经安装了`create-react-app`，可以使用以下命令来创建项目：
```sh
npx create-react-app my-react-framework
cd my-react-framework
```
### 2. 安装依赖
接下来，安装Redux、React Router和其他你可能需要的依赖：
```sh
npm install redux react-redux redux-thunk react-router-dom
```
这里安装了：
- `redux`: Redux的核心库。
- `react-redux`: 使React组件能够与Redux store交互。
- `redux-thunk`: 一个中间件，允许你编写返回函数的action creators，用于处理异步逻辑。
- `react-router-dom`: 用于在React应用中实现路由功能。
### 3. 设置Redux
在项目中创建以下文件夹和文件来组织Redux结构：
```
src/
|-- components/
|-- redux/
    |-- actions/
    |-- reducers/
    |-- store.js
```
#### actions/index.js
```javascript
// 示例action
export const increment = () => {
  return {
    type: 'INCREMENT'
  };
};
```
#### reducers/index.js
```javascript
import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
export default combineReducers({
  counter: counterReducer
});
```
#### reducers/counterReducer.js
```javascript
const initialState = {
  value: 0
};
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        value: state.value + 1
      };
    default:
      return state;
  }
};
export default counterReducer;
```
#### redux/store.js
```javascript
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
```
### 4. 设置React Router
在你的`App.js`文件中设置路由：
```javascript
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
function App() {
  return (
    <Router>
      <div>
        <nav>
          {/* 添加导航链接 */}
        </nav>
        {/* 路由配置 */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
```
### 5. 连接React和Redux
在`src/index.js`中，确保你将Redux的store传递给React应用：
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```
### 6. 创建组件
现在你可以创建React组件，并通过`react-redux`的`connect`函数或者使用Hooks（如`useSelector`和`useDispatch`）来连接到Redux store。
### 7. 运行项目
最后，启动你的开发服务器：
```sh
npm start
```
这样，你就设置好了一个基于React的前端框架，包含了Redux和React Router。接下来，你可以根据需要添加更多的功能和组件。
