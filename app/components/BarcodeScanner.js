import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

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

  lookup() {
    url = 'https://www.upcindex.com/' + this.state.scannedCode;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
          if (request.status === 200) {
              document.body.className = 'ok';
              console.log(request.responseText);
          } else if (!isValid(this.response) && this.status == 0) {
              document.body.className = 'error offline';
              console.log("The computer appears to be offline.");
          } else {
              document.body.className = 'error';
          }
      }
    };
    request.open("GET", url, true);
    request.send(null);
  }

  handleBarCodeScanned = ({ type, data }) => {
    if (type != this.state.codeType || data != this.state.scannedCode) { //checks if barcode is the same as the one already scanned
      // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      this.setState({scannedCode: data, codeType: type})
      alert(this.lookup(this.state.scannedCode))
    }
  }
}
