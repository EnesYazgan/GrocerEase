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
  
database = firebase;
	
  static deleteMe(userId) {
    firebase.database().ref('users/' + userId).remove();
  }

  static updateMe(userId, list) {
    const update = {
      list: list
    };
    let ref = firebase.database().ref('users/' + list).update(update)
      .then((res) => {
        console.log("Data has been updated ");
      });
  }
}