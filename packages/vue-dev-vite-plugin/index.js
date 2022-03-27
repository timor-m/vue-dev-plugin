import transform from "./lib/transform"
import useMiddleware from "./lib/useMiddleware"
import transformIndexHtml from "./lib/transformIndexHtml"

const viteDevPlugin = () => {
    return {
        name: 'vue-dev-vite-plugin',
        enfore: 'pre',
        apply: 'serve',
        transform,
        configureServer: useMiddleware,
        transformIndexHtml
    }
}

export default viteDevPlugin