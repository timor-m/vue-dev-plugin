const start = require("./Server");
const { TEMPLATE_DATA, injectAssets, injectContent } = require("vue-dev-shared")
class VueDevWebpackPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap("VueDevWebpackPlugin", (compilation) => {
      start(TEMPLATE_DATA.__HTTP_PORT__, (port) => {
        TEMPLATE_DATA.__HTTP_PORT__ = port
        // webpack 4
        if (compilation.hooks.htmlWebpackPluginAfterHtmlProcessing) {
          compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tap(
            "HtmlWebpackPlugin",
            (data) => {
              data.html = injectContent(data.html, injectAssets, TEMPLATE_DATA);
            }
          );
        }

        // webpack 5
        if(compilation.hooks.processAssets) {
           compilation.hooks.processAssets.tap(
            {
              name: "VueDevWebpackPlugin",
              stage: compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
              additionalAssets: (assets) => {
                const htmlStr = injectContent(
                  assets["index.html"].source(),
                  injectAssets,
                  TEMPLATE_DATA
                );
                compilation.updateAsset("index.html", {
                  size: htmlStr.length,
                  source: () => htmlStr,
                });
              },
            },
            () => {}
           );
        }
      });
    });
  }
}

module.exports = VueDevWebpackPlugin;
