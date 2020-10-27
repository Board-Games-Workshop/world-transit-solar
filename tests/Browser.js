import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

export default class App extends Component {
  state = {
    result: null,
  };

  render() {
    return (
      <View>
        <Button title="Open WebBrowser" onPress={this._handlePressButtonAsync} />
        <Text>{this.state.result && JSON.stringify(this.state.result)}</Text>
      </View>
    );
  }

  _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync('http://localhost:3000');
    this.setState({ result });
  };
}