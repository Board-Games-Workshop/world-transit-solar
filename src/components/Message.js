import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

export default class Message extends Component {

    state = {
        message: null
    }
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.message}>
                <Text style={styles.message_text}>{this.state['message']}</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    message: {

    },
    message_text: {
        
    }
});