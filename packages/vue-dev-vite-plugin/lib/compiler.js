const { MagicString, injectAttr } = require("vue-dev-shared")
const { parse, transform } = require("@vue/compiler-dom")
const excludeTags = ["template", "script", "style"]

async function compiler (code, id) {
    const s = new MagicString(code)
    const ast = parse(code, { comments: true})
    const result = await new Promise(resolve => {
        transform(ast, {
            nodeTransforms:[
                (node) => {
                    if(node.type ===1 && node.tagType===0 && !excludeTags.includes(node.tag)) {
                        if(!node.loc.source.includes(injectAttr['base'])) {
                            s.prependLeft(node.loc.start.offset + node.tag.length+1,`
                            ${injectAttr['base']}
                            ${injectAttr['file']}="${id}"
                            ${injectAttr['line']}="${node.loc.start.line}"
                            ${injectAttr['column']}="${node.loc.start.column}"
                            `)
                        }
                        
                    }
                }
            ]
        })
        resolve(s.toString())
    })

    return result
}

module.exports = compiler