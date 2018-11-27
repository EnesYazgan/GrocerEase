import React, { Component } from 'react';
import {View, AppRegistry, Text, TextInput, Button, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
import Icon from '../Icon';

export default class RecipeInfo extends React.Component {
  static defaultProps = {
    item: null,
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textInput}>Ingredients:</Text>
        {this.props.item.ingredients.map(element => {
          return (
            <Text key={element.name} style={styles.textInput}>{element.name}</Text>
          )
        })}
        <Text style={styles.textInput}>Tools:</Text>
        {this.props.item.equipment_names.map(element => {
          return (
            <Text key={element} style={styles.textInput}>{element}</Text>
          )
        })}
        <Button
        title='View Steps'
        onPress={this.props.switchScreen}/>
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
  itemAndField: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
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
  fadedTextContainer: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 20,
    color: 'black'
  },
  icon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  numberInput: {
    fontSize: 15,
    padding: 3,
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  textInput: {
    fontSize: 15,
    padding: 5,
    paddingLeft: 10,
    fontWeight: 'bold'
  },
});
