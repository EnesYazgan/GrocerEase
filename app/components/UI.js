import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Button, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
import Icon from './Icon';
import List from './UIcomponents/List';

import BarcodeScanner from './UIcomponents/BarcodeScanner';
import Ingredient from '../objects/Ingredient';

export default class UI extends Component {
  state = {
    inventory: this.props.data,
    userId: this.props.userId,
    cameraOn: false,
  }
 
  static defaultProps = {
    data: [],
    userId: undefined,
  }

  changeItemQuantity = (key, quantityChange) => {
    var newInventory = this.state.inventory.slice(0);
    var obj = newInventory.find(o => o.key === key);
    typeof obj != 'undefined' ? obj.quantity = obj.quantity + quantityChange : newInventory.push(new Ingredient(key, 1));
    this.setState({ inventory: newInventory });
    // Set the state here and update as required
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
            <BarcodeScanner
              changeItemQuantity={this.changeItemQuantity}
            />
        }
        <List
          data={this.state.inventory}
          changeItemQuantity={this.changeItemQuantity}
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