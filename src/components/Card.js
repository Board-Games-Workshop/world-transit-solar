import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import DesignTile from './DesignTile';
import QuestionCard from './QuestionCard';
import TravelCard from './TravelCard';

export default class Card extends Component {

    state = {
        currentCard: '',
        color: '',
        currentPlayer: null
    }

    constructor(props) {
        super(props);
    }

    markerDesign() {
        if(this.state['color']) {
            this.props.GameStorageController.GameState.setGameColor(this.state['currentPlayer'], this.state['color']);
            this.props.GameStorageController.GameState.DESIGN_COLORS.push(this.state['color']);
            return this.state['color'];
        }
        if(this.props.GameStorageController.GameState.getGameColor(this.state['currentPlayer'])) {
            return this.props.GameStorageController.GameState.getGameColor(this.state['currentPlayer']);
        }
        let colors = this.props.BoardScale.getMarkerColours.map((color, index) => {
            if(this.props.GameStorageController.GameState.DESIGN_COLORS.indexOf(color) === -1) {
                return color;
            }
        });
        let color = colors[Math.floor(Math.random() * colors.length)];
        this.props.GameStorageController.GameState.setGameColor(this.state['currentPlayer'], color);
        this.props.GameStorageController.GameState.DESIGN_COLORS.push(color);
        return color;
    }

    markerQuestion() {
        if(this.state['color']) {
            this.props.GameStorageController.GameState.setGameColor(this.state['currentPlayer'], this.state['color']);
            this.props.GameStorageController.GameState.DESIGN_COLORS.push(this.state['color']);
            return this.state['color'];
        }
        if(this.props.GameStorageController.GameState.getGameColor(this.state['currentPlayer'])) {
            return this.props.GameStorageController.GameState.getGameColor(this.state['currentPlayer']);
        }
        let colors = this.props.BoardScale.getMarkerColours.map((color, index) => {
            if(this.props.GameStorageController.GameState.QUESTION_COLORS.indexOf(color) === -1) {
                return color;
            }
        });
        let color = colors[Math.floor(Math.random() * colors.length)];
        this.props.GameStorageController.GameState.setGameColor(this.state['currentPlayer'], color);
        this.props.GameStorageController.GameState.QUESTION_COLORS.push(color);
        return color;
    }

    markerTravel() {
        let currentColor = this.props.GameStorageController.GameState.getGameColor(this.state['currentPlayer']);
        let colors = this.props.BoardScale.getMarkerColours.map((color, index) => {
            if(this.props.GameStorageController.GameState.DESIGN_COLORS.indexOf(color) === -1 && 
                this.props.GameStorageController.GameState.QUESTION_COLORS.indexOf(color) === -1 && 
                color !== currentColor) {
                return color;
            }
        });
        return colors;
    }

    showCard() {
        let card = null;
        switch(this.state['currentCard']) {
            case "design_card":
                card = <View style={this.styles.design}><DesignTile Map={this.props.Map} ref={currentCard => (this.currentCard = currentCard)} markerDesign={this.markerDesign()} /></View>
                break;
            case "question_card":
                card = <View style={this.styles.question}><QuestionCard Map={this.props.Map} GameController={this.props.GameController} ref={currentCard => (this.currentCard = currentCard)} markerQuestion={this.markerQuestion()} /></View>
                break;
            case "travel_card":
                card = <View style={this.styles.travel}><TravelCard Map={this.props.Map} Card={this} ref={currentCard => (this.currentCard = currentCard)} markerTravel={this.markerTravel()} /></View>
                break;
            default:
                break;
        }
        return card;
    }

    render() {
        return (
            <View style={this.styles.cardContainer}>
                <View style={this.styles.card}>
                    {this.showCard()}
                </View>
            </View>
        )
    }

    componentDidMount() {
        if(this.state['currentCard']) {
            this.styles.card.display = "flex";
            if((this.currentCard.card_type === DesignTile.CARD_TYPE)) {
                this.currentCard.setState({
                    location: this.props.GameController.currentAnswer
                });
            }
        }
    }

    componentWillUpdate() {
        if(this.state['currentCard']) {
            console.log(this.state['currentCard']);
            this.styles.cardContainer['display'] = "flex";
            this.styles.card['display'] = "flex";
            this.styles.question['display'] = "flex";
        }
    }

    styles = StyleSheet.create({
        design: {

        },
        question: {
            display: "none",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            backgroundColor: 'transparent'
        },
        travel: {

        },
        cardContainer: {
            display: "none", // display: "flex"
            width: "30%",
            height: "30%",
            left: "35%",
            top: "35%",
            backgroundColor: 'green'
        },
        card: {
            position: "absolute",
            display: "none",
            width: "100%",
            height: "100%",
            left: "0",
            top: "0"
        },
        game: {
            zIndex: 1
        }
    });

}