import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { BlankSVGMap } from '../components/blanksvgmap';
import GameStorageController from '../lib/GameStorageController';
import GameState from '../lib/GameState';

class Game extends Component {

    state = {
        params: {
            players: 2,
            gameStorageController: new GameStorageController(new GameState())
        }
    }
    
    map = null

    constructor(props) {
        super(props);
    }

    render() {
        // const { state } = this.props.navigation;
        const state = this.state;
        var tokens = {
            '0': 0,
            '1': 1,
            '2': 2,
        };
        return (
            <View style={{ flex: 1, width: "100%", height: "100%"}}>
                <BlankSVGMap
                    ref={map => (this.Map = map)}
                    GameStorageController={new GameStorageController(
                        new GameState(),
                        this
                    )}
                    tokens={tokens}
                    players={state.params.players}
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