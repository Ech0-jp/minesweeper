import Cookie from 'universal-cookie';

var Statistics = (function() {
    var instance;

    function init(){
        const cookie = new Cookie();

        var beginner = {};
        var intermediate = {};
        var advanced = {};

        function SaveStatistics(){
            var data = {
                beginner: beginner,
                intermediate: intermediate,
                advanced: advanced
            };
            cookie.set('minesweeper_statistics', data, { path: '/' });
        }

        function defaultStats(){
            return {
                topFiveTimes: [],
                gamesPlayed: 0,
                gamesWon: 0,
                winPercent: 0,
                longestWinStreak: 0,
                longestLoseStreak: 0,
                currentStreak: 0
            };
        }

        function AddStats(topFiveTimes, gamesPlayed, gamesWon, winPercent, longestWinStreak, longestLoseStreak, currentStreak, time, win) {
            gamesPlayed++;
            if (win) {
                gamesWon++;

                if (currentStreak < 0) {
                    currentStreak = 1;
                } else {
                    currentStreak++
                }

                if (currentStreak > longestWinStreak) {
                    longestWinStreak = currentStreak;
                }

                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1;
                var yyyy =  today.getFullYear();
                if (dd < 10) {
                    dd = '0' + dd;
                }
                if (mm < 10) {
                    mm = '0' + mm;
                }
                today = mm + '/' + dd + '/' + yyyy;

                if (topFiveTimes.length === 5) {
                    topFiveTimes[4] = { minutes: time.minutes, seconds: time.seconds, date: today };
                } else {
                    topFiveTimes.push({ minutes: time.minutes, seconds: time.seconds, date: today });
                }

                topFiveTimes.sort(function(a, b) {
                    if (a.minutes === b.minutes) {
                        if (a.seconds > b.seconds) {
                            return 1;
                        }
                        if (a.seconds < b.seconds) {
                            return -1;
                        }
                    }
                    if (a.minutes > b.minutes) {
                        return 1;
                    }
                    if (a.minutes < b.minutes) {
                        return -1;
                    }
                    return 0;
                });
            } else {
                if (currentStreak > 0) {
                    currentStreak = -1;
                } else {
                    currentStreak--;
                }

                if ((currentStreak * -1) > longestLoseStreak) {
                    longestLoseStreak = currentStreak * -1;
                }
            }
            winPercent = (gamesWon / gamesPlayed).toFixed(2);
            return {
                topFiveTimes: topFiveTimes,
                gamesPlayed: gamesPlayed,
                gamesWon: gamesWon,
                winPercent: winPercent,
                longestWinStreak: longestWinStreak,
                longestLoseStreak: longestLoseStreak,
                currentStreak: currentStreak
            };
        }

        return {
            Add: function(difficulty, minutes, seconds, win) {
                switch (difficulty) {
                    case 'beginner':
                        beginner = AddStats(beginner.topFiveTimes, beginner.gamesPlayed, beginner.gamesWon, beginner.winPercent, beginner.longestWinStreak,
                                                        beginner.longestLoseStreak, beginner.currentStreak, {minutes: minutes, seconds: seconds}, win);
                        break;
                    case 'intermediate':
                        intermediate = AddStats(intermediate.topFiveTimes, intermediate.gamesPlayed, intermediate.gamesWon, intermediate.winPercent, intermediate.longestWinStreak,
                                                    intermediate.longestLoseStreak, intermediate.currentStreak, {minutes: minutes, seconds: seconds}, win);
                        break;
                    case 'advanced':
                        advanced = AddStats(advanced.topFiveTimes, advanced.gamesPlayed, advanced.gamesWon, advanced.winPercent, advanced.longestWinStreak,
                                                    advanced.longestLoseStreak, advanced.currentStreak, {minutes: minutes, seconds: seconds}, win);
                        break
                    default:
                        return;
                }
                SaveStatistics();
            },
            Load: function(){
                var data = cookie.get('minesweeper_statistics', { path: '/' });
                if (data !== undefined) {
                    beginner = data.beginner;
                    intermediate = data.intermediate;
                    advanced = data.advanced;
                } else {
                    beginner = defaultStats();
                    intermediate = defaultStats();
                    advanced = defaultStats();
                }
            },
            GetBeginnerStats: function(){
                console.log('retrieving beginner stats: ');
                console.log(beginner);
                return beginner;
            },
            GetIntermediateStats: function(){
                console.log('retrieving intermediate stats: ');
                console.log(intermediate);
                return intermediate;
            },
            GetAdvancedStats: function(){
                console.log('retrieving advanced stats: ');
                console.log(advanced);
                return advanced;
            },
            Reset: function(){
                cookie.remove('minesweeper_statistics', { path: '/' });
                beginner = defaultStats();
                intermediate = defaultStats();
                advanced = defaultStats();
            }
        }
    }

    return {
        getInstance: function(){
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    }
})();

export default Statistics.getInstance();
