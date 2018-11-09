import React, { Component } from 'react';
<<<<<<< HEAD
import { AppRegistry, Text, TextInput, View, Button, StyleSheet, FlatList, StatusBar} from 'react-native';
import SearchList from './components/SearchList';
import BarcodeScanner from './components/BarcodeScanner';
import User from './components/UserLogin';
=======
import UI from './components/UI';
>>>>>>> origin/master

export default class App extends Component {
  state = {
  }

  render() {
    return (
<<<<<<< HEAD
      <View style={styles.container}>
        <BarcodeScanner/>
        <User/>
        <SearchList
        inventory = {this.state.inventory}
        />
      </View>
    );
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
          marginLeft: "0%"
        }}
=======
      <UI
        data={[]}
>>>>>>> origin/master
      />
    );
  }
}