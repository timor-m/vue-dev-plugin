const fs = require("fs")
const path = require("path")

console.log('Build Start: Extract To JSON ...')

const script = fs.readFileSync(path.resolve(__dirname, "../dist","vue-dev-overlay.js"), "utf-8").replace('//# sourceMappingURL=vue-dev-overlay.js.map','')

const style = fs.readFileSync(path.resolve(__dirname, "../dist","vue-dev-overlay.css"), "utf-8")

const assets =  { script:  script  , style:  style }

fs.writeFileSync(path.resolve(__dirname, "../","index.js"), `module.exports = ${JSON.stringify(assets, null, 2)}`)

console.log('Build Success: at index.js')
