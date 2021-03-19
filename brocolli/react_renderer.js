const react = require("react")
const react_dom = require('react-dom/server')

module.exports = function render(app_module){
    global.React = react
    let App = require(app_module)
    return react_dom.renderToString(react.createElement(App))
}

