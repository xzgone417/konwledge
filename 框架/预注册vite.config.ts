import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
// import vueJsx from "@vitejs/plugin-vue-jsx";
//自动导入ui-组件 比如说ant-design-vue  element-plus等
import Components from "unplugin-vue-components/vite";
// import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { VantResolver } from "@vant/auto-import-resolver";
// 自动导入vue中hook reactive ref等
import AutoImport from "unplugin-auto-import/vite";
import path from "node:path";
import VueI18n from "@intlify/unplugin-vue-i18n/vite";
// import os from "os";
// import requireTransform from "vite-plugin-require-transform";
// https://vitejs.dev/config/  打包预览命令 npx vite preview
export default ({ mode }: any) => {
  const envDir = `${process.cwd()}/config`;
  // 第三个参数prefixes默认为'VITE_',说明只能取'VITE_'开头的，如果取''，则全部环境变量都能读取,对应各个环境定义的变量
  const envConfig = loadEnv(mode, envDir);
  return defineConfig({
    envDir,
    clearScreen: true, //每次构建都会清除原来的打印
    base: envConfig.VITE_BASIC_URL, //当前路径   ./等同与""但是依旧没有前缀的效果   ,默认是/ ，到根目录，即到域名结尾
    // build: {
    //   sourcemap: mode === "dev",
    //   // target: ['chrome', 'edge', 'firefox', 'safari','IE'],
    //   //   rollupOptions: {
    //   //     input: {
    //   //       main: "src/main.ts", // 这是默认的入口文件
    //   //       customIndex: "index-prod.html", // 这是自定义的入口文件
    //   //       // 在这里添加更多的入口文件
    //   //     },
    //   //   },
    // },
    plugins: [
      vue(),
      // vueJsx(),
      // requireTransform({
      //   fileRegex: /.js$|.vue$|.ts$|.html$/,
      // }),
      Components({
        // 引入组件的,包括自定义组件
        // 存放的位置 / 启用路由懒加载
        dts: "src/components.d.ts",
        resolvers: [VantResolver()],
        // dirs: ['src/components'], dirs默认就是这个值
      }),
      AutoImport({
        resolvers: [VantResolver()],
        imports: ["vue", "vue-router", "vue-i18n"],
        //存放的位置
        dts: "src/auto-import.d.ts",
      }),
      VueI18n({
        runtimeOnly: true,
        compositionOnly: true,
        include: [path.resolve(__dirname, "src/locales/**")],
      }),
    ],
    server: {
      // host: getNetworkIp(),
      // 代理的效果就是最终协议名和代码所在服务器名一致
      proxy: {
        // "/api": {
        //   target: envConfig.VITE_BASIC_REQUEST_URL, // 代理的目标地址
        //   // 开发模式，默认的127.0.0.1,开启后代理服务会把origin修改为目标地址
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/api/, ""),
        // },
        "/applovin": {
          target: envConfig.VITE_BASIC_REQUEST_URL, // 代理的目标地址
          // 开发模式，默认的127.0.0.1,开启后代理服务会把origin修改为目标地址
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
      port: Number(envConfig.VITE_PORT),
      open: envConfig.VITE_OPEN,
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
      // extensions: [".vue", ".ts", ".json","mjs"],
      // dedupe: ["vue"],
    },
    esbuild: {
      pure:
        envConfig.VITE_ENV == "production" ? ["console.log", "debugger"] : [],
    },
    //*****定义全局变量,index.html中无法获取******
    // define: {
    //   MENU_PATH: `"path"`,
    // },
  });
};
