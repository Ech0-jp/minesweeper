import React, { Component } from 'react';
import Popup from 'react-popup';
import GameBoard from './GameBoard';
import Statistics from '../util/Statistics';

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
        this.state = {
            cellsShown: 0,
            flaggedCells: 0,
            gameOverState: 0,
            minutes: 0,
            seconds: 0
        }
        this.setDifficulty();
        this.generatePopups();
        this.timerStarted = false;
        this.interval = [];
    }

    setDifficulty(){
        switch (this.props.difficulty) {
            case "beginner":
                this.numMines = NUM_BEGINNER_MINES;
                this.cols = BEGINNER_COLS;
                this.rows = BEGINNER_ROWS;
                break;
            case "intermediate":
                this.numMines = NUM_INTERMEDIATE_MINES;
                this.cols = INTERMEDIATE_COLS;
                this.rows = INTERMEDIATE_ROWS;
                break;
            case "advanced":
                this.numMines = NUM_ADVANCED_MINES;
                this.cols = ADVANCED_COLS;
                this.rows = ADVANCED_ROWS;
                break;
            default:
                return;
        }
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
        if (!this.timerStarted) {
            this.interval = setInterval(this.timer.bind(this), 1000);
            this.timerStarted = true;
        }
        this.setState({cellsShown: ++ this.state.cellsShown});
        var cellsToShow = ((this.cols * this.rows) - this.numMines);
        if (cellsToShow === this.state.cellsShown)
            this.gameOver(true);
    }

    gameOver(win){
        clearInterval(this.interval);
        this.timerStarted = false;
        this.setState({gameOverState : true});
        Statistics.Add(this.props.difficulty, this.state.minutes, this.state.seconds, win);
        setTimeout(this.showPopup(win), 10000000000000);
    }

    timer(){
        this.setState({seconds: ++this.state.seconds});
        if (this.state.seconds % 60 === 0) {
            this.setState({minutes: ++this.state.minutes, seconds: 0})
        }
    }

    showPopup(win) {
        if (win) {
            Popup.plugins().win(this);
        } else {
            Popup.plugins().lose(this);
        }
    }

    newGame(){
        this.setState({minutes: 0, seconds: 0, cellsShown: 0, flaggedCells: 0,  gameOverState : false});
        this.gameBoard.newGame();
    }

    restartGame(){
        this.setState({minutes: 0, seconds: 0, cellsShown: 0, flaggedCells: 0,  gameOverState : false});
        this.gameBoard.restart();
    }

    render(){
        return (
            <div className="Minesweeper">
                <GameBoard numMines={this.numMines} cols={this.cols} rows={this.rows}
                                      cellFlagged={this.cellFlagged.bind(this)} cellShown={this.cellShown.bind(this)} gameOver={this.gameOver.bind(this)}
                                      gameOverState={this.state.gameOverState}
                                      ref={(instance) => { this.gameBoard = instance }}/>
                <div className="GameStats">
                    <p>Mines left: {this.numMines - this.state.flaggedCells}</p>
                    <p>Time: {this.state.minutes}:{this.state.seconds}</p>
                </div>
            </div>
        );
    }
}

export default Minesweeper;
