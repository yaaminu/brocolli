const react = require("react")
const react_dom = require('react-dom/server')

module.exports = function render(app_module){
    let module = require(app_module)
    if (module['default']){
        App = module['default']
    }else{
        App = module
    }
    return {
        "markup": react_dom.renderToString(react.createElement(App)),
        "state":JSON.stringify(global.___brocolli___.___state___)
     }
}

