import React from 'react'
import Game from './components/game'

const sys = load_python_module('sys')
const lib = load_python_module('brocolli.lib')

export default class App extends React.Component {
    constructor(props){
      super(props)
      this.props = props
      this.state = {
        name:"Brocolli"
      }
    }

    render(){
        let date = new lib.Date()
        return (
           <div>
            <p>Rendered with python {sys.version} on {date.strftime("%Y/%m/%d %H:%M:%S")}</p>
            <Game/>
           </div>
        )
    }
}

