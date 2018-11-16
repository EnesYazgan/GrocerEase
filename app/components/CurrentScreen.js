import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Button, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
import IngredientScreen from './IngredientScreen';
import LoginScreen from './LoginScreen';

export default class CurrentScreen extends Component {
  static defaultProps = {
    sortList: undefined,
    changeItemQuantity: undefined,
    inventory: [],
    setUser: undefined,
    loggedIn: false,
  }

  render() {
    const state = 0
    let screen;
    if (this.props.loggedIn == false) {
      screen = <LoginScreen
        setUser={this.props.setUser}
      />
    } else {
      screen = <IngredientScreen 
      setUser={this.props.setUser}/>
    }
    return (
      <View style={styles.container}>
      {
        this.props.loggedIn == false
        ? 
        <LoginScreen
          setUser={this.props.setUser}
        />
      : <IngredientScreen 
      setUser={this.props.setUser}
        sortList={this.props.sortList}
        changeItemQuantity={this.props.changeItemQuantity}
        inventory={this.props.inventory}
      />
      }
      </View>
    )
  }
}

const styles = StyleSheet.create({ 
  buttons: {
    flexDirection: "row",
    marginRight: 10,
  },
  banner: {
    backgroundColor: 'green',
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
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  iconContainer: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0)',
    alignItems:'flex-end',
    justifyContent:'flex-end',
    width:50,
    height:50,
    backgroundColor:'green',
    borderRadius:50,
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