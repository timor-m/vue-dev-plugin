const { parse } = require("@vue/compiler-sfc")
const MagicString = require("magic-string")
const portfinder = require("portfinder")
const express = require("express")
const launchEditor = require("./lib/launchEditor")
const injectAssets = require("./utils/template")
const { injectTag ,injectContent, replaceTemplate} = require("./utils/injectTag")
const getDataAttr = require("./utils/getDataAttr")
const { launchEditorController, fetchStaticController} = require("./controller")
const { IS_DEV, injectAttr } = require("./config")

const TEMPLATE_DATA = require("./utils/templateData")

module.exports = {
    MagicString,
    portfinder,
    express,
    TEMPLATE_DATA,
    IS_DEV,
    injectAssets,
    injectAttr,
    injectTag,
    injectContent,
    replaceTemplate,
    getDataAttr,
    parse,
    launchEditor,
    launchEditorController,
    fetchStaticController
}