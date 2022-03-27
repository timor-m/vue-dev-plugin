const { launchEditorController, fetchStaticController } = require("vue-dev-shared")
const qs = require('querystring')
const useMiddleware = (server) => {
    server.middlewares.use((req, res, next) => {
        const url = req.url
        
        if(url.includes("/launch-editor")) {
            const querystr = req.url.split("?", 2)[1]
            req.query = qs.parse(querystr)
            launchEditorController(req, res)
        } else if(url.includes("/vue-dev-overlay")) {
            const param = url.replace("/vue-dev-overlay/")
            req.params = { type: param }
            fetchStaticController(req, res)
        }
        
        next()
    })
}

export default useMiddleware