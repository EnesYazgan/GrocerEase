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
        <Text style={styles.infoTitle}>Ingredients:</Text>
        {this.props.item.ingredients.map(element => {
          return (
            <Text key={element.name}
            style={this.props.item.matchingIngredients.includes(element)
              ? (element.perfectMatch
                ? styles.matchingText
              : styles.almostText)
              : styles.excludesText
              }>{element.quantity > 0 ? element.quantity : ''} {element.name}</Text>
          )
        })}
        <Text style={styles.infoTitle}>Tools:</Text>
        {this.props.item.equipment_names.map(element => {
          return (
            <Text key={element} style={styles.excludesText}>{element}</Text>
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
  matchingText: {
    fontSize: 14,
    padding: 5,
    paddingLeft: 40,
    color: 'green'
  },
  almostText: {
    fontSize: 14,
    padding: 5,
    paddingLeft: 40,
    color: 'orange'
  },
  excludesText: {
    fontSize: 14,
    padding: 5,
    paddingLeft: 40,
    color: 'black',
  },
  infoTitle: {
    fontSize: 15,
    padding: 5,
    paddingLeft: 10,
    fontWeight: 'bold',
    color: 'black'
  },
});
