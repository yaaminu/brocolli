import React from 'react'
import Game from './components/game'

export default class App extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        name:"Brocolli"
      }
    }

    render(){
        return (
            <div>
               <p>{this.props["Hello"]}</p>
                <Game/>
            </div>
        )
    }
}

