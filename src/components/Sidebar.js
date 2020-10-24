import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ListItem, Image } from 'react-native-elements';
import TravelCard from './TravelCard';
import DesignTile from './DesignTile';
import QuestionCard from './QuestionCard';

export default class Sidebar extends Component {

    state = {
        colors: []
    }

    constructor(props) {
        super(props);
    }

    onPress(row, color) {
        return function(event) {
            const { currentCard } = this.props.GameController.card.state;
            this.props.GameController.currentAnswer = row.Dest;
            this.props.GameController.currentQuestion = color;
            this.styles.sidebar['display'] = "none";
            if(currentCard === TravelCard.CARD_TYPE) {
                this.styles.tile = "flex";
            }
        }
    }

    onChooseTile(event) {
        const { target } = event;
        let player = this.props.GameController.currentPlayer;
        this.props.GameController.card.setState({
            currentCard: target.props.tile,
            color: this.props.GameController.currentQuestion
        });
        this.props.GameController.chooseLocation(player, this.props.GameController.currentQuestion);
    }

    render() {
        return (
            <View style={this.styles.sidebar}>
                {
                    this.state['colors'].map((color, index) => {
                        const map = this.props.GameController.Map;
                        const BoardScale = this.props.GameController.props.BoardScale;
                        const row = map.data[map.LOCATIONS[BoardScale.getMarkerColours.indexOf(color)]];
                        <Text style={{backgroundColor: color, width: "80%", marginLeft: "20%", marginRight: "20%"}}
                            onPress={this.onPress(row, color)}>
                            <Text>{row.Dest}</Text>
                            <Text>{row.Latitude}, {row.Longitude}</Text>
                        </Text>
                    })
                }
                <View style={this.styles.tile}>
                    <ListItem style={this.styles.icon} onPress={this.onChooseTile} tile={DesignTile.CARD_TYPE}>
                        <Image
                        style={{width: 100, height: 50}}
                        source={require('../../assets/img/tile/design.png')}
                        />
                    </ListItem>
                    <ListItem style={this.styles.icon} onPress={this.onChooseTile} tile={QuestionCard.CARD_TYPE}>
                        <Image
                        style={{width: 100, height: 50}}
                        source={require('../../assets/img/tile/question.png')}
                        />
                    </ListItem>
                </View>
            </View>
        )
    }

    styles = StyleSheet.create({
        sidebar: {
            flex: 2,
            right: "5%"
        },
        icon: {
    
        },
        tile: {
            display: "none"
        }
    });

}