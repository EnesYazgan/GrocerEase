import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Button, StyleSheet, FlatList } from 'react-native';
//import List from './List.js'


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      data: [], //for the autocomplete menu
      inventory: [], //for the ingredients list
      output: ''
    };
  }

  render() {
    return (
	
		//<List />
	
		<View style={styles.container}>
        <Text alignItems='center'>GrocerEase</Text>
        <TextInput
          placeholder="Type food!"
          onChangeText={(text) => {
            var newData = []; //make a copy of the current array
            for (var j = 0; j < ingredients.length; j++) {
              var match = true;
              for (var l = 0; l < text.length; l++) {
                if (text.charAt(l) != ingredients[j].key.charAt(l)) {
                  match = false;
                  break;
                }
              }
              if (match) newData.push(ingredients[j]);
            }
            this.setState({text});
          }
          }
        />
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
        />
        <FlatList
          data={this.state.inventory}
          renderItem={({ item }) => <Text style={styles.item}>{item.key} {item.quantity > 1 ? item.quantity : ''} </Text>}
        />
        {this.state.text == '' ?
          null :
          <Button
            onPress={() => {
              //var newInventory = [this.state.inventory];
              var newInventory = this.state.inventory.slice(0);
              var index = newInventory.indexOf(this.state.text);
              index > -1 ? newInventory[index].key = newInventory[index].quantity = newInventory[index].quantity + 1 : newInventory.push({key: this.state.text, quantity: 1});
              this.setState({text: '', inventory: newInventory});
            }}
            title="Add"
          />
        }
      </View>
    );
  }
}



const ingredients = [
  {key: 'Milk'},
  {key: 'Cheese'},
  {key: 'Eggs'},
  {key: 'Bread'},
  {key: 'Fruit'},
  {key: 'Vegetable'},
  {key: 'Sugar'},
  {key: 'Salt'},
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});