import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from './Icon';

class ListItem extends Component {
  increment = () => {
    this.props.setParentState(this.props.item.key, 1)
  }

  decrement = () => {
    if (this.props.item.quantity > 0)
      this.props.setParentState(this.props.item.key, -1)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={styles.textContainer}
          onPress={this.handleTextPress}>
          {this.props.item.key}
        </Text>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={this.decrement}
          >
            <Icon
              name="remove"
              color="#ccc"
              size={20}
            />
          </TouchableOpacity>
          <Text
            style={styles.textContainer}
          >
            {this.props.item.quantity}
          </Text>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={this.increment}
          >
            <Icon
              name="add"
              color="#ccc"
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
}

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 1,
    height: 50
  },
  buttons: {
    flexDirection: "row",
    marginRight: 10,
  },
  textContainer: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 20
  },
  iconContainer: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0)',
    alignItems:'center',
    justifyContent:'center',
    width:30,
    height:30,
    backgroundColor:'#fff',
    borderRadius:30,
  }
});