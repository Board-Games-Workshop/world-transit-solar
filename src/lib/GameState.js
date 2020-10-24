import BlankSVGMap from '../components/blanksvgmap';

export default class GameState {

    static score = {true: 1, false: 0};
    
    constructor(props) {
        this.PLAYERS = {};
        this.TOKENS = {};
        this.TOKEN_VARIATIONS = {};
        this.TOKEN_MARKERS = {};
        this.DESIGN_COLORS = [];
        this.QUESTION_COLORS = [];
        this.TRAVEL_COLORS = [];
    }

    getTokenLocation(variation) {
        const {x, y, color} = this.TOKENS[variation];
        return {'x': x, 'y': y};
    }

    getTokensInLocation(markerColor) {
        let tokenMarkers = this.TOKEN_MARKERS[markerColor];
        if (Object.keys(tokenMarkers).length != 0) {
            return tokenMarkers;
        }
        return null;
    }

    getGameColor(player) {
        return this.PLAYERS.hasOwnProperty(player.toString()) && this.PLAYERS[player.toString()].hasOwnProperty("game") ? 
        this.PLAYERS[player.toString()]['game'] : null;
    }

    setGameColor(player, color) {
        this.PLAYERS[player.toString()]['game'] = color;
    }

}