const lib = require('./lib.js')
const react = require("react")
const react_dom = require('react-dom/server')

class App extends react.Component {
    constructor(props){
      super(props)
      this.props = props
      this.state = {
        name:"Brocolli"
      }
    }

    render(){
        return `<h1>Hello world ${this.state.name}</h1>`
    }
}

console.log(react_dom.renderToString(react.createElement(App)))

