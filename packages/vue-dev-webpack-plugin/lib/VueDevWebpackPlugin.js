const start = require("./Server");
const { TEMPLATE_DATA, injectAssets, injectTag, replaceTemplate } = require("vue-dev-shared")

const injectContent = (source, assets) => {
  for (const key in assets) {
    const { content, container } = assets[key];
    let newContent = replaceTemplate(content, TEMPLATE_DATA)
    source = injectTag(newContent, source, container);
  }

  return source;
};

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
              data.html = injectContent(data.html, injectAssets);
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
                  injectAssets
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
