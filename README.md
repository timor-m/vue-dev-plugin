## vue-dev-plugin

![demo](https://github.com/timor-m/vue-dev-plugin/blob/master/docs/demo.gif)

## 📖 Introduction

A vue plugin which provides the ability that to jump to the local IDE when you click the element of browser automatically. It supports Vue2 & 3. 

#### webpack version  support :  webpack4 , webpack5 

#### vite: will support

## 📦 Installation

```bash
# pnpm 
pnpm install vue-dev-plugin -D

# yarn
yarn add vue-dev-plugin -D

# npm
npm install vue-dev-plugin -D
```

## 🦄 Usage

### Configuration Webpack

```ts
// for vue2

const { defineConfig } = require('@vue/cli-service')
const { useVueDevPlugin } = require('vue-dev-plugin')

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack:(config) => {
  
// [warning]It is only recommended to use in the development environment
   if(process.env.NODE_ENV === 'development') {
       useVueDevPlugin(config)
   } 
  }
})

```

```ts
// for vue3

const { defineConfig } = require('@vue/cli-service')
const { useVueDevPlugin } = require('vue-dev-plugin')

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack:(config) => {
 // [warning]It is only recommended to use in the development environment
   if(process.env.NODE_ENV === 'development') {
       useVueDevPlugin(config)
   } 
  }
})

```



## 🔌  Configuration IDE / Editor

It uses an **environment variable** named **`VUE_EDITOR`** to specify an IDE application, but if you do not set this variable, it will try to open a common IDE that you have open or installed once it is certified.

For example, if you want it always open VSCode when inspection clicked, set `export VUE_EDITOR=code` in your shell.


### VSCode

- install VSCode command line tools, [see the official docs]

- set env to shell, like `.bashrc` or `.zshrc`  

  ```bash
  export VUE_EDITOR=code
  ```

<br />

### WebStorm  

- just set env with an absolute path to shell, like `.bashrc` or `.zshrc` (only MacOS)  

  ```bash
  export VUE_EDITOR='/Applications/WebStorm.app/Contents/MacOS/webstorm'
  ```

**OR**

- install WebStorm command line tools

- then set env to shell, like `.bashrc` or `.zshrc`  

  ```bash
  export VUE_EDITOR=webstorm
  ```

<br />

### Vim

Yes! you can also use vim if you want, just set env to shell

```bash
export VUE_EDITOR=vim
```

<br />

## 💡 Notice

- It only work in develop mode .
- It does not currently support `SSR` and `Template Engine (e.g. pug)` .

## 🤖️ Analysis of Theory



## 📄 License

[MIT LICENSE](./LICENSE)