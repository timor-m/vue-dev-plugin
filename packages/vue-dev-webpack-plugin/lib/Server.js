const { express, portfinder,TEMPLATE_DATA, launchEditorController, fetchStaticController } = require("vue-dev-shared")

const app = express()

let serverLocked = false

const start =  (port, cb) => {
    app.all('*', function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin','*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); 
        res.setHeader('Access-Control-Allow-Headers', '*'); 
        next();
    })
    app.get('/launch-editor',launchEditorController)
    app.get('/vue-dev-overlay/:type', fetchStaticController)

    portfinder.getPort({ port }, (err, port)=>{
        if (err) {
            console.error('[WebpackInjectorServer]: Start Error.')
        } else {
            !serverLocked && app.listen(port, () => {
                serverLocked = true
                TEMPLATE_DATA.__HTTP_PORT__ = port
                cb(port)
            })
        }
    })
    
  return app      
}

module.exports = start