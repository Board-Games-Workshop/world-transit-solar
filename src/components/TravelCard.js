import React, {Component, PropTypes} from 'react';
import { NativeModules, StyleSheet } from 'react-native';
const { CustomWebViewManager } = NativeModules;
import { View, Text, Image } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';

export default class TravelCard extends Component {

    static CARD_TYPE = "travel_card";

    constructor(props) {
        super(props);
        this.Map = props.Map;
        this.markerTravel = props.markerTravel;
    }

    get card_type() { return TravelCard.CARD_TYPE; }
    
    render() {
        let colorsText = this.markerTravel.map((color, index) => {
            <Icon
            style={styles.icon}
            name='circle'
            type='font-awesome'
            color={color} />
        });
        return (
            <Card title="Travel Title">
                <View key={i} style={styles.container}>
                    <Text style={styles.token}>These are the remaining location tokens</Text>
                    <Text style={styles.container}>{colorsText}</Text>
                </View>
            </Card>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    icon: {
        marginLeft: "10px"
    },
    token: {
        fontWeight: "bold"
    }
});