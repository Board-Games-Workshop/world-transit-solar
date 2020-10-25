import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Button } from 'react-native';
import DesignTile from './DesignTile';
import QuestionCard from './QuestionCard';
import TravelCard from './TravelCard';

const QUESTION_COLORS = [ '#2641D8', '#358427', '#D62B2B', '#000000', '#7E726F', '#396b63', '#30CFD0', '#7DCC27', '#C68327', '#7F27CA', '#7E8DD5', 
'#268B8F', '#C72882', '#7DD58E', '#7E2D2D', '#D58D8D', '#26D744', '#362782', '#D542D7', '#D5D843' ];

export default class Screen extends Component {

    state = {
        showBoard: false,
        machine_state: 'start' // 'start', 'play', 'selection', 'selected', 'submit'
    }

    constructor(props) {
        super(props);
        this.playQuestion = this.playQuestion.bind(this);
        this.playTravel = this.playTravel.bind(this);
        this.playDesign = this.playDesign.bind(this);
        this.playQuestionDisabled = this.playQuestionDisabled.bind(this);
        this.playTravelDisabled = this.playTravelDisabled.bind(this);
        this.playDesignDisabled = this.playDesignDisabled.bind(this);
    }

    playQuestionDisabled() {
        let GameController = this.props.GameController;
        let GameState = GameController.props.GameStorageController.GameState;
        let nextPlayer = (this.props.GameController.currentPlayer+1) % 
        Object.keys(this.props.GameController.props.tokens).length;
        let questionsRemaining = GameState.QUESTION_COLORS.indexOf(GameState.getGameColor(nextPlayer));
        return questionsRemaining == -1 && (this.state['machine_state'] !== "play") && (this.state['machine_state'] !== "start");
    }

    playTravelDisabled() {
        let GameController = this.props.GameController;
        let GameState = GameController.props.GameStorageController.GameState;
        let nextPlayer = (this.props.GameController.currentPlayer+1) % 
        Object.keys(this.props.GameController.props.tokens).length;
        let travelRemaining = GameState.TRAVEL_COLORS.indexOf(GameState.getGameColor(nextPlayer));
        return travelRemaining == -1 && (this.state['machine_state'] !== "play") && (this.state['machine_state'] !== "start");
    }

    playDesignDisabled() {
        let GameController = this.props.GameController;
        let GameState = GameController.props.GameStorageController.GameState;
        let nextPlayer = (this.props.GameController.currentPlayer+1) % 
        Object.keys(this.props.GameController.props.tokens).length;
        let designRemaining = GameState.DESIGN_COLORS.indexOf(GameState.getGameColor(nextPlayer));
        return designRemaining == -1 && (this.state['machine_state'] !== "play") && (this.state['machine_state'] !== "start");
    }

    playQuestion() {
        let nextPlayer = null;
        let GameController = this.props.GameController;
        let GameState = GameController.props.GameStorageController.GameState;
        if(this.state['machine_state'] == "play") {
            nextPlayer = (this.props.GameController.currentPlayer+1) % Object.keys(this.props.GameController.props.tokens).length;
        } else {
            nextPlayer = (this.props.GameController.currentPlayer) % Object.keys(this.props.GameController.props.tokens).length;
        }
        this.props.GameController.card.setState({
            currentCard: QuestionCard.CARD_TYPE,
            color: GameState.getGameColor(nextPlayer),
            currentPlayer: nextPlayer
        });
        this.setState({
            machine_state: 'selection'
        });
        console.log(this.props.GameController.card);
        this.props.GameController.card.setState({
            currentCard: 'question_card',
            color: QUESTION_COLORS[nextPlayer]
        });
    }

