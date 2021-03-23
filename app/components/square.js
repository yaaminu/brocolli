const React = require('react')

class Square extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <button className="square" onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>)
    }
}

module.exports = Square