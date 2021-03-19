const react = require("react")
const sys = load_python_module('sys')
const lib = load_python_module('brocolli.lib')

class Button extends react.Component{
    render(){
        return <input type="button" value="hello"></input>
    }
}

class App extends react.Component {
    constructor(props){
      super(props)
      this.props = props
      this.state = {
        name:"Brocolli"
      }
    }

    render(){
        let today = lib.Date()
        return (
        <div>
             <h1>Hello world {this.state.name}</h1>
             <p>{`${today.year}-${today.month}-${today.day}`}</p>
             <p>{`Python Version ${sys.version}`</p>
             <Button/>
        </div>
        )
    }
}

module.exports = App
