const { TEMPLATE_DATA, injectAssets, injectContent } = require("vue-dev-shared")

const transformIndexHtml = (html) => {
    return {
        html: injectContent(html, injectAssets, TEMPLATE_DATA),
        tags: []
    }
}

module.exports = transformIndexHtml