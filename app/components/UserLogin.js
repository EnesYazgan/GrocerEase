import React, { Component } from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import firebase from 'firebase';

class User extends Component{

  render() {
    return (
      <TextInput style={styles.searchBar}
        ref={input => { this.textInput = input }}
        placeholder="Username:"
        // onChangeText={
        //
        // }
      />
    );
  }


  // componentWillMount(){
  //   var config = {
  //      apiKey: "AIzaSyBh5vN_SwkYpZ7iwX3Auu0_xKVZMmlR8AI",
  //      authDomain: "grocerease-6e9ee.firebaseapp.com",
  //      databaseURL: "https://grocerease-6e9ee.firebaseio.com",
  //      projectId: "grocerease-6e9ee",
  //      storageBucket: "grocerease-6e9ee.appspot.com",
  //      messagingSenderId: "719228868931"
  //     };//this copy from firebase.
  //     firebase.initializeApp(config);
  //
  //     firebase.database().ref('users/001').set(
  //      {
  //        list:'milk'
  //      }
  //     ).then(()=>{
  //      console.log('INSERT!');
  //     }).catch((error)=>{
  //      console.log('ERROR !');
  //   })
  // }

  // function userEmailSignUp(){
  //   var email = ;
  //   var password = ;
  //
  //   firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  //     // Handle Errors here.
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     // ...
  //   });
  // }





  // firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  //   // Handle Errors here.
  //   var errorCode = error.code;
  //   var errorMessage = error.message;
  //   // ...
  // });
  //
  //
  // firebase.auth().onAuthStateChanged(function(user) {
  //   if (user) {
  //     // User is signed in.
  //     var displayName = user.displayName;
  //     var email = user.email;
  //     var emailVerified = user.emailVerified;
  //     var photoURL = user.photoURL;
  //     var isAnonymous = user.isAnonymous;
  //     var uid = user.uid;
  //     var providerData = user.providerData;
  //     // ...
  //   } else {
  //     // User is signed out.
  //     // ...
  //   }
  // });

}

const styles = StyleSheet.create({
  searchBar: {
    flex: 1,
    fontSize: 20,
    padding: 10,
  }
});
