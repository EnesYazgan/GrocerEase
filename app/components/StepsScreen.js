import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import List from './StepsScreenComponents/List';
import Banner from './SharedComponents/Banner';

export default class StepsScreen extends Component {
  static defaultProps = {
    data: [],
    title: '',
  }

  render() {
    return (
      <View style={styles.container}>
        <Banner
          title={'How to Make ' + this.props.title}
          icon='arrow-back'
          logOut={this.props.logOut}
          switchScreen={this.props.switchScreen}
        />
        <View style={styles.container}>
          <List
            data={this.props.data}
          />
        </View>
      </View>
    );
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
