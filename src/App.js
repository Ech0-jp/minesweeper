import React, { Component } from 'react';
import Popup from 'react-popup';
import MainMenu from './menu/MainMenu';
import Minesweeper from './game/Minesweeper';
import logo from './logo.svg';
import './App.css';
import './Popup.css'

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            menu : "MainMenu"
        }
    }

    mainMenu(){
        this.setState({
            menu : "MainMenu"
        })
    }

    newGame(difficulty){
        this.setState({
            menu : "Game",
            difficulty : difficulty
        });
    }

    getState() {
        if (this.state.menu === "MainMenu") {
            return <MainMenu newGame={this.newGame.bind(this)}/>;
        } else if (this.state.menu === "Game") {
            return <Minesweeper difficulty={this.state.difficulty} mainMenu={this.mainMenu.bind(this)} />;
        }
    }

    render() {
        return (
            <div className="App">
                <Popup className="mm-popup" btnClass="mm-popup__btn" closeBtn={false} closeHtml={null} defaultOk="Ok"
                    defaultCancel="Cancel" wildClasses={false} closeOnOutsideClick={false} />
                {this.getState()}
            </div>
        );
    }
}

export default App;
