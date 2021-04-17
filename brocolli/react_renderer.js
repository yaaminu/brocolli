const react = require("react")
const react_dom = require('react-dom/server')

module.exports = function render(app_module, data){
    let module = require(app_module)
    if (module['default']){
        App = module['default']
    }else{
        App = module
    }
    props = data || {}
    console.log(JSON.stringify(props))
    return {
        "markup": react_dom.renderToString(react.createElement(App, props)),
        "state": JSON.stringify(global.___brocolli___.state),
        "props": JSON.stringify(props)
     }
}