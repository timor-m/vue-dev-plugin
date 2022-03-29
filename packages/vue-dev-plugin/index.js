const VueDevWebpackLoader = require("vue-dev-webpack-loader")
const { VueDevWebpackPlugin } = require("vue-dev-webpack-plugin")
const  ViteDevPlugin  = require("vue-dev-vite-plugin")

const useVueDevPlugin = function (config) {
    config.module.rule('vue')
    .test(/\.vue$/)
    .use(VueDevWebpackLoader)
    .loader('vue-dev-webpack-loader')

    config.plugin('vue-dev-webpack-plugin').use(new VueDevWebpackPlugin())
}

module.exports = {
    VueDevWebpackPlugin,
    VueDevWebpackLoader,
    ViteDevPlugin,
    useVueDevPlugin
}