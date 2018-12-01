import firebase from 'firebase';
import Ingredient from '../objects/Ingredient';
import React, { Component } from 'react';

const config = {
  apiKey: "AIzaSyBh5vN_SwkYpZ7iwX3Auu0_xKVZMmlR8AI",
  authDomain: "grocerease-6e9ee.firebaseapp.com",
  databaseURL: "https://grocerease-6e9ee.firebaseio.com",
  projectId: "grocerease-6e9ee",
  storageBucket: "grocerease-6e9ee.appspot.com",
  messagingSenderId: "719228868931"
};

export default class DataBase{
	constructor(){
		firebase.initializeApp(config);
	}

	database = firebase;

	//to delete a user..
	deleteMe(userId) {
		firebase.database().ref('users/' + userId).remove();
	}

	//update a user's list
	static updateMe(userId, list) {
		console.log("adding to database");

		//Add list elements to update array
		const update = new Array();
		for(var i = 0; i < list.length; i++){
			update[i] = list[i].toSingleString();
		}

		//set it to the list corresponding to userID
		firebase.database().ref('users/' + userId).set(update);
	}
	
	/*
	getFirebaseInventoryAndCreateListener(userId) {
		firebase.database().ref('/users/' + userId).on('value', (snapshot) => {
			//snapshot.val() is the list we want
			list = snapshot.val().slice(0);

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
			for (var i = 0; i < ingredientsList.length; i++) {
				console.log("DB ings ==> " + ingredientsList[i].toSingleString());
			}

			return ingredientsList;
		}
		)
	}

	getSortedFirebaseRecipes(inventory) {
		firebase.database().ref('/recipe').once('value')
			.then((snapshot) => {
				list = snapshot.val().slice(0);
				list.forEach(recipe => {
					recipe.key = recipe.title
					recipe.matchingIngredients = [];
					inventory.forEach(userIngredient => {
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
				return list;
			})
			.catch(() => {
				console.log('CANT FIND THE RECIPE');
				return null;
			})
	}
	*/
}
