import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { BarCodeScanner, Permissions } from 'expo'

export default class BarcodeScanner extends React.Component {
  state = {
    hasCameraPermission: null,
  }
  //update status on if camera access permission granted
  componentDidMount() {
    this._mounted = true
    this.askForCamera()
  }
  componentWillUnmount() {
    this._mounted = false
  }

  async askForCamera() {
    if (this._mounted) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA)
      this.setState({ hasCameraPermission: status === 'granted' })
    }
  }

  render() {
    const { hasCameraPermission } = this.state
    /*action if camera permission denied or null but camera accessed*/
    if (hasCameraPermission === null) {
      return <Text style={{
        flexDirection: 'row',
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
      }}>Requesting for camera permission</Text>
    }
    if (hasCameraPermission === false) {
      return <Text style={{
        flexDirection: 'row',
        flex: 1,
        textAlign: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
      }}>No access to camera</Text>
    }
    /*If camera permission granted, activate barcode scanner*/
    return (
      <View style={{ flex: 1 }}>
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={StyleSheet.absoluteFill}
        />
      </View>
    )
  }
  /*if barcode recognized, check it against our database*/
  handleBarCodeScanned = ({ type, data }) => {
    this.props.checkBarcode(data)
    //alert(`Bar code with type ${type} and data ${data.toString()} has been scanned!`)
  }
}
