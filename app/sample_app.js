const React = require("react")
const Game = require('./components/game')

const sys = load_python_module('sys')
const lib = load_python_module('brocolli.lib')

class App extends React.Component {
    constructor(props){
      super(props)
      this.props = props
      this.state = {
        name:"Brocolli"
      }
    }

    render(){
        return (
            <Game/>
        )
    }
}
module.exports = App
