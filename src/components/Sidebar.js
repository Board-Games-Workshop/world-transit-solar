import React, { Component } from 'react';
import { View, StyleSheet, Text, SafeAreaView, FlatList } from 'react-native';
import { Image } from 'react-native-elements';
import TravelCard from './TravelCard';
import DesignTile from './DesignTile';
import QuestionCard from './QuestionCard';

const DATA = [
    {
        id: '1',
        title: '',
        type: DesignTile.CARD_TYPE,
        style: "designStyle",
        icon: '../../assets/img/tile/design.png'
    },
    {
        id: '2',
        title: '',
        type: QuestionCard.CARD_TYPE,
        style: "questionStyle",
        icon: '../../assets/img/tile/question.png'
    }
];

const Item = ({ title, type, style, icon }) => (
    <View style={style}>
        <Text style={title}>{title}</Text>
        <Image
            style={{width: 100, height: 50}}
            ImageSource={`require('./path/to/image.png')`}
        />
    </View>
);

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
            styles.sidebar['display'] = "none";
            if(currentCard === TravelCard.CARD_TYPE) {
                styles.tile = "flex";
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
        const renderItem = ({ item }) => (
            <Item title={item.title} icon={item.icon} onPress={this.onChooseTile} type={item.type} style={styles[item.style]} />
        );
        return (
            <View style={styles.sidebar}>
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
                <View style={styles.tile}>
                    <SafeAreaView style={styles.icon}>
                        <FlatList
                            data={DATA}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                        />
                    </SafeAreaView>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    sidebar: {
        flex: 2,
        right: "5%"
    },
    tile: {
        display: "flex",
        width: "100%"
    },
    icon: {
        display: "flex",
        width: "100%"
    },
    designStyle: {

    },
    questionStyle: {

    }
});