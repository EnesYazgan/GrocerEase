import React, { Component } from 'react';
import {View, StatusBar, AppState} from 'react-native'
//import * as firebase from 'firebase';
import firebase from 'firebase';
import Ingredient from './objects/Ingredient';
import IngredientScreen from './components/IngredientScreen';
import LoginScreen from './components/LoginScreen';

// const firebaseConfig = {
//   apiKey: "AIzaSyBh5vN_SwkYpZ7iwX3Auu0_xKVZMmlR8AI",
//   authDomain: "grocerease-6e9ee.firebaseapp.com",
//   databaseURL: "https://grocerease-6e9ee.firebaseio.com",
//   projectId: "grocerease-6e9ee",
//   storageBucket: "grocerease-6e9ee.appspot.com",
//   messagingSenderId: "719228868931"
// };

firebase.initializeApp(firebaseConfig);

export default class App extends Component {
  constructor(props) {
    super(props)
    //this.itemsRef = firebaseApp.database().ref();
  }

  state = {
    appState: AppState.currentState,
    inventory: [],
    isLoggedIn: false,
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        this.setState({ isLoggedIn: true })
      } else {
        this.setState({ isLoggedIn: false })
      }
    });
    console.log('I PRINTED SOME THING');
    /*
    AppState.addEventListener('change', this._handleAppStateChange);
    this.itemsRef.once('value').then(snapshot => {
      this.setState({ inventory: snapshot.val() })
    })
    */
  }

  // componentWillUnmount() {
  //   AppState.removeEventListener('change', this._handleAppStateChange);
  // }

  // _handleAppStateChange = (nextAppState) => {
  //   console.log('WHATS THE STATE?: ' + nextAppState);
  //   //if (nextAppState === 'inactive' || nextAppState === 'background') {
  //     //this.itemsRef.push(this.state.inventory);
  //   //}
  //   this.setState({appState: nextAppState});
  // }

  render() {
    return (
      <this.SetCurrentScreen/>
    )
  }

  SetCurrentScreen = () => {
    if (this.state.isLoggedIn == false) {
      return <LoginScreen
        signUp={(email, password) => {
          firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => this.setState({ isLoggedIn: true }))
            .catch(() => console.log("error signing up caught"))
        }}
        login={(email, password) => {
          firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => this.setState({ isLoggedIn: true }))
            .catch(() => console.log("error logging in caught"))
        }}
      />
    } else {
      return <IngredientScreen
        data={this.state.inventory}
        changeItemQuantity={(itemName, quantity) => {
          var newInventory = this.state.inventory.slice(0);
          var foundIngredient = newInventory.find(eachIngredient => eachIngredient.key === itemName);
          if (typeof foundIngredient == 'undefined') {
            newInventory.push(new Ingredient(itemName, quantity));
          }
          else {
            foundIngredient.quantity = foundIngredient.quantity + quantity
            if (foundIngredient.quantity < 0)
              newInventory.splice(newInventory.indexOf(foundIngredient), 1)
          }
          this.setState({ inventory: newInventory });
        }}
        orderList={(parameter) => {
          var newInventory = this.state.inventory.slice(0);
          if (parameter == true)
            newInventory.sort();
          else {
            newInventory.sort();
            newInventory.reverse();
          }
          this.setState({ inventory: newInventory });
        }}
        logOut={() => {
          firebase.auth().signOut();
          this.setState({ isLoggedIn: false })
        }}
      />
    }
  }

  /*
  handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'inactive') {
      console.log('the app is closed');
    }
  }
  */
}
