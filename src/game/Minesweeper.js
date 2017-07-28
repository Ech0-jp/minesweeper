import React, { Component } from 'react'
import Popup from 'react-popup'
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
                this.state = {difficulty: "beginner", numMines: NUM_BEGINNER_MINES, cols: BEGINNER_COLS, rows: BEGINNER_ROWS, cellsShown: 0, flaggedCells: 0}
                break;
            case "intermediate":
                this.state = {difficulty: "intermediate", numMines: NUM_INTERMEDIATE_MINES, cols: INTERMEDIATE_COLS, rows: INTERMEDIATE_ROWS, cellsShown: 0, flaggedCells: 0}
                break;
            case "advanced":
                this.state = {difficulty: "advanced", numMines: NUM_ADVANCED_MINES, cols: ADVANCED_COLS, rows: ADVANCED_ROWS, cellsShown: 0, flaggedCells: 0}
                break;
        }
        this.generatePopups();
    }

    generatePopups(){
        Popup.registerPlugin('win', function(parent){
            this.create({
                title: 'Game Over',
                content: 'You win!',
                buttons: {
                    right: [{
                        text: 'Main menu',
                        action: function(){
                            parent.props.mainMenu();
                            Popup.close();
                        }
                    }, {
                        text: 'Play again',
                        action: function(){
                            parent.newGame();
                            Popup.close();
                        }
                    }]
                }
            })
        });

        Popup.registerPlugin('lose', function(parent){
            this.create({
                title: 'Game Over',
                content: 'You lose!',
                buttons: {
                    right: [{
                        text: 'Main Menu',
                        action: function(){
                            parent.props.mainMenu();
                            Popup.close()
                        }
                    }, {
                        text: 'Restart this game',
                        action: function(){
                            parent.restartGame();
                            Popup.close();
                        }
                    }, {
                        text: 'Play again',
                        action: function(){
                            parent.newGame();
                            Popup.close();
                        }
                    }]
                }
            })
        })
    }

    cellFlagged(flagged){
        this.setState({flaggedCells: flagged ? this.state.flaggedCells + 1 : this.state.flaggedCells - 1})
    }

    cellShown(){
        this.setState({cellsShown: ++ this.state.cellsShown});
        var cellsToShow = ((this.state.cols * this.state.rows) - this.state.numMines);
        console.log('cellsToShow: ' + cellsToShow + ', cellsShown: ' + this.state.cellsShown);
        if (cellsToShow === this.state.cellsShown)
            this.gameOver(true);
    }

    gameOver(win){
        if (win) {
            Popup.plugins().win(this);
        } else {
            Popup.plugins().lose(this);
        }
    }

    newGame(){
        this.gameBoard.newGame();
    }

    restartGame(){
        this.gameBoard.restart();
    }

    render(){
        return (
            <div className="Minesweeper">
                <GameBoard difficulty={this.state.difficulty} numMines={this.state.numMines} cols={this.state.cols} rows={this.state.rows}
                                      cellFlagged={this.cellFlagged.bind(this)} cellShown={this.cellShown.bind(this)} gameOver={this.gameOver.bind(this)}
                                      ref={(instance) => { this.gameBoard = instance }}/>
                <div className="GameStats">
                    <p>Mines left: {this.state.numMines - this.state.flaggedCells}</p>
                </div>
            </div>
        );
    }
}

export default Minesweeper;
