import React, { Component } from 'react';
import {DatePickerIOS, View, AppRegistry, Text, TextInput, Button, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
import Icon from '../Icon';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class IngredientInfo extends React.Component {

  static defaultProps = {
    item: null,
  }

  state = {
    isDateTimePickerVisible: false,
  };

  _showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  }

  _hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  }


  render() {
    setCalories = (text) => {
      text == ''
        ? this.props.changeItemCalories(this.props.item.key, 0)
        : this.props.changeItemCalories(this.props.item.key, parseInt(text))
    }
    setServing = (text) => {
      text == ''
        ? this.props.changeItemServingSize(this.props.item.key, 0)
        : this.props.changeItemServingSize(this.props.item.key, parseInt(text))
    }
    setDate = (date) => {
      parsedDate = date.toString();
      dateArray = parsedDate.split(' ');
      onlyDate = dateArray[0] + " " + dateArray[1] + " "+ dateArray[2] + ", " + dateArray[3];
      this.props.changeItemExpiration(this.props.item.key, onlyDate);
      this.setState({dateChosen: onlyDate});
      this._hideDateTimePicker();
    }

    return (
      <View style={styles.container}>
        <Text style={styles.textInput}>Quantity: {this.props.item.quantity}</Text>
        <View style={styles.itemAndField}>
          <Text style={styles.textInput}>Calories: </Text>
          <TextInput
            underlineColorAndroid={'rgba(0,0,0,0)'}
            style={styles.numberInput}
            keyboardType={'numeric'}
            defaultValue={this.props.item.calories.toString()}
            onChangeText={
              setCalories
            }
          />
        </View>
        <View style={styles.itemAndField}>
          <Text style={styles.textInput}>Serving size: </Text>
          <TextInput
            underlineColorAndroid={'rgba(0,0,0,0)'}
            style={styles.numberInput}
            keyboardType={'numeric'}
            defaultValue={this.props.item.serving.toString()}
            onChangeText={
              setServing
            }
          />
        </View>
        <View style={styles.itemAndField}>
          <Text style={styles.textInput}>Expiration date:</Text>
          <Text style={styles.calendarText}>{this.props.item.expiry}</Text>
          <TouchableOpacity onPress={this._showDateTimePicker}>
            <Icon
              name="calendar"
              size={30}
            />
          </TouchableOpacity>
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={setDate}
            onCancel={this._hideDateTimePicker}
          />
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#D0E3F5',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  beginning: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  end: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  itemAndField: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  iconContainer: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0)',
    alignItems:'center',
    justifyContent:'center',
    width:50,
    height:50,
    backgroundColor: '#51A4F7',
    paddingTop: 10,
    borderRadius:10,
  },
  fadedTextContainer: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 20,
    color: 'black'
  },
  icon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  numberInput: {
    fontSize: 15,
    padding: 3,
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  textInput: {
    fontSize: 15,
    padding: 5,
    paddingLeft: 10,
  },
  calendarText: {
    fontSize: 15,
    padding: 5,
    paddingLeft: 5,
    paddingRight: 10
  },
});
