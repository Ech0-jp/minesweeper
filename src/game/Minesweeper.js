import React, { Component } from 'react'
import GameBoard from './GameBoard'

const NUM_BEGINNER_MINES = 10;
const BEGINNER_COLS = 9;
const BEGINNER_ROWS = 9;

const NUM_INTERMEDIATE_MINES = 40;
const INTERMEDIATE_COLS = 16;
const INTERMEDIATE_ROWS = 16;

const NUM_ADVANCED_MINES = 99;
const ADVANCED_COLS = 30;
const ADVANCED_ROWS = 16;

class Minesweeper extends Component {
    constructor(props) {
        super(props);
        switch (props.difficulty) {
            case "beginner":
                this.state = {difficulty: "beginner", numMines: NUM_BEGINNER_MINES, cols: BEGINNER_COLS, rows: BEGINNER_ROWS}
                break;
            case "intermediate":
                this.state = {difficulty: "intermediate", numMines: NUM_INTERMEDIATE_MINES, cols: INTERMEDIATE_COLS, rows: INTERMEDIATE_ROWS}
                break;
            case "advanced":
                this.state = {difficulty: "advanced", numMines: NUM_ADVANCED_MINES, cols: ADVANCED_COLS, rows: ADVANCED_ROWS}
                break;
        }
    }

    render(){
        return (
            <div className="Minesweeper">
                <GameBoard difficulty={this.state.difficulty} numMines={this.state.numMines} cols={this.state.cols} rows={this.state.rows} />
            </div>
        );
    }
}

export default Minesweeper;
