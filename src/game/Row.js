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
                <Cell key={index} cell={cell} showCell={this.props.showCell} flagCell={this.props.flagCell} />
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
