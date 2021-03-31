const react = require("react")
const react_dom = require('react-dom/server')

module.exports = function render(app_module){
    let App = require(app_module)
    let app_markup = react_dom.renderToString(react.createElement(App))
    // Order is important, always generate the app state after rendering the app.
    let app_state = JSON.stringify(global.app_state)
    return {
        "markup": `<div id='root'>${app_markup}</div>
        <div id='data_brocolli_app_state'><!--${app_state}--></div>
        `
     }
}

