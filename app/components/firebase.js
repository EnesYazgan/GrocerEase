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

		//Add list elements to update array
		const update = new Array();
		for(var i = 0; i < list.length; i++){
			update[i] = list[i].toSingleString();
		}

		//set it to the list corresponding to userID
		firebase.database().ref('users/' + userId).set(update);
	}
}
