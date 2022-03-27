const injectAttr = require("../config")

const getDataAttr = (key) => {
    const val = injectAttr[key]
    if (!val) return ""
    const arr = val.split("-").slice(1)
    return arr.reduce((total, item, index) =>{
        if (index > 0) {
            total += item[0].toUpperCase() + item.slice(1)
        } else {
            total += item
        }
        return total
    }, "")
}

module.exports = getDataAttr