import React, { Component } from 'react';
import Statistics from '../util/Statistics';
import './StatisticsMenu.css'

class StatisticsMenu extends Component {
    constructor(props){
        super(props)
        this.state = {
            current: 'beginner',
            stats: Statistics.GetBeginnerStats()
        }
    }

    ChangeTab(tab){
        switch (tab) {
            case "beginner":
                this.setState({current: 'beginner', stats: Statistics.GetBeginnerStats()});
                break;
            case "intermediate":
                this.setState({current: 'intermediate', stats: Statistics.GetIntermediateStats()});
                break;
            case "advanced":
                this.setState({current: 'advanced', stats: Statistics.GetAdvancedStats()});
                break;
            default:
                return;
        }
    }

    ResetStats(){
        Statistics.Reset();
        this.ChangeTab(this.state.current);
    }

    MainMenu(){
        this.props.mainMenu();
    }

    render(){
        var bestTimes = this.state.stats.topFiveTimes.map((time, index) => {
            return (
                <tr key={index}>
                    <td className="time">{time.minutes}:{time.seconds}</td>
                    <td className="date">{time.date}</td>
                </tr>
            );
        });

        var bestTimeHeaders = (() => {
            if (this.state.stats.topFiveTimes.length > 0) {
                return (
                    <tr>
                        <th>Time</th>
                        <th>Date</th>
                    </tr>
                );
            }
        })();

        return(
            <div className="StatisticsMenu">
                <div className="tab">
                    <button className={this.state.current === 'beginner' ? "tablinks active" : "tablinks"} onClick={(() => this.ChangeTab("beginner"))}>Beginner</button>
                    <button className={this.state.current === 'intermediate' ? "tablinks active" : "tablinks"} onClick={(() => this.ChangeTab("intermediate"))}>Intermediate</button>
                    <button className={this.state.current === 'advanced' ? "tablinks active" : "tablinks"} onClick={(() => this.ChangeTab("advanced"))}>Advanced</button>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <h3>Best Times</h3>
                                <table className="best-times">
                                    <tbody>
                                        {bestTimeHeaders}
                                        {bestTimes}
                                    </tbody>
                                </table>
                            </td>
                            <td>
                                <table className="general-stats">
                                    <tbody>
                                        <tr>
                                            <td>Games played</td>
                                            <td>{this.state.stats.gamesPlayed}</td>
                                        </tr>
                                        <tr>
                                            <td>Games won</td>
                                            <td>{this.state.stats.gamesWon}</td>
                                        </tr>
                                        <tr>
                                            <td>Win percent</td>
                                            <td>{this.state.stats.winPercent}</td>
                                        </tr>
                                        <tr>
                                            <td>Longest win streak</td>
                                            <td>{this.state.stats.longestWinStreak}</td>
                                        </tr>
                                        <tr>
                                            <td>Longest lose streak</td>
                                            <td>{this.state.stats.longestLoseStreak}</td>
                                        </tr>
                                        <tr>
                                            <td>Current streak</td>
                                            <td>{this.state.stats.currentStreak}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={this.ResetStats.bind(this)}>Reset</button>
                <button onClick={this.MainMenu.bind(this)}>Main Menu</button>
            </div>
        );
    }
}

export default StatisticsMenu;
