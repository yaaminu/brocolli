import React from 'react'

export default class Square extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <button className="square" onClick={() => props.onClick()}>
                {props.value}
            </button>)
    }
}
