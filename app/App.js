import React, { Component } from 'react';
import { View, StatusBar, AppState } from 'react-native'
//import * as firebase from 'firebase';
import firebase from 'firebase';
import Ingredient from './objects/Ingredient';
import IngredientScreen from './components/IngredientScreen';
import LoginScreen from './components/LoginScreen';
import RecipeScreen from './components/RecipeScreen';
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
		screen: 'login',
		recipes: [],
	}

	loginAndGetData = (userId) => {
		this.cloneFirebaseInventory(userId)
		this.setState({
			currentUserId: userId, screen: 'ingredients'
		})
	}

	logoutAndClearData = () => {
		firebase.auth().signOut();
		this.setState({ currentUserId: undefined, inventory: [], screen: 'login' })
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged(firebaseUser => {
			if (firebaseUser) {
				this.loginAndGetData(firebase.auth().currentUser.uid)
			} else {
				this.logoutAndClearData()
			}
		});
	}

	render() {
		return (
			<this.GetCurrentScreen />
		)
	}

	GetCurrentScreen = () => {
		if (this.state.screen == 'login') {
			return this.constructedLoginScreen();
		} else {
			if (this.state.screen == 'ingredients') {
				return this.constructedIngredientScreen();
			}
			else if (this.state.screen == 'recipes') {
				return this.constructedRecipeScreen();
			}
		}
	}

	constructedLoginScreen = () => {
		return <LoginScreen
			signUp={(email, password) => {
				console.log("Sign up:");
				if (!(email == undefined) && !(password == undefined)) {
					alert('Checking authentication', 'One moment please...');
					firebase.auth().createUserWithEmailAndPassword(email, password)
						.then(() => {
							this.loginAndGetData(firebase.auth().currentUser.uid)
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
					alert('Checking authentication', 'One moment please...');
					firebase.auth().signInWithEmailAndPassword(email, password)
						.then(() => {
							this.loginAndGetData(firebase.auth().currentUser.uid)
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

	constructedIngredientScreen = () => {
		return <IngredientScreen
			data={this.state.inventory}
			changeItemQuantity={(itemName, quantity) => {
				var newInventory = this.state.inventory.slice(0);
				var foundIngredient = newInventory.find(eachIngredient => eachIngredient.key === itemName);
				if (typeof foundIngredient == 'undefined') {
					newInventory.push(new Ingredient(itemName.toTitleCase, quantity, 'none', 0, 0, 'none set'));
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

			changeItemCalories={(itemName, calories) => {
				var newInventory = this.state.inventory.slice(0);
				var foundIngredient = newInventory.find(eachIngredient => eachIngredient.key === itemName);
				foundIngredient.calories = calories;
				this.setState({ inventory: newInventory });
				//Update the database every time the list is changed. This works!
				DataBase.updateMe(this.state.currentUserId, newInventory);
			}}

			changeItemServingSize={(itemName, serving) => {
				var newInventory = this.state.inventory.slice(0);
				var foundIngredient = newInventory.find(eachIngredient => eachIngredient.key === itemName);
				foundIngredient.serving = serving;
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
			switchScreen={() => {
				console.log('switching to recipes screen')
				this.setState({ screen: 'recipes' });
			}}
			logOut={() => {
				this.logoutAndClearData()
			}}
		/>
	}

	constructedRecipeScreen = () => {
		returnMatchingRecipes = (allRecipes) => {
			var matchingRecipes = this.state.inventory.slice(0);
			var searchResults = [] //make a copy of the current array
			for (var j = 0; j < this.props.data.length; j++) {
				var match = true
				for (var l = 0; l < text.length; l++) {
					if (text.charAt(l).toLowerCase() != this.props.data[j].key.charAt(l).toLowerCase()) {
						match = false
						break
					}
				}
				if (match) searchResults.push(this.props.data[j])
			}
			this.setState({ text: text, filter: searchResults })
			//allRecipes.find(eachRecipe => )
			this.props.changeItemQuantity(item.key, 1)
		}

		return <RecipeScreen
			data={
				this.state.recipes
			}
			userData={
				this.state.inventory
			}
			changeItemQuantity={(itemName, quantity) => {
				var newInventory = this.state.inventory.slice(0);
				var foundIngredient = newInventory.find(eachIngredient => eachIngredient.key === itemName);
				if (typeof foundIngredient == 'undefined') {
					newInventory.push(new Ingredient(itemName.toTitleCase(), quantity));
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
			switchScreen={() => {
				this.setState({ screen: 'ingredients' });
			}}
			logOut={() => {
				this.logoutAndClearData()
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

					this.setState({ inventory: ingredientsList }, this.getRecipes)
				}
			});
	}

	getRecipes = () => {
		firebase.database().ref('/recipe').once('value')
			.then((snapshot) => {
				list = snapshot.val();
				list.sort((recipeA, recipeB) => {
					var countMatching = 0;
					if (typeof recipeA.ingredients != 'undefined' && typeof recipeB.ingredients != 'undefined') {
						this.state.inventory.forEach(userIngredient => {
							recipeA.ingredients.forEach(ingredient => {
								if (ingredient.name.toTitleCase().includes(userIngredient.key))
									countMatching++;
							})
						});
						this.state.inventory.forEach(userIngredient => {
							recipeB.ingredients.forEach(ingredient => {
								if (ingredient.name.toTitleCase().includes(userIngredient.key))
									countMatching--;
							})
						});
					} else {
						console.log('AHA THERES THE ERROR. EITHER IN RECIPE: ' + recipeA.title + ' OR ' + recipeB.title)
					}
					return countMatching;
				})
				this.setState({recipes: list})
			})
			.catch(console.log('CANT FIND THE RECIPE'))
	}
}

String.prototype.toTitleCase = function () {
	return this.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
};