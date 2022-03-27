const { parse, MagicString } = require('vue-dev-shared')

const inject2Tag = (node, source, filename) => {
    if(node.children && node.children.length) {
        for(let i = node.children.length -1; i>=0; i--){
           source = inject2Tag(node.children[i], source, filename)
        }
    }
    
    if(node.type === 1) {
        const codeTextArr = source.split('\n')
        const { line , column } = node.loc.start
        const currIndex = line - 1
        const s = new MagicString(codeTextArr[currIndex])
        s.prependLeft(node.tag.length + column , ` data-injector data-injector-file="${filename}" data-injector-line="${line}" data-injector-column="${column}"
        `)
        codeTextArr[currIndex] = s.toString()
        source = codeTextArr.join('\n')
    }

    return source
} 

module.exports = async function compiler (source){
    const { resourcePath } = this
    const descriptor = parse(source).descriptor
    if (!descriptor || !descriptor.template || !descriptor.template.ast) return source
    const templateNode = parse(source).descriptor.template.ast
    const templateContent = templateNode.loc.source
    const targetContent = inject2Tag(templateNode, templateContent, resourcePath)
    return source.replace(templateContent, targetContent)
}