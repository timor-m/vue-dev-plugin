const { defineConfig } = require('@vue/cli-service')
const { useVueDevPlugin } = require('vue-dev-plugin')

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack:(config) => {
    useVueDevPlugin(config)
  }
})
