import React, { Component } from 'react';
import { ActivityIndicator, View, TextInput, StatusBar, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class UserLogin extends Component{
  static defaultProps = {
    login: undefined,
    signUp: undefined,
  }

  state = {
    email: this.props.email,
    password: this.props.password,
  }
  //set the email that user entered
  emailText = (text) => {
    this.setState({ email: text });
  }
  //set the password that user entered
  passwordText = (text) => {
    this.setState({ password: text });
  }

  //sign up function that grabs the email and password from the text boxes and uses
  //firebase to create an account for the us
  signUpWithEmailAndPassword = () => {
    this.props.signUp(this.state.email, this.state.password);
  }

  //log in function that grabs the email and password from the text boxes and uses
  //firebase to authenticate the user
  loginWithEmailAndPassword = () => {
    this.props.login(this.state.email, this.state.password);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        {/*email text box*/}
        <Text style={styles.headerText}>GrocerEase</Text>
        <TextInput
          style={styles.emailInput}
          placeholder="email"
          autoCapitalize="none"
          onChangeText={this.emailText}
        />
        {/*password text box*/}
        <TextInput
          style={styles.passwordInput}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={this.passwordText}
        />
        {/*log in button*/}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            //when button pressed, grab email and password from text boxes
            onPress={this.loginWithEmailAndPassword}
          >
            <Text style={styles.text}>Log In </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            //when button pressed, grab email and password from text boxes
            onPress={this.signUpWithEmailAndPassword}
          >
            <Text style={styles.text}> Sign Up </Text>
          </TouchableOpacity>
        </View>
        {
          this.props.loading
          ? <ActivityIndicator style={{
            flex: 1, alignItems: 'center',
            justifyContent: 'center'
          }} size="large" color="#ccc" />
          : null
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 10,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#51A4F7',
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 0,
    width: 200,
  },
  emailInput: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 40,
    marginBottom: 5,
    backgroundColor: '#D0E3F5',
    padding: 15,
  },
  passwordInput: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: '#D0E3F5',
    padding: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  end: {
    flex: 1,
    justifyContent: 'flex-end',
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
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  }
});
