import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import List from './IngredientScreenComponents/List';
import ActionBar from './IngredientScreenComponents/ActionBar';
import BarcodeScanner from './IngredientScreenComponents/BarcodeScanner';
import Banner from './SharedComponents/Banner';

export default class IngredientScreen extends Component {
  static defaultProps = {
    switchScreen: undefined,
    orderList: undefined,
    changeItemQuantity: undefined,
    data: [],
    logOut: undefined,
    checkBarcode: undefined,
  }

  state = {
    cameraOn: false,
    filter: this.props.data,
    text: '',
    sortParameter: true,
  }

  changeSortParameterThenOrderList = () => {
    this.props.orderList(this.state.sortParameter)
    this.setState({ sortParameter: !this.state.sortParameter, filter: this.props.data })
  }
  
  toggleCamera = () => {
    this.setState({ cameraOn: !this.state.cameraOn });
  }
  //change the item quantity from App.js using the item inputted by the user, reset the state text.
  //order list so that the added item fits where needed
  addNewItem = () => {
    this.props.addItem(this.state.text);
    this.setState({ text: '', filter: this.props.data });
  }
  //when user searches for an ingredient, access the list of ingredients stored.
  searchData = (text) => {
    var searchResults = this.props.data.filter(item => item.key.substring(0, text.length) == text);
    this.setState({ text: text, filter: searchResults })
  }

  closeCameraAndCheckBarcode = (barcode) => {
    this.setState({ cameraOn: false });
    this.props.checkBarcode(barcode);
  }

  render() {
    return (
      <View style={styles.container}>
        <Banner
          title='My Groceries'
          icon='nutrition'
          logOut={this.props.logOut}
          switchScreen={this.props.switchScreen}
        />
        {
          this.state.cameraOn == false
            ? null
            : <BarcodeScanner
              checkBarcode={this.closeCameraAndCheckBarcode}
            />
        }
        <View style={styles.container}>
          <ActionBar
            text={this.state.text}
            toggleCamera={this.toggleCamera}
            addNewItem={this.addNewItem}
            searchData={this.searchData}
            sortList={this.changeSortParameterThenOrderList}
          />
          <List
            {...this.props}
            data={this.state.text == ''
              ? this.props.data
              : this.state.filter
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  beginning: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  end: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
