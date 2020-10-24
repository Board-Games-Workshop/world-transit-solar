import BoardScale from '../components/BoardScale';

export default class GameStorageController {

    constructor(gameState, map, props) {
        this.GameState = gameState;
        this.map = map;
    }
    
    getTokenCoordinates(markerColor, variation) {
        let initialTokenLocation = this.GameState.getTokenLocation(map, variation);
        let tokensInLocation = this.GameState.getTokensInLocation(map, markerColor);
        const row = map.data[map.LOCATIONS[BoardScale.getMarkerColours.indexOf(markerColor)]];
        const color = row.Hex;
        let {x, y} = BlankSVGMap.getMarkerCoordinates(row.Latitude, row.Longitude);
        if (tokensInLocation && tokensInLocation.hasOwnProperty(variation)) {
            return tokensInLocation;
        }
        return null;
    }

}