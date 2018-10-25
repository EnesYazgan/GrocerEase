//import React, { Component } from 'react';
//import { AppRegistry, Text, TextInput, View, Button, StyleSheet, FlatList } from 'react-native';

//import React from 'react';
import List from './components/List.js'

import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';

/*class Greeting extends Component {
  render() {
    return (
      <Text>Hello {this.props.name}!</Text>
    );
  }
}*/

export default class LotsOfGreetings extends Component {
  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <List name='Rexxar' />
        <List name='Jaina' />
        <List name='Valeera' />
      </View>
    );
  }
}