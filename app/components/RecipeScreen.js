import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Button, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import Icon from './Icon';
import List from './RecipeScreenComponents/List';
import ActionBar from './RecipeScreenComponents/ActionBar';
import StepsScreen from './StepsScreen';

export default class RecipeScreen extends Component {
  state = {
    filter: this.props.data,
    text: '',
    sortParameter: true,
    viewAllRecipes: false,
    currentRecipe: null,
  }

  static defaultProps = {
    orderList: undefined,
    changeItemQuantity: undefined,
    data: [],

  }

  componentDidMount() {
    this.props.sortList()
  }

  orderList = (sortingFunction) => {
    list = this.props.data.sort(sortingFunction);
    this.setState({ filter: list })
  }

  addNewItem = () => {
    this.props.changeItemQuantity(this.state.text, 1)
    this.setState({ text: '', filter: this.props.data })
  }

  searchData = (text) => {
    var searchResults = this.props.data.filter(item => item.title.substring(0, text.length) == text);
    this.setState({ text: text, filter: searchResults })
  }

  viewSteps = (recipe) => {
    this.setState({ currentRecipe: recipe })
  }

  render() {
    if (this.state.currentRecipe == null) {
      return (
        <View style={styles.container}>
          <StatusBar hidden />
          <View style={styles.banner}>
            <TouchableOpacity style={styles.iconContainer}
              onPress={this.props.switchScreen}>
              <Icon
                style={styles.icon}
                color='white'
                name='flame'
                size={30}
              />
            </TouchableOpacity>
            <Text style={styles.headerText}>Find Recipes</Text>
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
            <ActionBar
              text={this.state.text}
              addNewItem={this.addNewItem}
              searchData={this.searchData}
              sortList={this.changeSortParameterThenOrderList}
            />
            <List
              fetchData={this.props.fetchData}
              viewRecipeSteps={this.viewSteps}
              data={this.state.filter}
              changeItemQuantity={this.props.changeItemQuantity}
            />
          </View>
        </View>
      );
    } else {
      return this.constructedStepsScreen();
    }
  }

  constructedStepsScreen = () => {
    return <StepsScreen
      title={
        this.state.currentRecipe.title
      }
      data={
        this.state.currentRecipe.steps
      }
      switchScreen={() => {
        this.setState({ currentRecipe: null });
      }}
      logOut={this.props.logOut}
    />
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
    flex: 1,
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    justifyContent: 'center',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  iconContainer: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#51A4F7',
    borderRadius: 10,
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
