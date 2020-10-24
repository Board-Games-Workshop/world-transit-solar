import React, { Component, PropTypes } from 'react';
import { Text, View, StyleSheet, Image, AppRegistry } from 'react-native';

export default class PlayGame extends Component {

    state = {
        play: false
    }

    constructor(props) {
        super(props);
        this.props = props;
    }
    
    OnTouchStart() {
        this.setState({play: true});
    }
    
    render() {
        return (
            <View OnTouchStart={this.OnTouchStart}>
                {this.redirect}
            </View>
        );
    }

    redirect() {
        if(this.state.play === true) {
            
            return (
                <Text style={styles.container}>Redirect</Text>
            );
        } else {
            return (
                <Text style={styles.container}>Play Game</Text>
            );
        }
    }

}

const styles = StyleSheet.create({
    container: {

    }
});