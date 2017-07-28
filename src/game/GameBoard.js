import React, { Component } from 'react'
import Row from './Row.js'
import './GameBoard.css'

class GameBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rows : this.generateBoard(props)
        }
    }

    newGame(){
        this.setState({
            rows : this.generateBoard(this.props)
        })
    }

    generateBoard(props){
        var board = [];

        for (var x = 0; x < props.rows; x++) {
            board.push([]);
            for (var y = 0; y < props.cols; y++) {
                board[x].push({
                    x : x,
                    y : y,
                    show : false,
                    mineCount : 0,
                    isMine : false,
                    flagged : false
                });
            }
        }

        for (var i = 0; i < props.numMines; i++) {
            var cell = board[Math.floor(Math.random() * props.rows)][Math.floor(Math.random() * props.cols)]
            if (cell.isMine)
                i--;
            else
                cell.isMine = true;
        }

        return board;
    }

    restart(){
        var _rows = this.state.rows;
        for (var x = 0; x < this.props.rows; x++) {
            for (var y = 0; y < this.props.cols; y++) {
                _rows[x][y].show = false;
                _rows[x][y].flagged = false;
            }
        }
        this.setState({
            rows: _rows
        });
    }

    flagCell(cell) {
        var _rows = this.state.rows;
        _rows[cell.x][cell.y].flagged = !cell.flagged;
        this.setState({rows: _rows});
        this.props.cellFlagged(_rows[cell.x][cell.y].flagged);
    }

    showCell(cell) {
        if (cell.isMine) {
            this.props.gameOver(false);
            return;
        }

        var mineCount = this.countMines(cell);
        var _rows = this.state.rows;

        _rows[cell.x][cell.y].show = true;
        _rows[cell.x][cell.y].mineCount = mineCount;
        this.setState({rows: _rows});
        this.props.cellShown();

        if (cell.flagged) {
            _rows[cell.x][cell.y].flagged = false;
            this.setState({rows: _rows});
            this.props.cellFlagged(false);
        }

        if (mineCount === 0) {
            this.showNeighbouringCells(cell);
        }
    }

    showNeighbouringCells(cell) {
        for (var xoff = -1; xoff <= 1; xoff++) {
            for (var yoff = -1; yoff <= 1; yoff++) {
                var x = cell.x + xoff;
                var y = cell.y + yoff;
                if  (x > -1 && x < this.props.rows && y > -1 && y < this.props.cols) {
                    if (!this.state.rows[x][y].show) {
                        this.showCell(this.state.rows[x][y])
                    }
                }
            }
        }
    }

    countMines(cell) {
        if (cell.isMine)
            return -1;
        var count = 0;

        for (var xoff = -1; xoff <= 1; xoff++) {
            for (var yoff = -1; yoff <= 1; yoff++) {
                var x = cell.x + xoff;
                var y = cell.y + yoff;
                if  (x > -1 && x < this.props.rows && y > -1 && y < this.props.cols) {
                    if (this.state.rows[x][y].isMine)
                        count++;
                }
            }
        }
        return count;
    }

    render(){
        var Rows = this.state.rows.map((row, index) => {
            return (
                <Row key={index} cells={row} showCell={this.showCell.bind(this)} flagCell={this.flagCell.bind(this)} />
            );
        });
        return(
            <table className="game-board" cellspacing="0">
                <tbody>
                    {Rows}
                </tbody>
            </table>
        );
    }
}

export default GameBoard;
