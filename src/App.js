import React, { Component } from 'react';
import MainMenu from './menu/MainMenu'
import Minesweeper from './game/Minesweeper'
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            menu : "MainMenu"
        }
    }

    newGame(difficulty){
        this.setState({
            menu : "Game",
            difficulty : difficulty
        });
    }

    getState() {
        console.log(this.state.menu);
        if (this.state.menu === "MainMenu") {
            return <MainMenu newGame={this.newGame.bind(this)}/>;
        } else if (this.state.menu === "Game") {
            return <Minesweeper difficulty={this.state.difficulty} />;
        }
    }

    render() {
        return (
            <div className="App">
                {this.getState()}
            </div>
        );
    }
}

export default App;
