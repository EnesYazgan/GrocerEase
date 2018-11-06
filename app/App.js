import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Button, StyleSheet, TouchableOpacity, FlatList, StatusBar} from 'react-native';
import List from './components/List';
import BarcodeScanner from './components/BarcodeScanner';
import Icon from './components/Icon';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraOn: false,
    };
  }

  toggleCamera = () => {
    this.setState({ cameraOn: !this.state.cameraOn });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.banner}>
          <Text style={styles.headerText}>My Ingredients</Text>
          <View style={styles.end}>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={this.toggleCamera}
            >
              <Icon
                style={styles.icon}
                name="camera"
                color="white"
                size={24}
              />
            </TouchableOpacity>
          </View>
        </View>
        {
          this.state.cameraOn == false ?
            null :
            <BarcodeScanner />
        }
        <List
          data={[]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({ 
  banner: {
    backgroundColor: 'green',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  end: {
    flex: 1,
    justifyContent: 'flex-end',
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
  iconContainer: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0)',
    alignItems:'flex-end',
    justifyContent:'flex-end',
    width:40,
    height:40,
    backgroundColor:'green',
    borderRadius:40,
  },
  icon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  }
});