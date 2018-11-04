import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Button, StyleSheet, FlatList, StatusBar} from 'react-native';
import ListItem from './ListItem';
import Icon from './Icon';

class SearchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      filter: [], //for the search menu
      inventory: [], //for the ingredients list
      output: ''
    };
  }

  changeQuantity = (key, quantityChange) => {
    var newInventory = this.state.inventory.slice(0);
    var obj = newInventory.find(o => o.key === key);
    typeof obj != 'undefined' ? obj.quantity = obj.quantity + quantityChange : newInventory.push(new Ingredient(key, 1));
    this.setState({ text: '', inventory: newInventory });
    // Set the state here and update as required
  }

  //remember, arrow functions bind the function to the class, allowing it to use global (state) variables
  search = (text) => {
    var newData = []; //make a copy of the current array
    for (var j = 0; j < this.state.inventory.length; j++) {
      var match = true;
      for (var l = 0; l < text.length; l++) {
        if (text.charAt(l).toLowerCase() != this.state.inventory[j].key.charAt(l).toLowerCase()) {
          match = false;
          break;
        }
      }
      if (match) newData.push(this.state.inventory[j]);
    }
    this.setState({ text: text, filter: newData });
  }

  add = () => {
    var newInventory = this.state.inventory.slice(0);
    var obj = newInventory.find(o => o.key === this.state.text.toTitleCase());
    typeof obj != 'undefined' ? obj.quantity = obj.quantity + 1 : newInventory.push(new Ingredient(this.state.text.toTitleCase(), 1));
    this.textInput.clear();
    this.setState({ text: '', inventory: newInventory });
    // Set the state here and update as required
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          //Here we input the data to be rendered as a list. We want the list to change when the user uses the search bar.
          data={this.state.text == '' ? this.state.inventory : this.state.filter}
          renderItem={({ item }) => (
            <ListItem
              //onTextPress={this.handleShowDetails}
              //onCaretPress={this.handleDrillDown}
              item={item}
              setParentState={
                this.changeQuantity
              }
            />
          )}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={
            <View style={styles.row}>
              <TextInput style={styles.searchBar}
                ref={input => { this.textInput = input }}
                placeholder="Search for or add food!"
                onChangeText={
                  this.search
                }
              />
              {
                this.state.text == '' ?
                  <Icon
                    style={styles.icon}
                    name="search"
                    color="#ccc"
                    size={25}
                  /> :
                  <Button
                    style={styles.icon}
                    onPress={
                      this.add
                    }
                    title="Add"
                  />
              }
            </View>
          }
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

function Ingredient(key, quantity){
  this.key = key;
  this.quantity = quantity;
}

String.prototype.toTitleCase = function () {
  return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

export default SearchList;

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