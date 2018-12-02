import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Button, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import Icon from './SharedComponents/Icon';
import List from './AddRecipeScreenComponents/List';
import Banner from './SharedComponents/Banner';
import Ingredient from '../objects/Ingredient'

export default class AddRecipeScreen extends Component {
  state = {
    title: '',
    ingredients: [],
    newIngredient: '',
    tools: [],
    newTool: '',
    steps: [],
    newStep: '',
    list: 'ingredients',
  }

  static defaultProps = {
    orderList: undefined,
    switchScreen: undefined,
    data: [],
    title: '',
  }

  addNewIngredient = () => {
    var ingredientsCopy = this.state.ingredients.slice(0);
    ingredientsCopy.push(new Ingredient(this.state.newIngredient.toTitleCase()))
    this.setState({ ingredients: ingredientsCopy });
  }

  recordToolText = (text) => {
    this.setState({ newTool: text });
  }

  recordStepText = (text) => {
    this.setState({ newStep: text });
  }

  recordIngredientText = (text) => {
    this.setState({ newIngredient: text });
  }

  recordToolText = (text) => {
    this.setState({ newTool: text });
  }

  recordStepText = (text) => {
    this.setState({ newStep: text });
  }

  addNewItem = () => {
    this.props.changeItemQuantity(this.state.text, 1)
    this.setState({ text: '', filter: this.props.data })
  }

  searchData = (text) => {
    var searchResults = this.props.data.filter(item => item.substring(0, text.length) == text);
    // var searchResults = [] //make a copy of the current array
    // for (var j = 0; j < this.props.data.length; j++) {
    //   var match = true
    //   for (var l = 0; l < text.length; l++) {
    //     if (text.charAt(l).toLowerCase() != this.props.data[j].key.charAt(l).toLowerCase()) {
    //       match = false
    //       break
    //     }
    //   }
    //   if (match) searchResults.push(this.props.data[j])
    // }
    this.setState({ text: text, filter: searchResults })
  }

  render() {
    return (
      <View style={styles.container}>
        <Banner
          title='Create a Recipe'
          icon='flame'
          logOut={this.props.logOut}
          switchScreen={this.props.switchScreen}
        />
        {
          this.state.list == 'ingredients'
            ? <View>
              <Text style={styles.headerText}>Ingredients</Text>
              <List
                data={this.state.ingredients}
              />
              <TextInput style={styles.textInput}
                ref={input => { this.textInput = input }}
                placeholder="Add or search for food!"
                defaultValue={this.props.text}
                onChangeText={
                  this.props.searchData
                }
              />
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={
                  this.addNewIngredient
                }
              >
                <Icon
                  style={styles.icon}
                  name="add-circle"
                  color="#51A4F7"
                  size={24}
                />
              </TouchableOpacity>
            </View>
            : this.state.list == 'tools'
              ? <View>
                <Text style={styles.headerText}>Tools</Text>
                <List
                  data={this.state.tools
                  }
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="New Tool"
                  onChangeText={this.recordToolText}
                />
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={
                    this.addNewIngredient
                  }
                >
                  <Icon
                    style={styles.icon}
                    name="add-circle"
                    color="#51A4F7"
                    size={24}
                  />
                </TouchableOpacity>
              </View>
              : <View>
                <Text style={styles.headerText}>Steps</Text>
                <List
                  data={this.state.steps
                  }
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="New Step"
                  onChangeText={this.recordStepText}
                />
                <Button
                  title='Save Recipe'
                  onPress={this.saveRecipe} />
              </View>
        }
        <View style={{
          position: 'absolute',
          width: '100%',
          bottom: 0,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingBottom: 25,
          paddingTop: 10,
        }}
          backgroundColor='transparent'>
          <Button
            title='Ingredients'
            onPress={() => {
              this.setState({ list: 'ingredients' })
            }} />
          <Button
            title='Tools'
            onPress={() => {
              this.setState({ list: 'tools' })
            }} />
          <Button
            title='Steps'
            onPress={() => {
              this.setState({ list: 'steps' })
            }} />
        </View>
      </View>
    );
  }
}

String.prototype.toTitleCase = function () {
  return this.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    marginRight: 10,
  },
  banner: {
    backgroundColor: '#51A4F7',
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  beginning: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  end: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  headerText: {
    flexDirection: 'row',
    flex: 100,
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    justifyContent: 'center',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10
  },
  footer: {
    flexDirection: 'row',
    flex: 100,
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    justifyContent: 'center',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    marginRight: -60
  },
  iconContainer: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    paddingTop: 10,
    borderRadius: 10,
  },
  icon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  textInput: {
    flex: 1,
    fontSize: 10,
    padding: 10,
  },
});
