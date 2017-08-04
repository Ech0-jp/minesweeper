import React, { Component } from 'react';

class MainMenu extends Component {
    newBeginnerGame() {
        this.props.newGame("beginner");
    }

    newIntermediateGame() {
        this.props.newGame("intermediate");
    }

    newAdvancedGame() {
        this.props.newGame("advanced");
    }

    stats(){
        this.props.statistics();
    }

    render() {
        return (
            <div className="MainMenu">
                <p>This is the main menu..</p>
                <button type="button" onClick={this.newBeginnerGame.bind(this)}>Beginner</button>
                <button type="button" onClick={this.newIntermediateGame.bind(this)}>Intermediate</button>
                <button type="button" onClick={this.newAdvancedGame.bind(this)}>Advanced</button>
                <button type="button" onClick={this.stats.bind(this)}>Stats</button>
            </div>
        );
    }
}

export default MainMenu
