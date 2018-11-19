import React, { Component } from 'react';
import {View, StatusBar, AppState} from 'react-native'
import CurrentScreen from './components/CurrentScreen';
//import * as firebase from 'firebase';
import firebase from 'firebase';
import Ingredient from './objects/Ingredient';

// const firebaseConfig = {
//   apiKey: "AIzaSyBh5vN_SwkYpZ7iwX3Auu0_xKVZMmlR8AI",
//   authDomain: "grocerease-6e9ee.firebaseapp.com",
//   databaseURL: "https://grocerease-6e9ee.firebaseio.com",
//   projectId: "grocerease-6e9ee",
//   storageBucket: "grocerease-6e9ee.appspot.com",
//   messagingSenderId: "719228868931"
// };

//const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class App extends Component {
  constructor(props) {
    super(props)
    //this.itemsRef = firebaseApp.database().ref();
  }

  state = {
    appState: AppState.currentState,
    inventory: [],
    sortParameter: true,
    loggedIn: false,
  }

  componentDidMount() {
    console.log('I PRINTED SOME THING');
    /*
    AppState.addEventListener('change', this._handleAppStateChange);
    this.itemsRef.once('value').then(snapshot => {
      this.setState({ inventory: snapshot.val() })
    })
    */
  }

  logIn = (login) => {
    this.setState({ loggedIn: login });
  }

  sortList = () => {
    var newInventory = this.state.inventory.slice(0);
    if (this.state.sortParameter == true)
      newInventory.sort();
    else {
      newInventory.sort();
      newInventory.reverse();
    }
    this.setState({ inventory: newInventory, sortParameter: !this.state.sortParameter });
  }

  changeItemQuantity = (key, quantityChange) => {
    var newInventory = this.state.inventory.slice(0);
    var obj = newInventory.find(o => o.key === key);
    if (typeof obj != 'undefined') {
      obj.quantity = obj.quantity + quantityChange
      if (obj.quantity < 0)
        newInventory.splice(newInventory.indexOf(obj), 1)
    }
    else {
      newInventory.push(new Ingredient(key, quantityChange));
    }
    this.setState({ inventory: newInventory });
    console.log(key)
  }

  render() {
    return (
      <CurrentScreen
        changeItemQuantity={this.changeItemQuantity}
        sortList={this.sortList}
        inventory={this.state.inventory}
        loggedIn={this.state.loggedIn}
        setUser={this.logIn}
      />
    );
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    console.log('WHATS THE STATE?: ' + nextAppState);
    //if (nextAppState === 'inactive' || nextAppState === 'background') {
      //this.itemsRef.push(this.state.inventory);
    //}
    this.setState({appState: nextAppState});
  }

  /*
  handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'inactive') {
      console.log('the app is closed');
    }
  }
  */
}
