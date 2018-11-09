import firebase from 'firebase';
import React, { Component } from 'react';


function deleteMe(userId){
    firebase.database().ref('users/'+ userId).remove();
}



function updateMe(userId, list){
    const update = {
        list: list
    };
    let ref = firebase.database().ref('users/' + list).update(update)
        .then((res)=>{
            console.log("Data has been updated ");
        });
}

class DataBase extends Component{
    componentWillMount(){

<<<<<<< HEAD

=======
        
>>>>>>> origin/master


        var config = {
          apiKey: "AIzaSyBh5vN_SwkYpZ7iwX3Auu0_xKVZMmlR8AI",
          authDomain: "grocerease-6e9ee.firebaseapp.com",
          databaseURL: "https://grocerease-6e9ee.firebaseio.com",
          projectId: "grocerease-6e9ee",
          storageBucket: "grocerease-6e9ee.appspot.com",
          messagingSenderId: "719228868931"
        };
        firebase.initializeApp(config);
<<<<<<< HEAD

        firebase.database().ref('users/001').set(
          {
            list:'milk'
          }
=======
    
        firebase.database().ref('users/001').set(
          {
            list:'milk'
          }      
>>>>>>> origin/master
        ).then(()=>{
          console.log('INSERT!');
        }).catch((error)=>{
          console.log('ERROR !');
        })

<<<<<<< HEAD

=======
    
>>>>>>> origin/master
      }






<<<<<<< HEAD
}
=======
}
>>>>>>> origin/master
