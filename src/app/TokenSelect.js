import React, { Component } from 'react';
import { BlankSVGMap } from '../components/blanksvgmap';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Button } from 'react-native-elements';
import GameState from '../lib/GameState';
import GameStorageController from '../lib/GameStorageController';

export default class TokenSelect extends Component {

    static navigationOptions = {
        title: 'Select Tokens',
    };

    colors = ['aqua', 'blue', 'green', 'red', 'violet', 'yellow'];

    constructor(props) {
        super(props);
    }

    onTouchStart(players, tokenVariations) {
        let navigation = this.props.navigation;
        return function(event) {
            const { state, setParams } = navigation;
            setParams({
                tokenVariations: tokenVariations,
                players: players
            });
            let gameState = new GameState({});
            let gameStorageController = new GameStorageController(gameState, this.TokenSelect, {});
            navigation.replace('Game', {
                gameStorageController: gameStorageController,
                tokens: state.params.tokenVariations,
                players: state.params.players
            });
        }
    }

    render() {
        const { state, setParams } = this.props.navigation;
        let players = [];
        let tokenVariations = {};
        for(let i = 1; i <= state.params.players; i++) {
            players.push(i);
        }
        players.map((player,index) => {
            tokenVariations[index.toString()] = BlankSVGMap.getTokenVariations[index];
        });
        const cards = players.map((player, index) => {
            const key = "token-select-" + index.toString();
            return (
                <TouchableOpacity key={key} TokenSelect={this}>
                    <Card style={{position: "relative",display: "flex",width: "20%",height: "20%"}}></Card>
                </TouchableOpacity>
            );
        });

        return (
            <View style={style.page}>
                <View style={{width: "100%", height: "80%"}}>
                    {cards}
                </View>
                <TouchableOpacity onPress={this.onTouchStart(players, tokenVariations)} TokenSelect={this}>
                    <View style={{width: "100%", height: "20%"}}>
                        <Button>Play Game</Button>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

}

const style = StyleSheet.create({
    aqua: {
        backgroundColor: "aqua",
        top: 0,
        left: "0%"
    },
    blue: {
        backgroundColor: "blue",
        top: 0,
        left: "33%"
    },
    green: {
        backgroundColor: "green",
        top: 0,
        left: "66%"
    },
    red: {
        backgroundColor: "red",
        top: 40,
        left: "0%"
    },
    violet: {
        backgroundColor: "violet",
        top: 40,
        left: "33%"
    },
    yellow: {
        backgroundColor: "yellow",
        top: 40,
        left: "66%"
    },
    tokenVariation: {
        position: "relative",
        display: "flex",
        width: "20%",
        height: "20%"
    },
    page: {
        width: "100%",
        height: "100%"
    }    
});