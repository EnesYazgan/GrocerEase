import React, { Component } from 'react';
import {View, StatusBar, AppState} from 'react-native'
//import * as firebase from 'firebase';
import firebase from 'firebase';
import Ingredient from './objects/Ingredient';
import IngredientScreen from './components/IngredientScreen';
import LoginScreen from './components/LoginScreen';
import DataBase from './components/firebase.js';

const firebaseConfig = {
  apiKey: "AIzaSyBh5vN_SwkYpZ7iwX3Auu0_xKVZMmlR8AI",
  authDomain: "grocerease-6e9ee.firebaseapp.com",
  databaseURL: "https://grocerease-6e9ee.firebaseio.com",
  projectId: "grocerease-6e9ee",
  storageBucket: "grocerease-6e9ee.appspot.com",
  messagingSenderId: "719228868931"
};

firebase.initializeApp(firebaseConfig);

export default class App extends Component {
  constructor(props) {
		super(props)
	}

	state = {
		currentUserId: undefined,
		appState: AppState.currentState,
		inventory: [], //elements are ingredients
		testInv: [],
		isLoggedIn: false,
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged(firebaseUser => {
			if (firebaseUser) {
				this.state.currentUserId = firebase.auth().currentUser.uid;  
        this.setState({ isLoggedIn: true })

			} else {
				this.setState({ isLoggedIn: false })
			}
		});
	}

	render() {
		return (
			<this.GetCurrentScreen />
		)
	}

	GetCurrentScreen = () => {
		if (this.state.isLoggedIn == false) {
			return this.constructedLoginScreen();
		} else {
			return this.constructedIngredientsScreen();
		}
	}

	constructedLoginScreen = () => {
		return <LoginScreen
			signUp={(email, password) => {
				console.log("Sign up:");
				if (!(email == undefined) && !(password == undefined)) {
					firebase.auth().createUserWithEmailAndPassword(email, password)
						.then(() => {
							this.setState({ currentUserId: firebase.auth().currentUser.uid, isLoggedIn: true })
							this.cloneFirebaseInventory(this.state.currentUserId);
						}
						)
						.catch(
							(error) => {
								var errorMessage = error.message;
								alert(errorMessage);
							}
						)
				}
			}}
			login={(email, password) => {
				console.log("Log in:");
				if (!(email == undefined) && !(password == undefined)) {
					firebase.auth().signInWithEmailAndPassword(email, password)
						.then(() => {
							this.setState({ currentUserId: firebase.auth().currentUser.uid, isLoggedIn: true })
							this.cloneFirebaseInventory(this.state.currentUserId);
						}
						)
						.catch(
							(error) => {
								var errorMessage = error.message;
								alert(errorMessage);
							}
						)
				}
			}}
		/>
	}
	
	constructedIngredientsScreen = () => {
		return <IngredientScreen
			data={this.state.inventory}
			userId={this.state.currentUserId}
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
				//Update the database every time the list is changed. This works!
				DataBase.updateMe(this.state.currentUserId, newInventory);
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
				//Update the database every time the list is changed. This works!
				DataBase.updateMe(this.state.currentUserId, newInventory);
			}}
			logOut={() => {
				firebase.auth().signOut();
				this.setState({ isLoggedIn: false });
				//clear local inventory upon logout
				this.setState({ inventory: [] });
			}}
		/>
	}

	cloneFirebaseInventory = (userId) => {
		firebase.database().ref('/users/' + userId).once('value')
			.then((snapshot) => {
				//snapshot.val() is the list we want
				list = snapshot.val();

				//lists it properly
				//console.log("User's List: " + list);
				if (list.length > 0) {
					var ingredientsList = [];

					var ingParams;
					var ing;
					for (var i = 0; i < list.length; i++) {
						ingParams = list[i].split(",");
						ing = new Ingredient(
							ingParams[0],  //name is a string
							parseInt(ingParams[1], 10),  //quantity is an int
							ingParams[2], //unit is a string
							parseInt(ingParams[3], 10),  //calories is an int
							parseInt(ingParams[4], 10), //seving is an int
							ingParams[5], //expiry is a string, unless we decide to make it be an int displaying days until expiry
						);
						ingredientsList.push(ing);
					}

					console.log("Retrieved " + userId + "'s list:");
					for (var i = 0; i < ingredientsList.length; i++) {
						console.log("DB ings ==> " + ingredientsList[i].toSingleString());
					}

					this.setState({ inventory: ingredientsList });
				}

				/*****Inventory gets set to database****/
				//only happens when when first logged in
				// if (this.state.beginning == true) {
				// 	console.log("beginning!");
				// 	this.state.beginning = false;
				// 	for (var i = 0; i < ingredientsList.length; i++) {
				// 		this.state.inventory.push(ingredientsList[i]);
				// 	}
				// }
				// this.state.testInv = ingredientsList;
			});
	}
}
