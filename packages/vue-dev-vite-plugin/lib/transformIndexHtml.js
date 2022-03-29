const { TEMPLATE_DATA, injectAssets, injectContent } = require("vue-dev-shared")

const transformIndexHtml = (html, { server }) => {
    TEMPLATE_DATA.__HTTP_PORT__ = server.config.server.port
    return {
        html: injectContent(html, injectAssets, TEMPLATE_DATA),
        tags: []
    }
}

module.exports = transformIndexHtml