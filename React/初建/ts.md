要使用React和TypeScript搭建一个纯前端框架，并包括`react-router`等基础功能，你可以按照以下步骤进行：
### 1. 初始化项目
首先，你需要创建一个新的React项目，并选择使用TypeScript。
```sh
npx create-react-app my-app --template typescript
cd my-app
```
### 2. 安装依赖

安装`react-router-dom`，这是React路由管理的库。
```sh
npm install react-router-dom
```
### 3. 创建基础文件结构
在`src`目录下创建以下文件和文件夹结构：
```
src/
|-- components/
|   |-- App.tsx
|   |-- Header.tsx
|   |-- Home.tsx
|   |-- About.tsx
|-- routes/
|   |-- index.tsx
|-- App.tsx
|-- index.tsx
```
### 4. 设置路由
在`routes/index.tsx`文件中，设置你的路由：
```tsx
// src/routes/index.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../components/Home';
import About from '../components/About';
const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        {/* 添加更多路由 */}
      </Switch>
    </Router>
  );
};
export default Routes;
```
### 5. 创建组件
创建几个基本组件，例如`Header`, `Home`, 和 `About`。
```tsx
// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
```
```tsx
// src/components/Home.tsx
import React from 'react';
const Home: React.FC = () => {
  return <h1>Home Page</h1>;
};
export default Home;
```
```tsx
// src/components/About.tsx
import React from 'react';
const About: React.FC = () => {
  return <h1>About Page</h1>;
};
export default About;
```
### 6. 修改App.tsx
更新`App.tsx`以使用路由。
```tsx
// src/components/App.tsx
import React from 'react';
import Header from './Header';
import Routes from '../routes';
const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Routes />
    </div>
  );
};
export default App;
```
### 7. 修改index.tsx
确保你的`index.tsx`文件使用`App`组件。
```tsx
// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```
### 8. 运行项目
现在，你可以运行你的项目了：
```sh
npm start
```
打开浏览器，你应该能够看到你的React应用，并且能够通过`/`和`/about`路径导航。
这是一个非常基础的设置，你可以根据需要添加更多的功能和组件。记得在添加新组件时，确保它们符合TypeScript的类型系统。
