import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Button, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
import Icon from './Icon';
import List from './UIcomponents/List';
import ActionBar from './UIcomponents/ActionBar';

import BarcodeScanner from './UIcomponents/BarcodeScanner';
import firebase from 'firebase';

export default class IngredientScreen extends Component {
  state = {
    cameraOn: false,
    filter: this.props.inventory,
    text: '',
  }
 
  static defaultProps = {
    sortList: undefined,
    changeItemQuantity: undefined,
    inventory: [],
    setUser: undefined,
  }
  
  toggleCamera = () => {
    this.setState({ cameraOn: !this.state.cameraOn });
  }

  addNewItem = () => {
    this.props.changeItemQuantity(this.state.text, 1)
    this.setState({ text: '', filter: this.props.inventory })
  }

  logOut = () => {
    firebase.auth().signOut();
    //simple statement checking if user is logged in or not.
    //should be used to see if user login splash-screen should be put up or not
    firebase.auth().onAuthStateChanged(firebaseUser => {
      console.log("checking authentication");
      if(firebaseUser){
        console.log("loggin in successfully");
        this.props.setUser(true);
      }else{
        console.log("not logged in");
        //pull up login splash-screen
        this.props.setUser(false);
      }
    });
  }

  searchData = (text) => {
    var searchResults = [] //make a copy of the current array
    for (var j = 0; j < this.props.inventory.length; j++) {
      var match = true
      for (var l = 0; l < text.length; l++) {
        if (text.charAt(l).toLowerCase() != this.props.inventory[j].key.charAt(l).toLowerCase()) {
          match = false
          break
        }
      }
      if (match) searchResults.push(this.props.inventory[j])
    }
    this.setState({ text: text, filter: searchResults })
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.banner}>
          <Text style={styles.headerText}>My Ingredients</Text>
            <TouchableOpacity
              style={styles.end}
              onPress={this.logOut}
            >
              <Icon
                style={styles.icon}
                name="log-out"
                color="white"
                size={30}
              />
            </TouchableOpacity>
        </View>
        {
          this.state.cameraOn == false
            ? null
            : <BarcodeScanner
              changeItemQuantity={this.props.changeItemQuantity}
            />
        }
        <View style={styles.container}>
          <ActionBar
            text={this.state.text}
            toggleCamera={this.toggleCamera}
            addNewItem={this.addNewItem}
            searchData={this.searchData}
            sortList={this.props.sortList}
          />
          <List
            data={this.state.text == ''
              ? this.props.inventory
              : this.state.filter
            }
            changeItemQuantity={this.props.changeItemQuantity}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({ 
  buttons: {
    flexDirection: "row",
    marginRight: 10,
  },
  banner: {
    backgroundColor: 'green',
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
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  headerText: {
    flex: 1,
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