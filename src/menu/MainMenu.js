import React, { Component } from 'react';
import './MainMenu.css'

class MainMenu extends Component {
    constructor(props) {
        super (props);
        this.state = { custom: false };
    }
    newGame(difficulty) {
        this.props.newGame(difficulty);
    }

    newCustomGame(){
        this.props.newCustomGame(this.state.cols, this.state.rows, this.state.mines);
    }

    customGame(){
        this.setState({ custom: !this.state.custom });
    }

    stats(){
        this.props.statistics();
    }

    handleChange(e, target) {
        switch (target) {
            case 'cols':
                this.setState({cols: e.target.value});
                break;
            case 'rows':
                this.setState({rows: e.target.value});
                break;
            case 'mines':
                this.setState({mines: e.target.value});
                break;
            default:
                return;
        }
    }

    render() {
        return (
            <div className="MainMenu">
                <p>This is the main menu..</p>
                <button onClick={() => this.newGame("beginner")}>Beginner</button><br/>
                <button onClick={() => this.newGame("intermediate")}>Intermediate</button><br/>
                <button onClick={() => this.newGame("advanced")}>Advanced</button><br/>
                <button onClick={this.customGame.bind(this)}>Custom</button>
                <div className={this.state.custom ? "custom-settings-active" : "custom-settings"}>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <p>Columns:</p>
                                </td>
                                <td>
                                    <input type="text" value={this.state.value} onChange={(e) => this.handleChange(e, 'cols')}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Rows:</p>
                                </td>
                                <td>
                                    <input type="text" value={this.state.value} onChange={(e) => this.handleChange(e, 'rows')}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Mines:</p>
                                </td>
                                <td>
                                    <input type="text" value={this.state.value} onChange={(e) => this.handleChange(e, 'mines')}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button onClick={this.newCustomGame.bind(this)}>Submit</button>
                </div>
                <button type="button" onClick={this.stats.bind(this)}>Stats</button>
            </div>
        );
    }
}

export default MainMenu
