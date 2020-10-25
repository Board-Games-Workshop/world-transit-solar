import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { PLAYERS } from '../constants/player';

class Rules extends Component {

    state = {
        params: {
            players: PLAYERS
        }
    }
    
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text style={styles.container}>
                    
                </Text>
                <Text style={styles.container}>
                    Select No. of Players
                </Text>
                <Picker
                    selectedValue={this.state.params.players}
                    style={{height: 50, width: 100}}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({params: { players: itemValue} })
                    }>
                    <Picker.Item label="1 Player" value="1" />
                    <Picker.Item label="2 Players" value="2" />
                    <Picker.Item label="3 Players" value="3" />
                    <Picker.Item label="4 Players" value="4" />
                    <Picker.Item label="5 Players" value="5" />
                    <Picker.Item label="6 Players" value="6" />
                </Picker>
                <Button title="Your flight tokens" onPress={() => navigate('TokenSelect', { players: this.state.params.players })} />
            </View>
        );
    }
}

export default Rules;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    }
});