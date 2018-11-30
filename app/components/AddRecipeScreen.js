import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Button, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
import Icon from './Icon';
import List from './StepsScreenComponents/List';
import ActionBar from './StepsScreenComponents/ActionBar';
import Ingredient from './objects/Ingredient';

export default class AddRecipeScreen extends Component {
  state = {
    title: '',
    ingredients: [],
    newIngredient: '',
    tools: [],
    newTool: '',
    steps: [],
    newStep: '',
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
        <StatusBar hidden />
        <View style={styles.banner}>
          <TouchableOpacity style={styles.iconContainer}
            onPress={this.props.switchScreen}>
            <Icon
              style={styles.icon}
              color='white'
              name='arrow-back'
              size={30}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Create a Recipe</Text>
          <TouchableOpacity style={styles.iconContainer}
            onPress={this.props.logOut}>
            <Icon
              style={styles.icon}
              color='white'
              name='log-out'
              size={30}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <Text style={styles.headerText}>Ingredients</Text>
          <List
            data={this.state.ingredients}
          />
          <TextInput
            style={styles.textInput}
            placeholder="New Ingredient"
            onChangeText={this.recordIngredientText}
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
          onPress={this.saveRecipe}/>
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
    borderWidth:1,
    borderColor:'rgba(0,0,0,0)',
    alignItems:'center',
    justifyContent:'center',
    width:50,
    height:50,
    backgroundColor: '#51A4F7',
    paddingTop: 10,
    borderRadius:10,
  },
  icon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  textInput: {
    flex: 1,
    fontSize: 20,
    padding: 10,
  },
});
