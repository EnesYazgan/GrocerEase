import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BarcodeScanner from './components/BarcodeScanner'

export default class App extends React.Component {
  // async componentWillMount() {
  //   const { status } = await Permissions.askAsync(Permissions.CAMERA);
  //   this.setState({hasCameraPermission: status === 'granted'});
  // }

  render() {
    return (
      <BarcodeScanner />
    )
  }
}
