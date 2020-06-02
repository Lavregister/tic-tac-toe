import React from 'react';

class Square extends React.Component {

    render() {
        const style = {
            background: 'yellow'
        }
        return (
        <button className="square" onClick={this.props.click} style={ this.props.highlight ? style : null}>
            {this.props.value}
        </button>
        );
    }
}

export default Square;