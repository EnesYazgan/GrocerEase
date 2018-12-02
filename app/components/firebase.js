import firebase from 'firebase';
import Ingredient from '../objects/Ingredient';
import { Platform } from 'react-native';

const config = {
  apiKey: "AIzaSyBh5vN_SwkYpZ7iwX3Auu0_xKVZMmlR8AI",
  authDomain: "grocerease-6e9ee.firebaseapp.com",
  databaseURL: "https://grocerease-6e9ee.firebaseio.com",
  projectId: "grocerease-6e9ee",
  storageBucket: "grocerease-6e9ee.appspot.com",
  messagingSenderId: "719228868931"
};

firebase.initializeApp(config);

export default class DataBase{
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

	static signOut() {
		firebase.auth().signOut();
	}

	static getFirebaseRecipes(callback) {
		firebase.database().ref('/recipe').once('value')
			.then((snapshot) => {
				if (snapshot.exists()) {
					callback(snapshot.val());
				}
			})
			.catch(() => alert('You have been disconnected, changes will not be saved'))
	}

	static checkBarcode(barcode, callback) {
		length = barcode.length
		if (Platform.OS === 'ios') length = length - 1
		barcodeData = barcode.toString().substring(Platform.OS === 'ios' ? 2 : 1, barcode.length)
		firebase.database().ref('/barcode-upc' + length + '/' + barcodeData + '/').once("value", snapshot => {
			if (snapshot.exists()) {
				alert("You scanned " + snapshot.val().name);
				callback(snapshot.val().name);
			} else {
				alert('barcode does not exist in database');
			}
		})
	}

	static checkIfLoggedIn(loginCallback, logoutCallback) {
		firebase.auth().onAuthStateChanged(
			firebaseUser => {
				if (firebaseUser) {
					loginCallback(firebase.auth().currentUser.uid)
				} else {
					logoutCallback()
				}
			}
		)
	}

	static createUserWithEmailAndPassword(email, password, callback) {
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(() => {
				callback(firebase.auth().currentUser.uid)
			})
			.catch(
				(error) => {
					var errorMessage = error.message;
					alert(errorMessage);
				}
			)
	}

	static signInWithEmailAndPassword(email, password, callback) {
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(() => {
			callback(firebase.auth().currentUser.uid)
		})
		.catch(
			(error) => {
				var errorMessage = error.message;
				alert(errorMessage);
			}
		)
	}

	static createFirebaseInventoryListener(userId, receivingChange, callback, secondCallback, startLoading, stopLoading) {
		firebase.database().ref('/users/' + userId).on('value', (snapshot) => {
			startLoading()
			if (snapshot.exists()) {
				//snapshot.val() is the list we want
				list = snapshot.val()
				if (receivingChange == true) {
					//lists it properly
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

					console.log('calling back recipe list')
					callback(ingredientsList)
				} else {
					secondCallback()
				}
			} else {
				callback([])
			}
			stopLoading()
		});
	}
}
