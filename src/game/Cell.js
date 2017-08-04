import React, { Component } from 'react'
import './Cell.css'

class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show : false,
            isMine : props.cell.isMine,
            flagged : props.cell.flagged,
            mineCount : props.cell.mineCount,
            gameOverState : props.gameOverState
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            show: props.cell.show,
            isMine : props.cell.isMine,
            flagged : props.cell.flagged,
            mineCount : props.cell.mineCount,
            gameOverState : props.gameOverState
        });
    }

    flagCell(){
        this.props.flagCell(this.props.cell);
    }

    onClick(e){
        e.preventDefault();
        if (this.props.cell.show || this.state.gameOverState)
            return;

        if (e.nativeEvent.which === 1) {
            this.props.showCell(this.props.cell);
        } else if (e.nativeEvent.which === 3) {
            this.props.flagCell(this.props.cell);
        }
    }

    onDoubleClick(e){
        e.preventDefault();
        if (!this.props.cell.show || this.state.gameOverState)
            return;

        this.props.showNeighbouringCells(this.props.cell, true);
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
        } else if (this.state.flagged && !this.state.gameOverState) {
                cell = (
                    <div className="Cell">
                        <span className="Cell-Flagged">F</span>
                    </div>
                );
        } else {
            if (this.state.gameOverState && this.state.isMine) {
                cell = (
                        <div className="Cell">
                            <span className="Cell-Bomb">X</span>
                        </div>
                );
            } else {
                cell = (
                    <div className="Cell"></div>
                );
            }
        }
        return (
            <td onClick={this.onClick.bind(this)} onContextMenu={this.onClick.bind(this)} onDoubleClick={this.onDoubleClick.bind(this)}>
                {cell}
            </td>
        );
    }
}

export default Cell;
