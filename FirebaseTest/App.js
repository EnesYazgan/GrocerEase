/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import firebase from 'firebase';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList
} from 'react-native';



class Enter extends Component {



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

    firebase.database().ref('users/001').set(
      {
        list:'milk'
      }      
    ).then(()=>{
      console.log('INSERT!');
    }).catch((error)=>{
      console.log('ERROR !');
    })

  }

  



  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
 
  render() {
    return (
      <View style={styles.flex}>
          <View style={[styles.flexDirection, styles.inputHeight]}>
            <View style={styles.flex}>
              <TextInput
                style={styles.input}
                returnKeyType="enter"
                placeholder="add ingredients"
                onChangeText={(text) => this.setState({text})}/>
            </View>
            <View style={styles.btn}>
              <Text style={styles.enter} onPress={this.enter.bind(this)}>Enter</Text>
            </View>
          </View>
      </View>
    );
  }
 
  enter(){
    alert("add："+this.state.text);
  }
}

var REQUEST_URL =
  "https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json";

 class List_Ingradients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false
    };
    //this.fetchData = this.fetchData.bind(this);
  }


  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <FlatList
        data={this.state.data}
        renderItem={this.renderList}
        style={styles.list}
      />
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>Loading list...</Text>
      </View>
    );
  }

  renderList({ item }) {
    return (
      <View style={styles.container}>
       
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </View>
    );
  }
}
 
export default class App extends Component {
   render() {
      return (
        <View style={[styles.flex, styles.topStatus]}>
          <View style = {[styles.flex, styles.topStatus]}>
          <Enter></Enter> 
          </View>
          <View style={[styles.topList]}>
          <List_Ingradients></List_Ingradients>
          </View>
        </View>
        
      );
   }
 }

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: "center"
  },
  size: {
    textAlign: "center"
  },
  thumbnail: {
    width: 50,
    height: 81
  },
  list: {
    paddingTop: 20,
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  flex:{
    flex: 1,
  },
  flexDirection:{
    flexDirection:'row'
  },
  topStatus:{
    marginTop:50,
  },
  topList:{
    marginTop:60,
  },
  inputHeight:{
    height:45,
  },
  input:{
    height:45,
    borderWidth:1,
    marginLeft: 5,
    paddingLeft:5,
    borderColor: '#ccc',
    borderRadius: 4
  },
  btn:{
    width:55,
    marginLeft:-5,
    marginRight:5,
    backgroundColor:'#23BEFF',
    height:45,
    justifyContent:'center',
    alignItems: 'center'
  },
  enter:{
    color:'#fff',
    fontSize:15,
    fontWeight:'bold'
  },
  tip:{
    marginLeft: 5,
    marginTop: 5,
    color: '#C0C0C0',
  },
});

AppRegistry.registerComponent('HelloWorld', () => App);