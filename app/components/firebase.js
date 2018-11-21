import firebase from 'firebase';
import React, { Component } from 'react';

const config = {
  apiKey: "AIzaSyBh5vN_SwkYpZ7iwX3Auu0_xKVZMmlR8AI",
  authDomain: "grocerease-6e9ee.firebaseapp.com",
  databaseURL: "https://grocerease-6e9ee.firebaseio.com",
  projectId: "grocerease-6e9ee",
  storageBucket: "grocerease-6e9ee.appspot.com",
  messagingSenderId: "719228868931"
};

export default class DataBase {
	
	constructor() {
		firebase.initializeApp(config);
	}
	
	//testing state
	state = {
		myList: []
	}
  
	database = firebase;
	
	static deleteMe(userId) {
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
		let ref = firebase.database().ref('users/' + userId).set(update);
    }
  
	//return list corresponding to user
	//NOTE: I can't get the list out of the then statement.
	//this function should return list
	static returnList = (userId) =>{
		var list;
		
		//used to retrieve firebase list for a user
		firebase.database().ref('/users/' + userId).once('value')
			.then((snapshot) => {
				//snapshot.val() is the list we want
				list = snapshot.val();
				
				//lists it properly
				console.log("User's List: " + list);
				
				//Does nothing. In fact, code below is not reached!
				this.setState({ myList: list })
				
				//lists it properly, but is not reached!
				console.log("User's List2: " + list);
			});
			
		return list; //returns undefined, because the setting of list happens out of scope
	}

}