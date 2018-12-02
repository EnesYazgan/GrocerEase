import React, { Component } from 'react';
import { View, StatusBar, AppState } from 'react-native'
import Ingredient from './objects/Ingredient';
import IngredientScreen from './components/IngredientScreen';
import LoginScreen from './components/LoginScreen';
import RecipeScreen from './components/RecipeScreen';
import DataBase from './components/firebase.js';
import LoadingScreen from './components/LoadingScreen';

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

export default class App extends Component {
	constructor(props) {
		super(props)
	}

	state = {
		currentUserId: undefined,
		appState: AppState.currentState,
		inventory: [], //elements are ingredients
		screen: 'login',
		recipes: [],
		receivingChange: true,
		loading: false,
	}

	loginAndGetData = (userId) => {
		DataBase.getFirebaseRecipes((list) => {
			list.forEach(recipe => {
				recipe.key = recipe.title
				recipe.manualMatching = false;
				recipe.matchingIngredients = [];
				recipe.ingredients.forEach(ingredient => {
					ingredient.perfectMatch = false;
					ingredient.name = ingredient.name.toTitleCase()
				})
				recipe.equipment_names.forEach(tool => {
					tool = tool.toTitleCase()
				})
			});
			this.checkRecipesWithMyIngredients(list)
		})
		DataBase.createFirebaseInventoryListener(
			userId,
			this.state.receivingChange,
			(importedInventory) => this.setState({ loading: false, inventory: importedInventory }, this.checkRecipesWithMyIngredients(this.state.recipes)),
			() => this.setState({ receivingChange: true })
		)
		this.setState({ currentUserId: userId, screen: 'ingredients', loading: true })
	}

	logoutAndClearData = () => {
		DataBase.signOut();
		this.setState({ currentUserId: undefined, inventory: [], screen: 'login', loading: false })
	}

