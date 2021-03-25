import React from 'react'
import Board from './board'
import {load_python_module, create_state} from '../brocolli'

const version = load_python_module('sys').version
const date = load_python_module('brocolli.lib').Date
const uname = load_python_module('os').uname().machine
const app = load_python_module('app.app')


export default class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = create_state('/src/components/game.js', {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true,
            version: version,
            uname: uname,
            today: date().strftime("%Y-%m-%d"),
            test: app.Bar().test()
        })
    }


    calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            history: this.state.history.slice(0, step+1)
        })
    }

    handleClick(i) {
        const history = this.state.history.slice()
        const current = history[history.length - 1]
        const squares = current.squares.slice()
        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O'
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        })
    }


    render() {
        const history = this.state.history
        const current = history[this.state.stepNumber]
        const winner = this.calculateWinner(current.squares)
        const moves = history.map((step, move) => {
            const desc = move ? 'Got to move #' + move : 'Go to game start'
            return (<li key={move}><button onClick={() => this.jumpTo(move)}>{desc}</button></li>)
        })
        let status
        if (winner) {
            status = 'Winner ' + winner
        } else {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>uname {this.state.uname} {this.state.today}</div>
                    <div>{this.state.version}</div>
                    <div>{status} {this.state.test}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

