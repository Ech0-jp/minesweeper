import React, { Component } from 'react'
import './Cell.css'

class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show : false,
            isMine : props.cell.isMine,
            flagged : props.cell.flagged,
            mineCount : props.cell.mineCount
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            show: props.cell.show,
            isMine : props.cell.isMine,
            flagged : props.cell.flagged,
            mineCount : props.cell.mineCount
        });
    }

    showCell(){
        if (!this.state.show)
            this.props.showCell(this.props.cell);
    }

    render() {
        let cell = null;
        if (this.state.show) {
            if (this.state.isMine) {
                cell = (
                    <div className="Cell Cell-Show">
                        <span className="Cell-Bomb">X</span>
                    </div>
                );
            } else {
                cell = (
                    <div className="Cell Cell-Show">
                        <span className={"Cell-Num" + this.state.mineCount}>{this.state.mineCount}</span>
                    </div>
                );
            }
        } else if (this.state.flagged) {
                cell = (
                    <div className="Cell">
                        <span className="Cell-Flagged">F</span>
                    </div>
                );
        } else {
            cell = (
                    <div className="Cell"></div>
            );
        }
        return (
            <td onClick={this.showCell.bind(this)}>
                {cell}
            </td>
        );
    }
}

export default Cell;
