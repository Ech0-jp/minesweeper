import React, { Component } from 'react';
import Popup from 'react-popup';
import MainMenu from './menu/MainMenu';
import StatisticsMenu from './menu/StatisticsMenu';
import Minesweeper from './game/Minesweeper';
import Statistics from './util/Statistics'
import logo from './logo.svg';
import './App.css';
import './Popup.css'

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            menu : "MainMenu"
        }
        Statistics.Load();
    }

    mainMenu(){
        this.setState({
            menu : "MainMenu"
        });
    }

    statistics(){
        this.setState({
            menu : "Statistics"
        });
    }

    newGame(difficulty){
        this.setState({
            menu : "Game",
            difficulty : difficulty
        });
    }

    getState() {
        if (this.state.menu === "MainMenu") {
            return <MainMenu newGame={this.newGame.bind(this)} statistics={this.statistics.bind(this)}/>;
        } else if (this.state.menu === "Statistics") {
            return <StatisticsMenu mainMenu={this.mainMenu.bind(this)}/>;
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
