import React, { Component } from 'react';
import { BlankSVGMap } from '../components/blanksvgmap';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Card } from 'react-native-elements';
import GameState from '../lib/GameState';

export default class TokenSelect extends Component {

    static navigationOptions = {
        title: 'Select Tokens',
    };

    state = {
        params: {
            tokenVariations: 0,
            players: 0
        }
    }

    colors = ['aqua', 'blue', 'green', 'red', 'violet', 'yellow'];

    constructor(props) {
        super(props);
    }

    onTouchStart(players, tokenVariations) {
        const { setParams } = this.props.navigation;
        const { params } = this.props.route;
        let gameState = new GameState({});
        this.props.navigation.navigate('Game', {
            gameState: gameState,
            tokens: tokenVariations,
            players: players
        });
    }

    render() {
        const { setParams } = this.props.navigation;
        const { params } = this.props.route;
        let players = [];
        let tokenVariations = {};
        for(let i = 1; i <= params.players; i++) {
            players.push(i);
        }
        players.map((player,index) => {
            tokenVariations[index.toString()] = BlankSVGMap.getTokenVariations[index];
        });
        const cards = players.map((player, index) => {
            const key = "token-select-" + index.toString();
            return (
                <TouchableOpacity key={key} style={style.tokenVariation}>
                    <Card></Card>
                </TouchableOpacity>
            );
        });

        return (
            <View style={style.page}>
                <View style={{width: "100%", height: "80%"}}>
                    {cards}
                </View>
                <TouchableOpacity style={style.button} onPress={() => this.onTouchStart(players, tokenVariations)}>
                    <View style={{width: "100%", height: "20%"}}>
                        <Text>Play Game</Text>
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
    },
    button: {
        width: "100%",
        height: "10%",
        textAlign: 'center',
        backgroundColor: "aqua",
        padding: 10,
        marginBottom: 10,
        alignItems: 'center'
    }
});