import React, { Component } from 'react'
import Cell from './Cell'

class Row extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cells : props.cells
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            cells : props.cells
        });
    }

    render() {
        var Cells = this.state.cells.map((cell, index) => {
            return (
                <Cell key={index} cell={cell} showCell={this.props.showCell} showNeighbouringCells={this.props.showNeighbouringCells} flagCell={this.props.flagCell} gameOverState={this.props.gameOverState} />
            );
        });
        return (
            <tr>
                {Cells}
            </tr>
        );
    }
}

export default Row;
