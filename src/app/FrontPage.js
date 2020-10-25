import React, { Component } from 'react';
import {Text, View, StyleSheet, Button, TouchableOpacity} from 'react-native';
import { Asset } from 'expo-asset';
import { PLAYERS } from '../constants/player';
import Browser from '../../tests/Browser';

class FrontPage extends Component {

    state = {
        players: PLAYERS
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.shinyappearance}>
                <TouchableOpacity onPress={() => navigate('Rules', { players: this.state.players })}>
                    <Text style={styles.shinytile}>
                        <Text style={styles.shinytile} size={1}>World Transit</Text>
                        <Text style={styles.shinytile}>A game that is extra-ordinary for the youth for exploring their predictive skills.</Text>
                    </Text>
                </TouchableOpacity>
                <Browser />
            </View>
        );
    }
}

export default FrontPage;

const styles = StyleSheet.create({
    shniytile: {
        // background: "linear-gradient(to right top, #333, #333 10%, #eee 20%, #333 30%)",
        height: "100%",
        width:"100%"
    },
    
    shinyappearance: {
        position: "relative",
        backgroundColor: "red",
        height: "100%",
        width:"100%"
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