    playTravel() {
        let nextPlayer = null;
        let GameController = this.props.GameController;
        let GameState = GameController.props.GameStorageController.GameState;
        if(this.state['machine_state'] == "play") {
            nextPlayer = (this.props.GameController.currentPlayer+1) % Object.keys(this.props.GameController.props.tokens).length;
        } else {
            nextPlayer = (this.props.GameController.currentPlayer) % Object.keys(this.props.GameController.props.tokens).length;
        }
        this.props.GameController.card.setState({
            currentCard: TravelCard.CARD_TYPE,
            color: GameState.getGameColor(nextPlayer),
            currentPlayer: nextPlayer
        });
        this.setState({
            machine_state: 'selection'
        });
    }

    playDesign() {
        let nextPlayer = null;
        let GameController = this.props.GameController;
        let GameState = GameController.props.GameStorageController.GameState;
        if(this.state['machine_state'] == "play") {
            nextPlayer = (this.props.GameController.currentPlayer+1) % Object.keys(this.props.GameController.props.tokens).length;
        } else {
            nextPlayer = (this.props.GameController.currentPlayer) % Object.keys(this.props.GameController.props.tokens).length;
        }
        this.props.GameController.card.setState({
            currentCard: DesignTile.CARD_TYPE,
            color: GameState.getGameColor(nextPlayer),
            currentPlayer: nextPlayer
        });
        this.setState({
            machine_state: 'selection'
        });
    }

    render() {
        return (
            <View style={this.styles.screen}>
                <View style={this.styles.sidebar}>
                    <TouchableOpacity Screen={this}>
                        <Button onPress={this.playQuestion} title="Question"
                            style={this.styles.button}
                            disabled={this.playQuestionDisabled()}
                            titleStyle={{ fontWeight: 'bold', fontSize: 18, marginLeft: 15, display: "none" }}
                            containerStyle={this.styles.buttonContainer}
                            icon={{
                                name: 'question',
                                type: 'font-awesome',
                                size: 50,
                                color: 'red'
                            }}
                            iconContainerStyle={this.styles.iconContainer}
                            buttonStyle={{
                                borderWidth: 0,
                                borderColor: 'transparent',
                                borderRadius: 20
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity Screen={this}>
                        <Button onPress={this.playTravel} title="Travel"
                            style={this.styles.button}
                            disabled={this.playTravelDisabled()}
                            titleStyle={{ fontWeight: 'bold', fontSize: 18, marginLeft: 15, display: "none" }}
                            containerStyle={this.styles.buttonContainer}
                            icon={{
                                name: 'skyatlas',
                                type: 'font-awesome',
                                size: 50,
                                color: 'aqua'
                            }}
                            iconContainerStyle={this.styles.iconContainer}
                            buttonStyle={{
                                borderWidth: 0,
                                borderColor: 'transparent',
                                borderRadius: 20
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity Screen={this}>
                        <Button onPress={this.playDesign} title="Compass"
                        style={this.styles.button}
                        disabled={this.playDesignDisabled()}
                        titleStyle={{ fontWeight: 'bold', fontSize: 18, marginLeft: 15, display: "none" }}
                        containerStyle={this.styles.buttonContainer}
                        icon={{
                            name: 'compass',
                            type: 'font-awesome',
                            size: 50,
                            color: 'green'
                        }}
                        iconContainerStyle={this.styles.iconContainer}
                        buttonStyle={{
                            borderWidth: 0,
                            borderColor: 'transparent',
                            borderRadius: 20
                        }} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    styles = StyleSheet.create({
        sidebar: {
            top: "50%",
            marginTop: -135,
            width: "100%",
            height: 270,
            paddingLeft: 10,
            paddingRight: 10,
            zIndex: 2000
        },
        button: {
            width: "100%",
            opacity: 0.9,
            zIndex: 2000
        },
        screen: {
            zIndex: 1000,
            position: "absolute",
            width: 160,
            height: "100%",
            display: "flex",
            right: 0,
            backgroundColor: "#d8dee9",
            opacity: 0.5,
            zIndex: 2000
        },
        iconContainer: { marginLeft: 10, marginRight: 10, opacity: 0.9 },
        buttonContainer: { marginVertical: 10, height: 80, width: 100, marginLeft: 15 }
    });

}