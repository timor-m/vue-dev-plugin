import compiler from "./compiler"

const transform = (code, id) => {
    const [filename] = id.split("?", 2)
    const url = new URL(id)
    const query = Object.fromEntries(url.searchParams.entries())
    if (query.vue != null)
        query.vue = true

    if (query.src != null)
        query.src = true

    if (query.index != null)
        query.index = Number(query.index)

    if (query.raw != null)
        query.raw = true

    if(filename.endsWith('.vue') && query.type !=='style') return compiler(code, filename)
    
    return code
}

export default transform