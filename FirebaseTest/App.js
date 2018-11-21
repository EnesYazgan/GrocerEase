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
  StatusBar,
  TouchableOpacity,
  Button
} from 'react-native';

var uid;
function updateMe(userId, list){
  const update = {
      list: list
  };
  let ref = firebase.database().ref('users/' + userId).update(update)
      .then((res)=>{
          console.log("Data has been updated ");
      });
}


function deleteMe(userId){
    firebase.database().ref('users/'+ userId).remove();
}
/*
function readMe(userId){
  firebase.database().ref('users/'+userId).on('value',snap=>{
    this.setState({
      text: snap.val()
    });
  });  
}
*/


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

    var user = firebase.auth().currentUser;
    console.log(user);
    if (user) {
      uid = user.uid;
      firebase.database().ref('users'+ uid).set(
        {
          list:'test'
        }
      )
      } else {
      uid = '001';
    }
    firebase.database().ref('users/002').set(
      {
        list:'food'
      }
    )
    firebase.database().ref('users/'+ uid).child('list').on('value',snap=>{
      this.setState({

        value: snap.val()
      });
    });  

    updateMe("001","food");
  }

  



  constructor(props) {
    super(props);
    this.state = {text: '',value: ''};
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
            <View style={styles.container}>
              <Text>{this.state.value}</Text>
            </View>
          </View>
      </View>
    );
  }
 
  enter(){
    if(this.state.text.localeCompare("d")==0){
      deleteMe(uid);

    }else if(this.state.text.localeCompare("r")==0){
      alert("read:" + this.state.text);
    }
    
    else{
    updateMe(uid,this.state.text);

        alert("add："+this.state.text);
    }
  }
}

 
export default class App extends Component {
   render() {
      return (
        <View style={[styles.flex, styles.topStatus, styles.container1]}>
          <View style = {[styles.flex, styles.topStatus]}>
          <Enter></Enter> 
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
  banner: {
    backgroundColor: 'green',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
  container1: {
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

AppRegistry.registerComponent('HelloWorld', () => App);