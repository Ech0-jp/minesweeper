import React, { Component } from 'react'

class MainMenu extends Component {
    constructor(props){
        super(props);
    }

    newBeginnerGame() {
        this.props.newGame("beginner");
    }

    newIntermediateGame() {
        this.props.newGame("intermediate");
    }

    newAdvancedGame() {
        this.props.newGame("advanced");
    }

    render() {
        return (
            <div className="MainMenu">
                <p>This is the main menu..</p>
                <button type="button" onClick={this.newBeginnerGame.bind(this)}>Beginner</button>
                <button type="button" onClick={this.newIntermediateGame.bind(this)}>Intermediate</button>
                <button type="button" onClick={this.newAdvancedGame.bind(this)}>Advanced</button>
            </div>
        );
    }
}

export default MainMenu
