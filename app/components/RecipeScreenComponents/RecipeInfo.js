import React, { Component } from 'react';
import {View, AppRegistry, Text, TextInput, Button, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
import Icon from '../SharedComponents/Icon';

export default class RecipeInfo extends Component {
  static defaultProps = {
    item: null,
  }

  render() {
    return (
      <View style={{ flexDirection: "column" }}>
      <Button
          style={styles.button}
          title={this.props.item.manualMatching ? 'Manual Matching: On' : 'Manual Matching: Off'}
          onPress={() => this.props.setManualMatching(this.props.item, !this.props.item.manualMatching)} />
        <View style={styles.container}>
          <View style={[styles.container, { flexDirection: 'column' }]}>
            <Text style={styles.infoTitle}>Ingredients:</Text>
            {this.props.item.ingredients.map(element => {
              return (
                <View key={element.name}
                  style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  {
                    this.props.item.manualMatching
                      ? <View>
                        <TouchableOpacity
                          style={styles.iconContainer}
                          onPress={() => this.props.removeIngredientFromMatching(this.props.item, element)}
                        >
                          <Icon
                            name="close"
                            color="red"
                            size={20}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={styles.iconContainer}
                          onPress={() => this.props.addIngredientToMatching(this.props.item, element)}
                        >
                          <Icon
                            name="checkmark"
                            color="green"
                            size={20}
                          />
                        </TouchableOpacity>
                      </View>
                      : null
                  }
                  <View style={{ flex: 1, flexWrap: 'wrap' }} >
                    <Text
                      style={[this.props.item.matchingIngredients.includes(element)
                        ? (element.perfectMatch
                          ? styles.matchingText
                          : styles.almostText)
                        : styles.excludesText
                      , !this.props.item.manualMatching ? {paddingLeft: 40} : null]}>{element.quantity > 0 ? element.quantity : ''} {element.name}
                    </Text>
                  </View>
                </View>
              )
            })}
          </View>
          <View style={[styles.container, { flexDirection: 'column' }]}>
            <Text style={styles.infoTitle}>Tools:</Text>
            {this.props.item.equipment_names.map(element => {
              return (
                <Text key={element} style={styles.indentedText}>{element}</Text>
              )
            })}
          </View>
        </View>
        <Button
          style={styles.button}
          title='View Steps'
          onPress={this.props.switchScreen} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#D0E3F5',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  itemAndField: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  button: {
    alignItems:'flex-end',
    justifyContent:'center',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#D0E3F5',
  },
  icon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  iconContainer: {
    alignItems:'center',
    justifyContent:'center',
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#D0E3F5',
  },
  matchingText: {
    fontSize: 14,
    padding: 5,
    paddingLeft: 10,
    color: 'green'
  },
  almostText: {
    fontSize: 14,
    padding: 5,
    paddingLeft: 10,
    color: 'orange'
  },
  excludesText: {
    fontSize: 14,
    padding: 5,
    paddingLeft: 10,
    color: 'black',
  },
  indentedText: {
    fontSize: 14,
    padding: 5,
    paddingLeft: 40,
    color: 'black',
  },
  iconContainer: {
    alignItems:'center',
    justifyContent:'center',
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#D0E3F5',
  },
  infoTitle: {
    fontSize: 15,
    padding: 5,
    paddingLeft: 10,
    fontWeight: 'bold',
    color: 'black'
  },
});
