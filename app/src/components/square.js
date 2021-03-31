import React from 'react'

export default function(props){
        return (
            <button className="square" onClick={() => props.onClick()}>
                {props.value}
            </button>)
}