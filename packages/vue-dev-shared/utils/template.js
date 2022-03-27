
// overlay dev 
const IS_DEV = false

const injectAssets = [
  {
    container: "body",
    content: `<div id="vue-dev-plugin-overlay"></div>`
  },
    {
      tag: "script",
      container: "body",
      content: IS_DEV ? `<script src="http://localhost:9000/vue-dev-overlay.js"></script>` : `<script src="http://localhost:__HTTP_PORT__/vue-dev-overlay/script.js"></script>`,
    },
    {
      tag: "style",
      container: "head",
      content: IS_DEV ? '' : `<link rel="stylesheet" type="text/css" href="http://localhost:__HTTP_PORT__/vue-dev-overlay/style.css" />`
    },
    
  ];

  module.exports = injectAssets