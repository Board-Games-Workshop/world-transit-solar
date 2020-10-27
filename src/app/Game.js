import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { BlankSVGMap } from '../components/blanksvgmap';
import GameStorageController from '../lib/GameStorageController';
import GameState from '../lib/GameState';
import { PLAYERS } from '../../tests/App/public/constants/player';

class Game extends Component {

    map = null

    constructor(props) {
        super(props);
    }

    render() {
        const { params } = this.props.route;
        return (
            <View style={{ flex: 1, width: "100%", height: "100%"}}>
                <BlankSVGMap
                    ref={map => (this.Map = map)}
                    GameStorageController={new GameStorageController(
                        params.gameState,
                        this
                    )}
                    tokens={params.tokens}
                    players={params.players}
                />
            </View>
        );
    }

}

export default Game;

const styles = StyleSheet.create({
    shniytile: {
        // background: "linear-gradient(to right top, #333, #333 10%, #eee 20%, #333 30%)"
        backgroundColor: "#333"
    },
    
    shinyappearance: {
        position: "relative"
    },
    
    shinyappearance_after: {
        // transform:"translateX(100%)",
        zIndex:1,
        width:"100%",
        // content:'',
        position: "absolute",
        top: "0"
    }
});