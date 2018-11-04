import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
// import { lookup } from './BarcodeLookup'

export default class BarcodeScanner extends React.Component {
  state = {
    hasCameraPermission: null,
    scannedCode: null,
    codeType: null
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }

  render() {
    const { hasCameraPermission } = this.state;

    if(hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if(hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={{ flex: 1 }}>
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={StyleSheet.absoluteFill}
        />
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    this.setState({codeType: type, scannedCode: data})
    lookup(scannedCode)
  }
}
