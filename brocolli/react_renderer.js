const react = require("react")
const react_dom = require('react-dom/server')

module.exports = function render(app_module){
    global.React = react
    let App = require(app_module)
    console.log(react_dom.renderToString(react.createElement(App)))
}