	componentDidMount() {
		DataBase.checkIfLoggedIn(this.loginAndGetData, this.logoutAndClearData)
		this.setState({ loading: true })
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
			if (this.state.loading == true) {
				return <LoadingScreen
					screen={this.state.screen}
					logOut={() => {
						this.logoutAndClearData()
					}}
					switchToRecipes={() => {
						this.setState({ screen: 'recipes' });
					}}
					switchToIngredients={() => {
						this.setState({ screen: 'ingredients' });
					}}
				/>
			} else {
				if (this.state.screen == 'ingredients') {
					return this.constructedIngredientScreen();
				}
				else if (this.state.screen == 'recipes') {
					return this.constructedRecipeScreen();
				}
			}
		}
	}

	constructedLoginScreen = () => {
		return <LoginScreen
			signUp={(email, password) => {
				if (!(email == undefined) && !(password == undefined)) {
					DataBase.createUserWithEmailAndPassword(email, password, this.loginAndGetData)
					this.setState({ loading: true })
				}
			}}
			login={(email, password) => {
				if (!(email == undefined) && !(password == undefined)) {
					DataBase.signInWithEmailAndPassword(email, password, this.loginAndGetData)
					this.setState({ loading: true })
				}
			}}
			loading={this.state.loading}
		/>
	}

	addIngredientToInventory = (itemName) => {
		var newInventory = this.state.inventory.slice(0);
		var foundIngredient = newInventory.find(eachIngredient => eachIngredient.key === itemName);
		if (typeof foundIngredient == 'undefined') {
			//if item already exists in list, increment quantity by 1
			newIngredient = new Ingredient(itemName.toTitleCase());
			newInventory.push(newIngredient);
		} else {
			//if item already exists in list, increment quantity by 1
			foundIngredient.quantity = foundIngredient.quantity + 1
		}
		this.setState({ inventory: newInventory, receivingChange: false }, () => DataBase.updateMe(this.state.currentUserId, newInventory));
		//Update the database every time the list is changed. This works!
	}

	changeIngredientInInventory = (itemName, attribute, newValue) => {
		var newInventory = this.state.inventory.slice(0);
		var foundIngredient = newInventory.find(eachIngredient => eachIngredient.key === itemName);
		//if the name is going to change, check if item already exists in the array first. if it does, combine them
		if (attribute == 'key') {
			newValue = newValue.toTitleCase()
			let existingIngredient = newInventory.find(eachIngredient => eachIngredient.key === newValue)
			if (typeof existingIngredient != 'undefined') {
				existingIngredient.quantity = existingIngredient.quantity + foundIngredient.quantity
				newInventory.splice(newInventory.indexOf(foundIngredient), 1)
			}
		}
		foundIngredient[attribute] = newValue;
		//remove item from list when quantity is less than 0
		if (attribute == 'quantity' && foundIngredient.quantity < 0)
			newInventory.splice(newInventory.indexOf(foundIngredient), 1)
		this.setState({ inventory: newInventory, receivingChange: false }, () => DataBase.updateMe(this.state.currentUserId, newInventory));
		//Update the database every time the list is changed. This works!
	}

	constructedIngredientScreen = () => {
		return <IngredientScreen
			data={this.state.inventory}

			checkBarcode={(barcode) => {
				DataBase.checkBarcode(barcode, this.addIngredientToInventory)
			}}

			addItem={(itemName) => {
				this.addIngredientToInventory(itemName);
				console.log("getting added: " + itemName);
			}}

			changeItemName={(itemName, newName) => {
				this.changeIngredientInInventory(itemName, 'key', newName)
			}}

			changeItemQuantity={(itemName, quantity = 1) => {
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
				if (parameter == true) {
					newInventory.sort(function (a, b) { return a.key.localeCompare(b.key) });
				} else {
					newInventory.reverse();
				}
				this.setState({ inventory: newInventory, receivingChange: false }, () => DataBase.updateMe(this.state.currentUserId, newInventory));
			}}

			switchScreen={() => {
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
				() => { this.checkRecipesWithMyIngredients(this.state.recipes); this.setState() }
			}

			orderList={(parameter) => {
				var list = this.state.recipes.slice(0);
				if (parameter == true) {
					list.sort(function (recipeA, recipeB) {
						var percentA = (recipeA.matchingIngredients.length * 100) / recipeA.ingredients.length;
						var percentB = (recipeB.matchingIngredients.length * 100) / recipeB.ingredients.length;

						return percentB - percentA;
					})
				} else {
					list.sort(function (recipeA, recipeB) {
						if (recipeB.matchingIngredients.length == recipeA.matchingIngredients.length) {
							return (recipeB.ingredients.length - recipeA.ingredients.length)
						} else {
							return (recipeB.matchingIngredients.length - recipeA.matchingIngredients.length)
						}
					})
				}
				this.setState({ recipes: list });
			}}

			setManualMatching={(recipe, parameter) => {
				var newInventory = this.state.recipes.slice(0);
				var foundRecipe = newInventory.find(eachRecipe => eachRecipe.title === recipe.title);
				foundRecipe.manualMatching = parameter;
				this.setState({ recipes: newInventory, });
			}}
			removeIngredientFromMatching={(recipe, ingredient) => {
				var newInventory = this.state.recipes.slice(0);
				var foundRecipe = newInventory.find(eachRecipe => eachRecipe.title === recipe.title);
				var foundIngredient = foundRecipe.matchingIngredients.find(eachIngredient => eachIngredient.name === ingredient.name);
				if (typeof foundIngredient != 'undefined')
					foundRecipe.matchingIngredients.splice(foundRecipe.matchingIngredients.indexOf(foundIngredient), 1)
				this.setState({ recipes: newInventory, });
			}}
			addIngredientToMatching={(recipe, ingredient) => {
				var newInventory = this.state.recipes.slice(0);
				var foundRecipe = newInventory.find(eachRecipe => eachRecipe.title === recipe.title);
				var foundIngredient = foundRecipe.ingredients.find(eachIngredient => eachIngredient.name === ingredient.name);
				if (typeof foundIngredient != 'undefined') {
					foundIngredient.perfectMatch = true;
					foundRecipe.matchingIngredients.push(foundIngredient)
				}
				this.setState({ recipes: newInventory, });
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

	checkRecipesWithMyIngredients = (list) => {
		list.forEach(recipe => {
			if (!recipe.manualMatching) {
				recipe.matchingIngredients = [];
				this.state.inventory.forEach(userIngredient => {
					let latestMatch = 10000;
					let matchedIngredient = null;
					let percentMatch = 0;
					recipe.ingredients.forEach(ingredient => {
						ingredient.perfectMatch = false;
						ingredient.name = ingredient.name.toTitleCase()
						wordsInUserIngredient = userIngredient.key.split(" ");
						wordsInUserIngredient.forEach(word => {
							if (ingredient.name.indexOf(word) > -1) {
								percentMatch = percentMatch + (1 / wordsInUserIngredient.length)
							}
							if (ingredient.name.indexOf(word) > -1 && ingredient.name.indexOf(word) / ingredient.name.length < latestMatch) {
								matchedPosition = ingredient.name.indexOf(word) / ingredient.name.length
								matchedIngredient = ingredient;
							}
						})
						if (percentMatch > 0.4) {
							matchedIngredient = ingredient;
						}
					})
					if (matchedIngredient != null) {
						recipe.matchingIngredients.push(matchedIngredient)
						if ((matchedIngredient.name.length / userIngredient.key.length) < 5 || percentMatch > 0.5) {
							matchedIngredient.perfectMatch = true;
						}
					}
					recipe.equipment_names.forEach(tool => {
						tool = tool.toTitleCase()
					})
				});
			}
		});

		list.sort((recipeA, recipeB) => {
			if (recipeB.matchingIngredients.length == recipeA.matchingIngredients.length)
				return (recipeB.ingredients.length - recipeA.ingredients.length)
			else
				return (recipeB.matchingIngredients.length - recipeA.matchingIngredients.length)
		})
		this.setState({ recipes: list })
	}
}

String.prototype.toTitleCase = function () {
	return this.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
};
