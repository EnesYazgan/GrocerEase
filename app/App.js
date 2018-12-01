import React, { Component } from 'react';
import { View, StatusBar, AppState } from 'react-native'
//import * as firebase from 'firebase';
import firebase from 'firebase';
import Ingredient from './objects/Ingredient';
import IngredientScreen from './components/IngredientScreen';
import LoginScreen from './components/LoginScreen';
import RecipeScreen from './components/RecipeScreen';
import DataBase from './components/firebase.js';

//For android get rid of Yellow Box-------------------------
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
	if (message.indexOf('Setting a timer') <= -1) {
		_console.warn(message);
	}
};
//End Yellowbox ignore--------------------------------------

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
		receivingChange: true,
	}

	loginAndGetData = (userId) => {
		this.createFirebaseInventoryListener(userId)
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

	shouldComponentUpdate(nextProps, nextState){
		return true;
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
					// alert('Checking authentication', 'One moment please...');
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
					// alert('Checking authentication', 'One moment please...');
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

	changeIngredientInInventory = (itemName, attribute, newValue) => {
		var newInventory = this.state.inventory.slice(0);
		var foundIngredient = newInventory.find(eachIngredient => eachIngredient.key === itemName);
		if (attribute != 'quantity') {
			foundIngredient[attribute] = newValue;
		}
		else {
			if (typeof foundIngredient == 'undefined') {
				newIngredient = new Ingredient(itemName.toTitleCase(), newValue);
				newInventory.push(newIngredient);
			} else {
				foundIngredient.quantity = foundIngredient.quantity + newValue
				if (foundIngredient.quantity < 0)
					newInventory.splice(newInventory.indexOf(foundIngredient), 1)
			}
		}
		// newInventory.splice(newInventory.indexOf(foundIngredient), 1, );
		this.setState({ inventory: newInventory, receivingChange: false }, () => DataBase.updateMe(this.state.currentUserId, newInventory));
		//Update the database every time the list is changed. This works!
	}

	constructedIngredientScreen = () => {
		return <IngredientScreen
			data={this.state.inventory}

			checkBarcode={(barcode) => {
				firebase.database().ref('/barcode-upc' + barcode.length + '/' + barcode + '/').once("value", snapshot => {
					if (snapshot.exists()) {
						changeItemQuantity(snapshot.val().name, 1);
					} else {
						alert('barcode does not exist in database');
					}
				})
			}}

			changeItemName={(itemName, newName) => {
				this.changeIngredientInInventory(itemName, 'key', newName)
			}}

			changeItemQuantity={(itemName, quantity) => {
				this.changeIngredientInInventory(itemName, 'quantity', quantity)
			}}

			changeItemCalories={(itemName, calories) => {
				this.changeIngredientInInventory(itemName, 'calories', calories)
			}}

			changeItemServingSize={(itemName, serving) => {
				this.changeIngredientInInventory(itemName, 'serving', serving)
			}}

			changeItemExpiration={(itemName, expiry, num) => {
				this.changeIngredientInInventory(itemName, 'expiry', expiry)
				this.changeIngredientInInventory(itemName, 'isExpired', num)
			}}

			changeItemCarbs={(itemName, carbs) => {
				this.changeIngredientInInventory(itemName, 'carbs', carbs)
			}}

			changeItemProtein={(itemName, protein) => {
				this.changeIngredientInInventory(itemName, 'protein', protein)
			}}

			changeItemSugar={(itemName, sugar) => {
				this.changeIngredientInInventory(itemName, 'sugar', sugar)
			}}
			changeItemFat={(itemName, fat) => {
				this.changeIngredientInInventory(itemName, 'fat', fat)
			}}
			changeItemSodium={(itemName, sodium) => {
				this.changeIngredientInInventory(itemName, 'sodium', sodium)
			}}
			
			orderList={(parameter) => {
				var newInventory = this.state.inventory.slice(0);
					newInventory.sort();
					newInventory.reverse();
				this.setState({ inventory: newInventory });
				//Update the database every time the list is changed. This works!
				//DataBase.updateMe(this.state.currentUserId, newInventory);
			}}

			updateList={(newInventory) => {
				console.log('the inventory that is being passed has a length...' + newInventory.length)
				this.setState({ inventory: newInventory, receivingChange: false }, () => DataBase.updateMe(this.state.currentUserId, newInventory));
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
		return <RecipeScreen
			data={
				this.state.recipes
			}
			sortList={
				this.getRecipes
			}
			orderList={(parameter) => {
				var list = this.state.recipes.slice(0);
				if (parameter == true){
					list.sort((recipeA, recipeB) => {	
						var percentA = (recipeA.matchingIngredients.length * 100) / recipeA.ingredients.length;
						var percentB = (recipeB.matchingIngredients.length * 100) / recipeB.ingredients.length;
						
						
						return percentB - percentA;
					})
				} else {
					list.sort((recipeA, recipeB) => {	
						console.log("! Comparison made. \nA: " + recipeA.matchingIngredients.length + "\nB: " + recipeB.matchingIngredients.length);
						if (recipeB.matchingIngredients.length == recipeA.matchingIngredients.length){
							console.log("comparison made, new got: " + recipeB.ingredients.length - recipeA.ingredients.length);
							return (recipeB.ingredients.length - recipeA.ingredients.length)
						}else{
							console.log("comparison made, new got: " + recipeB.matchingIngredients.length - recipeA.matchingIngredients.length);
							return (recipeB.matchingIngredients.length - recipeA.matchingIngredients.length)
						}
					})
				}
				this.setState({recipes: list});
				console.log("Recipes sorted");
				console.log("sorted list of recipes!");
			}}
			userData={
				this.state.inventory
			}
			switchScreen={() => {
				this.setState({ screen: 'ingredients' });
			}}
			logOut={() => {
				this.logoutAndClearData()
			}}
		/>
	}

	createFirebaseInventoryListener = (userId) => {
		firebase.database().ref('/users/' + userId).on('value', (snapshot) => {
			if (snapshot.exists()) {
				//snapshot.val() is the list we want
				list = snapshot.val()
				if (this.state.receivingChange == true) {
					console.log("the lists are incongruent");
					//lists it properly
					// console.log("User's List: " + list);
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
								parseInt(ingParams[6], 10), //isExpired is an int
								parseInt(ingParams[7], 10), //carbs is an int
								parseInt(ingParams[8], 10), //protein is an int
								parseInt(ingParams[9], 10), //sugar is an int
								parseInt(ingParams[10], 10), //fat is an int
								parseInt(ingParams[11], 10), //sodium is an int
							);
							ingredientsList.push(ing);
						}
					}

					console.log("Retrieved " + userId + "'s list:");
					this.setState({ inventory: ingredientsList }, this.getRecipes)
				} else {
					this.setState({ receivingChange: true })
				}
			}
		});
	}

	getRecipes = () => {
		firebase.database().ref('/recipe').once('value')
			.then((snapshot) => {
				if (snapshot.exists()) {
				list = snapshot.val().slice(0);
				list.forEach(recipe => {
					recipe.key = recipe.title
					recipe.matchingIngredients = [];
					this.state.inventory.forEach(userIngredient => {
						if (typeof recipe.ingredients != 'undefined') {
							recipe.ingredients.forEach(ingredient => {
								ingredient.name = ingredient.name.toTitleCase()
								if (ingredient.name.includes(userIngredient.key))
									recipe.matchingIngredients.push(ingredient)
							})
							recipe.equipment_names.forEach(tool => {
								tool = tool.toTitleCase()
							})
						}
					});
					console.log('matching ingredients are ' + recipe.matchingIngredients)
				});
				list.sort((recipeA, recipeB) => {
					if (recipeB.matchingIngredients.length == recipeA.matchingIngredients.length)
						return (recipeB.ingredients.length - recipeA.ingredients.length)
					else
						return (recipeB.matchingIngredients.length - recipeA.matchingIngredients.length)
				})
				this.setState({ recipes: list })
			}
			})
			.catch(() => console.log('CANT FIND THE RECIPE'))
	}
}

String.prototype.toTitleCase = function () {
	return this.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
};