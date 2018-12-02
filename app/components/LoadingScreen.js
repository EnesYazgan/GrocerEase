import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native'
import Banner from './SharedComponents/Banner';

export default class LoadingScreen extends Component {
  static defaultProps = {
    screen: '',
    logOut: undefined,
  }

  render() {
    return (
      <View style={{ flex: 1 }} >
        {
          this.props.screen == 'recipes'
            ? <Banner
              title={'Loading...'}
              icon='flame'
              logOut={this.props.logOut}
              switchScreen={this.props.switchToIngredients}
            />
            : <Banner
              title={'Loading...'}
              icon='nutrition'
              logOut={this.props.logOut}
              switchScreen={this.props.switchToRecipes}
            />
        }
        <ActivityIndicator style={{
          flex: 1, alignItems: 'center',
          justifyContent: 'center'
        }} size="large" color="#ccc" />
      </View>
    );
  }
}