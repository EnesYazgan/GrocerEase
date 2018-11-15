import React, { Component } from 'react';
import {View} from 'react-native';
import UI from './components/UI';
import UserLogin from './components/UserLogin';

export default class App extends Component {
  state = {
  }

  render() {
    return (
      // <View>
        <UserLogin/>
        // <UI
        //   data={[]}
        // />
      // </View>
    );
  }
}
