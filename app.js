const lib = require('./lib.js')
const react = require("react")
const react_dom = require('react-dom/server')

class App extends react.Component {
    constructor(props){
      super(props)
      this.props = props
      setState({
        name:"Brocolli"
      })
    }

    render(){
        return "<h1>Hello {this.props.name}</h1>"
    }
}

lib.test()

