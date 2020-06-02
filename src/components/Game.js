import React from 'react';
import Board from './Board';
import calculateWinner from '../util/calculateUtil';

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                    row: null,
                    col: null
                }
            ],
            xIsNext: true,
            stepNumber: 0,
            // true for asc, false for desc
            moveOrder: true
        }
    }

    handleClick = (i) => {
        const current = this.state.history.slice(0, this.state.stepNumber + 1);
        const squares = this.state.history[this.state.stepNumber].squares.concat();
        
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState(
            {
                history: current.concat({
                    squares: squares,
                    row: parseInt(i/3) + 1,
                    col: i % 3 + 1
                }),
                xIsNext: !this.state.xIsNext,
                stepNumber: current.length
            }
        );
    }

    jumpTo = (i) => {
        this.setState({
            xIsNext: this.state.stepNumber % 2 === 0,
            stepNumber: i
        });
    }

    handleOrderChange = () => {
        this.setState({
            moveOrder: !this.state.moveOrder
        });
    }

    render() {
        let history = this.state.history.concat();
        if (!this.state.moveOrder) {
            history.reverse();
        }

        let moves = history.map((item, id) => {
            let content = '(' + item.row + ',' + item.col + ') Go to move #{' + id + '}';
            let stepNumber = this.state.moveOrder ? this.state.stepNumber : history.length - 1 - this.state.stepNumber

            if (id === stepNumber) {
                return (
                    <li key={id}>
                        <button onClick={() => {this.jumpTo(id)}}><strong>{content}</strong></button>
                    </li>
                )
            } else {
                return (
                    <li key={id}>
                        <button onClick={() => {this.jumpTo(id)}}>{content}</button>
                    </li>
                )
            }

        });

        let status;
        let winner;

        if (this.state.stepNumber !== 0) {
            winner = calculateWinner(this.state.history[this.state.stepNumber].squares);
        }

        if (winner) {
            status = 'The winner is ' + winner; 
        } else {
            status = 'Next step is ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={this.state.history[this.state.stepNumber].squares} click={(i) => this.handleClick(i)}/>
                </div>
                <div className="game-info">
                    <div>In {this.state.moveOrder ? 'ASC' : 'DESC'} order.<button onClick={this.handleOrderChange}>change</button></div>
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

export default Game;