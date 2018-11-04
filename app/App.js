import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Button, StyleSheet, TouchableOpacity, FlatList, StatusBar} from 'react-native';
import SearchList from './components/SearchList';
import BarcodeScanner from './components/BarcodeScanner';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraOn: false,
    };
  }

  toggleCamera = () => {
    this.setState({ cameraOn: true });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.banner}>
          <Text style={styles.headerText}>My Ingredients</Text>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={this.toggleCamera}
          >
            <Icon
              name="camera"
              color="#ccc"
              size={20}
            />
          </TouchableOpacity>
        </View>
        {
          this.state.cameraOn == false ?
            null :
            <BarcodeScanner/>
        }
        <SearchList
          inventory={this.state.inventory}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});