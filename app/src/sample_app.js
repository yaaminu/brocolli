import React from 'react'
import Game from './components/game'

export default class App extends React.Component {
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

