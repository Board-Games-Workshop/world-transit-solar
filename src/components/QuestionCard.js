import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, SafeAreaView, FlatList } from 'react-native';
import { Card, Input } from 'react-native-elements';
import questions from '../../assets/js/questions';

export default class QuestionCard extends Component {

    static CARD_TYPE = "question_card";

    constructor(props) {
        super(props);
        this.Map = props.Map;
        this.markerQuestion = props.markerQuestion;
        this.props.GameController.currentQuestion = this.markerQuestion;
        this.createList(questions);
    }

    // createList(questions) {
    //     let question = questions['data'][this.markerQuestion];
    //     this.question = question;
    //     this.title = question['question'];
    //     if(question.hasOwnProperty("options")) {
    //         this.list = question['options'];
    //     } else {
    //         this.list = [];
    //     }
    // }

    selectAnswer(event) {
        let answer = event.target.props.title;
        this.props.GameController.currentAnswer = answer;
        this.props.GameController.screen.setState({
            machine_state: 'selected'
        });
    }

    showAnsweringPanel() {
        const renderItem = ({ item }) => (
            <Item title={item.title} />
        );
        let panel = "";
        if(this.list.length !== 0) {
            panel = <SafeAreaView style={styles.question}>
                <FlatList
                    data={questions['data']}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        } else {
            panel = <Input ref={input => (this.input = input)}
                placeholder='Your Answer'
                errorStyle={{ color: 'red' }}
                errorMessage='Complete the answer'
            />
        }
        return panel;
    }

    get card_type() { return QuestionCard.CARD_TYPE; }

    render() {
        return (
            <Card title="Question Title">
                <View style={styles.question}>
                    <Text style={styles.container}>{this.title}</Text>
                    <View style={styles.list}>{this.showAnsweringPanel()}</View>
                </View>
            </Card>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundColor: 'green'
    },
    question: {
        display: "flex",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundColor: 'green'
    },
    list: {
        display: "flex",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundColor: 'green'
    }
});
