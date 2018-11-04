import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Button, StyleSheet, FlatList, StatusBar} from 'react-native';
import SearchList from './components/SearchList';
import BarcodeScanner from './components/BarcodeScanner'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: [], //for the ingredients list
    };
  }

  render() {
    return (
      <View style={styles.container}>
        
         <BarcodeScanner />
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
      />
    );
  };
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: 'green',
  },
  headerText: {
    flexDirection: 'row',
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  searchBar: {
    flex: 1,
    fontSize: 20,
    padding: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
  icon: {
    marginRight: 10,
  }
});
