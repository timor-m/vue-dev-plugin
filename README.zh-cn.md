## 										vue-dev-plugin

​						                            [English](https://github.com/timor-m/vue-dev-plugin/blob/master/README.md)  |  [简体中文](https://github.com/timor-m/vue-dev-plugin/blob/master/README.zh-cn.md)

![demo](https://github.com/timor-m/vue-dev-plugin/blob/master/docs/demo.gif)

## 📖 介绍

一个vue的开发环境插件，当你点击浏览器的元素时，可以自动跳转到本地IDE，它支持Vue2和Vue3。提供了基于webpack和vite的插件，让你的开发更加便捷。



## 🌈 构建工具: 

| 名称    | 版本 | 是否支持 |
| ------- | ------- | ------- |
| webpack | 4       | ✅       |
| webpack | 5       | ✅       |
| vite    | latest     | ✅       |


## 📦 安装

```bash
# pnpm 
pnpm install vue-dev-plugin -D

# yarn
yarn add vue-dev-plugin -D

# npm
npm install vue-dev-plugin -D
```

## 🦄 使用

### 配置 Webpack


```ts
// 在webpack 4，5版本中使用， 配置 vue.config.js

const { defineConfig } = require('@vue/cli-service')
const { useVueDevPlugin } = require('vue-dev-plugin')

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack:(config) => {
  
// [警告]建议只在开发环境中使用
   if(process.env.NODE_ENV === 'development') {
       useVueDevPlugin(config)
   } 
  }
})

```
### 配置 Vite
```ts
// vite中配置plugin

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import  { ViteDevPlugin } from 'vue-dev-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  // [警告]建议只在开发环境中使用
  plugins: [vue(), ViteDevPlugin()],
})

```



## 🔌  配置 IDE / 编辑器

它使用一个名为VUE_EDITOR的环境变量来指定IDE应用程序，但如果您没有设置此变量，它将尝试打开一个已打开或已安装的通用IDE

例如，如果希望在单击检查时始终打开VSCode，请在shell中设置export VUE_EDITOR=code。


### VSCode

- 安装 VSCode code 命令
  使用 command + shift + p (注意window 下使用 ctrl + shift + p )  然后搜索code， 下拉选择 install 'code' command in path。  

<br />

### WebStorm  

- 只需将env设置为shell的绝对路径, 像这样 `.bashrc` or `.zshrc` (only MacOS)  

  ```bash
  export VUE_EDITOR='/Applications/WebStorm.app/Contents/MacOS/webstorm'
  ```

**OR**

- 安装 WebStorm 命令行工具

- 然后设置 env 命令, 如 `.bashrc` or `.zshrc`  

  ```bash
  export VUE_EDITOR=webstorm
  ```

<br />

### Vim

当然你也可以使用在vim中，像这种配置工具环境

```bash
export VUE_EDITOR=vim
```

<br />

## 💡 提醒

- 插件只运行在开发模式中使用
- 目前不支持 `SSR` 和 在vue中使用一些入侵式的模板引擎如 `pug`
## 🤖️ 理论分析



##  ✈️将来

### 欢迎有想法的同学一起撸啊.



## 📄 License

[MIT LICENSE](./LICENSE)
