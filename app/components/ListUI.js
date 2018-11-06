import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Button, StyleSheet, FlatList, TouchableOpacity, StatusBar} from 'react-native';
import Ingredient from './Ingredient';
import Icon from './Icon';

class SearchList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      filter: [],
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          //A FlatList renders a component in multiple rows like a list, given an array of data.
          data={
            this.state.text == ''
              ? this.props.data
              : this.state.filter
          }
          renderItem={this.renderListRow}
          //This optional parameter gives FlatList a component to render in-between rows
          ItemSeparatorComponent={this.renderSeparator}
          //This optional parameter gives FlatList a component to render above the list
          ListHeaderComponent={this.renderSearchBar}
        />
      </View>
    );
  }

  renderListRow = ({ item }) => {
    //local functions
    incrementItemQuantity = () => {
      this.props.changeItemQuantity(item.key, 1)
    }
    
    decrementItemQuantity = () => {
      if (item.quantity > 0)
        this.props.changeItemQuantity(item.key, -1)
    }

    return (
      <View style={styles.listRow}>
        <Text
          style={styles.textContainer}
          onPress={this.handleTextPress}>
          {item.key}
        </Text>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={decrementItemQuantity}
          >
            <Icon
              name="remove"
              color="#ccc"
              size={20}
            />
          </TouchableOpacity>
          <Text
            style={styles.textContainer}
          >
            {item.quantity}
          </Text>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={incrementItemQuantity}
          >
            <Icon
              name="add"
              color="#ccc"
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
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

  renderSearchBar = () => {
    //local functions
    addNewItem = () => {
      this.textInput.clear()
      this.setState({ text: '' })
      this.props.changeItemQuantity(this.state.text, 1)
    }

    searchData = (text) => {
      var newData = [] //make a copy of the current array
      for (var j = 0; j < this.props.data.length; j++) {
        var match = true
        for (var l = 0; l < text.length; l++) {
          if (text.charAt(l).toLowerCase() != this.props.data[j].key.charAt(l).toLowerCase()) {
            match = false
            break
          }
        }
        if (match) newData.push(this.props.data[j])
      }
      this.setState({ text: text, filter: newData })
    }

    return (
      <View style={styles.searchBar}>
        <TextInput style={styles.textInput}
          ref={input => { this.textInput = input }}
          placeholder="Add or search for food!"
          onChangeText={
            searchData
          }
        />
        {
          this.state.text == ''
            ? <Icon
              style={styles.icon}
              name="search"
              color="#ccc"
              size={25}
            />
            : <Button
              style={styles.buttons}
              onPress={addNewItem}
              title="Add"
            />
        }
      </View>
    );
  }
}

String.prototype.toTitleCase = function () {
  return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

export default SearchList;

const styles = StyleSheet.create({
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
  textInput: {
    flex: 1,
    fontSize: 20,
    padding: 10,
  },
  searchBar: {
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
  },
  listRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 1,
    height: 50
  },
  buttons: {
    flexDirection: "row",
    marginRight: 10,
  },
  textContainer: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 20
  },
  iconContainer: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0)',
    alignItems:'center',
    justifyContent:'center',
    width:30,
    height:30,
    backgroundColor:'#fff',
    borderRadius:30,
  }
});