import React, { Component } from 'react';
import {Button, View, TextInput, StatusBar, Text, TouchableOpacity, StyleSheet} from 'react-native';
import firebase from 'firebase';
// import UI from './components/UI';

export default class UserLogin extends Component{  
  static defaultProps = {
    setUser: undefined,
    loggedIn: false,
  }

  componentWillMount(){
    var config = {
      apiKey: "AIzaSyBh5vN_SwkYpZ7iwX3Auu0_xKVZMmlR8AI",
      authDomain: "grocerease-6e9ee.firebaseapp.com",
      databaseURL: "https://grocerease-6e9ee.firebaseio.com",
      projectId: "grocerease-6e9ee",
      storageBucket: "grocerease-6e9ee.appspot.com",
      messagingSenderId: "719228868931"
    };
    firebase.initializeApp(config);
  }

  state = {
    email: this.props.email,
    password: this.props.password,
  }

  emailText = (text) => {
    this.setState({email: text});
	console.log("My email is:" + text);
  }

  passwordText = (text) => {
    this.setState({password: text});
	console.log("My password is:" + text);
  }

  //sign up function that grabs the email and password from the text boxes and uses
  //firebase to create an account for the user
  signUp = () => {
    console.log(this.state.email);
    console.log(this.state.password);
    const auth = firebase.auth();
    //make new account
    const anyLoginErrors = auth.createUserWithEmailAndPassword(this.state.email, this.state.password);
	anyLoginErrors.catch(e => console.log(e.message));
	this.checkIfLoggedInOrOut();
	
  }

  //log in function that grabs the email and password from the text boxes and uses
  //firebase to authenticate the user
  logIn = () => {
	console.log(this.state.email);
    console.log(this.state.password);
    
	const auth = firebase.auth();
    const anyLoginErrors = auth.signInWithEmailAndPassword(this.state.email, this.state.password);
	/*anyLoginErrors.catch( 
		function(error){
			console.log("error caught");
			var errorMessage = error.message;
			alert(errorMessage);
			console.log(error);
		}
	);*/
	
	/*const anyLoginErrors = console.log(y);
	var success = true;
	anyLoginErrors.catch(
		function(error){
			success = false;
			console.log("catch: " + success);
		}
	);
	console.log("out: " + success);*/
	
	var success = true;
	console.log("Succ0: " + success);
	anyLoginErrors.catch(		
		function(error){
			console.log("error caught");
			var errorMessage = error.message;
			alert(errorMessage);
			console.log(errorMessage);
			console.log(error);
			success = false;
			console.log("catch: " + success);
		}
	);
	console.log("Succ1: " + success);
	
	try{
		console.log(y);
	}catch(e){
		success = false;
		console.log("Succ2: " + success);
	}
	console.log("Succ3: " + success);
	
	this.checkIfLoggedInOrOut();
  }

  logOut = () => {
    const auth = firebase.auth();
    firebase.auth().signOut();

    this.checkIfLoggedInOrOut();
  }

  checkIfLoggedInOrOut = () => {
    //simple statement checking if user is logged in or not.
    //should be used to see if user login splash-screen should be put up or not
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
		console.log("pull up Ingredients Screeen");
		console.log("1" + this.state.email);
		console.log("2" + this.state.password);
    
        this.props.setUser(true);
      }else{
        console.log("not logged in");
        //pull up loging splash-screen
		console.log("pull up Logging Screeen");
        this.props.setUser(false);
      }
    });
  }

  render(){
    return(
      <View style={styles.container}>
        <StatusBar hidden/>
        {/*email text box*/}
        <TextInput
          style={styles.text}
          placeholder="email"
          onChangeText={this.emailText}
        />
        {/*password text box*/}
        <TextInput
          style={styles.text}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={this.passwordText}
        />
        {/*log in button*/}
        <TouchableOpacity
          style={styles.button}
          //when button pressed, grab email and password from text boxes
          onPress={this.logIn}
        >
          <Text>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          //when button pressed, grab email and password from text boxes
          onPress={this.signUp}
        >
          <Text>Sign Up</Text>
        </TouchableOpacity>

        {
          this.props.loggedIn == true
          ? //log out button
          <TouchableOpacity
            style={styles.button}
            onPress={this.logOut}
          >
            <Text>Log Out</Text>
          </TouchableOpacity>
          : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: 'green',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  end: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  headerText: {
    flexDirection: 'row',
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  iconContainer: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0)',
    alignItems:'flex-end',
    justifyContent:'flex-end',
    width:40,
    height:40,
    backgroundColor:'green',
    borderRadius:40,
  },
  icon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  textContainer: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 20
  }
});
