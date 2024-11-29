在 React Router 6 中，你可以通过多种方式在切换路由时添加加载效果和使用布局组件。以下是一个示例，展示了如何在路由切换时添加一个简单的加载效果，并使用一个布局组件。
### 1. 创建一个布局组件
首先，创建一个布局组件 `Layout.tsx`，它将包含你的 `Header` 和 `Footer` 组件，以及一个用于渲染子组件的区域。
```tsx
// src/components/Layout.tsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';
interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
export default Layout;
```
### 2. 创建一个加载组件
然后，创建一个 `Loader.tsx` 组件，它将在路由切换时显示。
```tsx
// src/components/Loader.tsx
import React from 'react';
const Loader: React.FC = () => {
  return <div>Loading...</div>;
};
export default Loader;
```
### 3. 在路由中使用布局和加载效果
现在，你可以在 `Routes` 组件中使用 `Layout` 和 `Loader`。
```tsx
// src/routes/index.tsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Loader from '../components/Loader';
const Home = lazy(() => import('../views/Home'));
const About = lazy(() => import('../views/About'));
const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            {/* 添加更多路由 */}
          </Routes>
        </Layout>
      </Suspense>
    </BrowserRouter>
  );
};
export default AppRoutes;
```
在这个例子中，`Suspense` 组件用于包裹懒加载的组件，并设置一个回退（`fallback`）组件，即 `Loader`。当路由切换时，如果新组件尚未加载，将显示加载效果。
注意，这里使用了 `React.lazy` 来实现组件的懒加载，这意味着组件将会在需要时才被加载，从而可以在切换路由时显示加载效果。
确保你的 `Home` 和 `About` 组件是可以懒加载的，并且它们是通过 `export default` 导出的。
这样，你就有了一个带有加载效果和使用布局组件的路由系统。当用户在应用中切换路由时，会看到加载效果，直到新页面完全加载。
