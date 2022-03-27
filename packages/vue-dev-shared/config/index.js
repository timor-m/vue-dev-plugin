// overlay dev mode
const IS_DEV = false

/**
 * inject element attr mapping
 */ 
const injectAttr = {
    base: "data-injector",
    file: "data-injector-file",
    line: "data-injector-line",
    column: "data-injector-column"
}

module.exports = {
    IS_DEV,
    injectAttr
}