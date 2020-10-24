import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import AzimAlt from '../lib/azimalt';
import BoardScale from './BoardScale';

export default class DesignTile extends Component {

    static CARD_TYPE = "design_card";
    Map = null;
    markerDesign = null;
    row = null;

    state = {
        location: null
    }
    
    constructor(props) {
        super(props)
        this.Map = props.Map;
        this.markerDesign = props.markerDesign;
        let index = BoardScale.getMarkerColours.indexOf(this.markerDesign);
        this.row = this.Map.data[index][this.Map.LOCATIONS[index]];
    }

    get card_type() { return DesignTile.CARD_TYPE; }

    render() {
        let text = "";
        if(this.state['location']) {
            text = <View style={styles.answer}>
                <Text style={styles.location}>{this.state['location']}</Text>
                <Text style={styles.coordinates}>{this.row.Latitude}, {this.row.Longitude}</Text>
            </View>;
        }
        return (
            <View>
                {text}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    location: {
        fontWeight: "bold",
        fontSize: 16
    },
    coordinates: {

    },
    answer: {
        
    }
});