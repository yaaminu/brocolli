const react = require("react")
const react_dom = require('react-dom/server')

module.exports = function render(app_module, app_dir){
    require.dirname = app_dir
    let App = require(app_module)
    return react_dom.renderToString(react.createElement(App))
}

