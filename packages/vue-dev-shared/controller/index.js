const vueDevOverlay = require('vue-dev-overlay')
const { replaceTemplate } = require("../utils/injectTag")
const launchEditor = require("../lib/launchEditor")
const TEMPLATE_DATA = require("../utils/templateData")

const launchEditorController = (req, res) => {
    const { file, line, column } = req.query
    if(!file) {
        res.end('faild')
    } else {
        launchEditor(file, +line, +column)
        res.end('ok')
    }
}

const fetchStaticController = (req, res) => {
    const fileMaps = {
        "script.js" : "script",
        "style.css" : "style"
    }
    let fileContent = vueDevOverlay[fileMaps[req.params.type]]
        fileContent = replaceTemplate(fileContent, TEMPLATE_DATA)
    res.end(fileContent)
}

module.exports = {
    launchEditorController,
    fetchStaticController
}