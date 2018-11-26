import React, { Component } from 'react';
import {View, AppRegistry, Text, TextInput, Button, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
import Icon from '../Icon';

export default class IngredientInfo extends React.Component {

  static defaultProps = {
    item: null,
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textInput}>Quantity: {this.props.item.quantity}</Text>
        <Text style={styles.textInput}>Calories: {this.props.item.calories}</Text>
        <Text style={styles.textInput}>Serving size: {this.props.item.serving}</Text>
        <Text style={styles.textInput}>Expiration date: {this.props.item.expiry}</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#D0E3F5',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  beginning: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  end: {
    flex: 1,
    justifyContent: 'flex-end',
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
    fontSize: 15,
    padding: 5,
    paddingLeft: 10
  },
});
