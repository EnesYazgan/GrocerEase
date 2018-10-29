import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet } from 'react-native';
import List from './components/List.js';

export default class TextInANest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: "Bird's Nest",
      bodyText: 'This is not really a bird nest.'
    };
  }

  render() {
    return (
	  //List.insert(titleText);
      <Text style={styles.baseText}>
		//List.insert(titleText)
        <Text style={styles.titleText} onPress={this.onPressTitle}>
          {List.head}{'\n'}{'\n'}
        </Text>
        <Text numberOfLines={5}>
          {this.state.bodyText}
        </Text>
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});