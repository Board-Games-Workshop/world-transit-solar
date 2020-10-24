import { Animated, Text, View, StyleSheet } from 'react-native';
import React, { Component, useState, useEffect } from 'react';
import Card from './Card';
import Screen from './Screen';
import Sidebar from './Sidebar';
import Message from './Message';
import Map from './Map';
import BoardScale from './BoardScale';

export default class GameController extends Component {

  currentPlayer = 1;
  currentQuestion = null;
  currentAnswer = null;
  message = null;
  card = null;
  screen = null;
  sidebar = null;
  players = [];

  constructor(props) {
    super(props);
  }

  // on touch
  chooseLocation(player, color) {
    let GameState = this.props.GameStorageController.GameState;
    let markerColor = GameState.PLAYERS[player.toString()]['marker_transit'];
    GameState.PLAYERS[player.toString()]['marker_transit'] = color;
    GameState.PLAYERS[player.toString()]['marker'] = markerColor;
  }

  // on submit
  chooseDesign(player, color) {
    let GameState = this.props.GameStorageController.GameState;
    let markerColor = GameState.PLAYERS[player.toString()]['design_link'];
    GameState.PLAYERS[player.toString()]['design_link'] = color;
    GameState.PLAYERS[player.toString()]['design'] = markerColor;
  }

  // on submit
  chooseQuestion(player, color) {
    let GameState = this.props.GameStorageController.GameState;
    let markerColor = GameState.PLAYERS[player.toString()]['question_completed'];
    GameState.PLAYERS[player.toString()]['question_completed'] = color;
    GameState.PLAYERS[player.toString()]['question'] = markerColor;
  }

  evaluateScore(player, answer, color) {
    let GameState = this.props.GameStorageController.GameState;
    GameState.PLAYERS[player.toString()]['score'] += GameState.score[answer] * (BoardScale.getMarkerColours.indexOf(color) + 1);
    let nextPlayer = (this.currentPlayer+1) % Object.keys(this.props.tokens).length;
    if(answer) {
      message = `PLAYER ${nextPlayer}: Won Round`;
    } else {
      message = `PLAYER ${nextPlayer}: Play Game`;
    }
    this.screen.setState({
      machine_start: 'play'
    });
    this.message.setState({
      message: message
    });
  }

  requiredData() {
    let locations = this.Map.locations;
    this.Map.markers = locations;
  }

  fadedStartGame() {
    const FadeInView = (props) => {
      const [fadeAnim] = useState(new Animated.Value(0))  // Initial value for opacity: 0
    
      React.useEffect(() => {
        Animated.sequence([
          Animated.timing(
            fadeAnim,
            {
              toValue: 1,
              duration: 700,
            }
          ),
          // decay, then spring to start and twirl
          Animated.timing(
            fadeAnim,
            {
              toValue: 0,
              duration: 5000,
            }
          )
        ]).start(); // start the sequence group
      }, [])
    
      return (
        <Animated.View                 // Special animatable View
          style={{
            ...props.style,
            opacity: fadeAnim,         // Bind opacity to animated value
          }}
        >
          {props.children}
        </Animated.View>
      );
    }

    return (
      <View style={{position: 'absolute', alignItems: 'center', justifyContent: 'center', zIndex: 9999, top: 200, left: 200}}>
        <FadeInView style={{width: 250, height: 50, backgroundColor: 'powderblue'}}>
          <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>Fading in</Text>
        </FadeInView>
      </View>
    );
  }

  render() {
    return (
      <View style={this.styles.game}>
        {this.fadedStartGame()}
        <Message ref={message => (this.message = message)} />
        <View style={this.styles.map} onTouchStart={this.touchMap}>
          <Map ref={plan => (this.plan = plan)} BoardScale={BoardScale} GameController={this} />
        </View>
        <Screen ref={screen => (this.screen = screen)} GameController={this} />
        <Card Map={this.Map} ref={card => (this.card = card)} BoardScale={BoardScale} GameStorageController={this.props.GameStorageController} GameController={this} />
        <View style={this.styles.sidebar}>
          <Sidebar ref={sidebar => (this.sidebar = sidebar)} GameController={this} />
        </View>
      </View>
    );
  }

  componentDidMount() {
    // console.log(this.plan);
    // this.plan.setState({
    //   component: true
    // });
  }

  get players() { return this.props.GameStorageController.GameState.PLAYERS; }
  get tokens() { return this.props.GameStorageController.GameState.TOKENS; }
  set players(players) {
    for(var i = 1; i <= players; i++) {
      if(!this.props.GameStorageController.GameState.PLAYERS.hasOwnProperty(i.toString())) {
        this.props.GameStorageController.GameState.PLAYERS[i.toString()] = {};
      }
    }
  }

  setPlayer(player, tokenVariation) {
    this.props.GameStorageController.GameState.PLAYERS[player.toString()]['token'] = tokenVariation;
    // this.props.GameStorageController.GameState.TOKENS[tokenVariation]['player'] = player;
  }

  styles = StyleSheet.create({
    sidebar: {
      display: "none"
    },
    map: {
      zIndex: 999,
      flex: 1,
      width: "100%",
      height: "100%",
      display: "flex"
    },
    game: {
      zIndex: 1,
      flex: 1,
      width: "100%",
      height: "100%"
    }
  });
}