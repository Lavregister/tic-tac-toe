import React from 'react';
import Square from './Square';
import '../index.css';

class Board extends React.Component {

    renderSquare(i) {
        return <Square value={this.props.squares[i]} click={() => this.props.click(i)} key={i} highlight={this.props.winner ? this.props.winner.includes(i) : null}/>;
    }

    renderRow = (i) => {
        let element = [];
        for (let j=0; j<=2; j++) {
            element.push(this.renderSquare(i + j));
        }
        return (
            <div className="board-row" key={i}>
                {element}
            </div>
        )
    }

    render() {
        let element = [];
        for (let i=0; i<=2; i++) {
            element.push(this.renderRow(i*3));
        }

        return (
            <div> {element} </div>
        )
    }
}

export default Board;