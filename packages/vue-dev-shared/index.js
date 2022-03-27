const { parse } = require("@vue/compiler-sfc")
const MagicString = require("magic-string")
const portfinder = require("portfinder")
const express = require("express")
const launchEditor = require("./lib/launchEditor")
const injectAssets = require("./utils/template")
const { injectTag ,replaceTemplate} = require("./utils/injectTag")
const { launchEditorController, fetchStaticController} = require("./controller")

const TEMPLATE_DATA = require("./utils/templateData")

module.exports = {
    MagicString,
    portfinder,
    express,
    TEMPLATE_DATA,
    injectAssets,
    injectTag,
    replaceTemplate,
    parse,
    launchEditor,
    launchEditorController,
    fetchStaticController
}