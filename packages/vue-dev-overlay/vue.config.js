const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 9000
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV !== 'development') {
      config.plugin('extract-css').tap(args => [{
        filename: `vue-dev-overlay.css`,
     }])
    }
     config.output.filename('vue-dev-overlay.js').end()
     
     config.optimization.delete('splitChunks')
  }
})
