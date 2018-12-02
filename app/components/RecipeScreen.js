import React, { Component } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import List from './RecipeScreenComponents/List';
import ActionBar from './RecipeScreenComponents/ActionBar';
import StepsScreen from './StepsScreen';
import Banner from './SharedComponents/Banner';

export default class RecipeScreen extends Component {
  static defaultProps = {
    orderList: undefined,
    changeItemQuantity: undefined,
    data: [],
  }

  state = {
    filter: this.props.data,
    text: '',
    sortParameter: true,
    viewAllRecipes: false,
    currentRecipe: null,
  }

  componentDidMount() {
    this.props.sortList()
  }

  changeSortParameterThenOrderList = () => {
    this.props.orderList(this.state.sortParameter)
    this.setState({ sortParameter: !this.state.sortParameter })
  }

  addNewItem = () => {
    this.props.changeItemQuantity(this.state.text, 1)
    this.setState({ text: '', filter: this.props.data })
  }

  searchData = (text) => {
    var searchResults = this.props.data.filter(item => (item.title.includes(text)));
    this.setState({ text: text, filter: searchResults })
  }

  viewSteps = (recipe) => {
    this.setState({ currentRecipe: recipe })
  }

  render() {
    if (this.state.currentRecipe == null) {
      return (
        <View style={styles.container}>
          <Banner
            title='Find Recipes'
            icon='flame'
            logOut={this.props.logOut}
            switchScreen={this.props.switchScreen}
          />
          <View style={styles.container}>
            <ActionBar
              text={this.state.text}
              addNewItem={this.addNewItem}
              searchData={this.searchData}
              sortList={this.changeSortParameterThenOrderList}
            />
            <List
              {...this.props}
              viewRecipeSteps={this.viewSteps}
              sortParameter={this.state.sortParameter}
              data={this.state.text == ''
                ? this.props.data
                : this.state.filter
              }
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  textInput: {
    flex: 1,
    fontSize: 20,
    padding: 10,
  },
});