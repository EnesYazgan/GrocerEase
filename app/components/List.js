import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Button, StyleSheet, FlatList, StatusBar} from 'react-native';
import ListUI from './ListUI';
import Ingredient from './Ingredient';

class List extends Component {
  state = {
    inventory: this.props.data,
    userId: this.props.userId,
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

  render() {
    return (
      <ListUI
        data={this.state.inventory}
        changeItemQuantity={
          this.changeItemQuantity
        }
      />
    );
  }
}

export default List;