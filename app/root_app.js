const react = require("react")

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
        let python_date = python.date_time()
        let day = python_date.day
        let month = python_date.month
        let year = python_date.year
        console.log(global.version)
        return (
        <div>
             <h1>Hello world {this.state.name}</h1>
             <p>{`${year}-${month}-${day}`}</p>
             <Button/>
        </div>
        )
    }
}

module.exports = App
