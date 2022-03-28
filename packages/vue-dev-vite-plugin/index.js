const transform = require("./lib/transform") 
const useMiddleware = require("./lib/useMiddleware") 
const transformIndexHtml = require("./lib/transformIndexHtml")

const ViteDevPlugin = () => {
    return {
        name: 'vue-dev-vite-plugin',
        enfore: 'pre',
        apply: 'serve',
        transform,
        configureServer: useMiddleware,
        transformIndexHtml
    }
}

module.exports = ViteDevPlugin