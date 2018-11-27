import React, { Component } from 'react';
import {DatePickerIOS, View, AppRegistry, Text, TextInput, Button, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
import Icon from '../Icon';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

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

    incrementCalories = () => {
      this.props.changeItemCalories(this.props.item.key, (this.props.item.calories + 1) );
    }
    decrementCalories = () => {
      this.props.changeItemCalories(this.props.item.key, (this.props.item.calories - 1) );
    }

    incrementServing = () => {
      this.props.changeItemServingSize(this.props.item.key, (this.props.item.serving + 1) );
    }
    decrementServing = () => {
      this.props.changeItemServingSize(this.props.item.key, (this.props.item.serving - 1) );
    }

    expirationAlert = (date) => {
      parsedDate = date.toString();
      dateArray = parsedDate.split(' ');

      month = "00";

      if(dateArray[1] == "Jan"){
        month = "01";
      }else if(dateArray[1] == "Feb"){
        month = "02";
      }else if(dateArray[1] == "Mar"){
        month = "03";
      }else if(dateArray[1] == "Apr"){
        month = "04";
      }else if(dateArray[1] == "May"){
        month = "05";
      }else if(dateArray[1] == "Jun"){
        month = "06";
      }else if(dateArray[1] == "Jul"){
        month = "07";
      }else if(dateArray[1] == "Aug"){
        month = "08";
      }else if(dateArray[1] == "Sep"){
        month = "09";
      }else if(dateArray[1] == "Oct"){
        month = "10";
      }else if(dateArray[1] == "Nov"){
        month = "11";
      }else if(dateArray[1] == "Dec"){
        month = "12";
      }else{}

      timeDifference = moment((dateArray[3]+month+dateArray[2]), "YYYYMMDD").fromNow();
      timeAgo = timeDifference.split(' ');

      if(timeDifference == "in a day" || timeDifference == "in 2 days" || timeDifference == "in 3 days"){
      	alert("Expiration date for " + this.props.item.key + " is nearing! Think about replacing your " + this.props.item.key + ".");
      }else if(timeAgo[2] == "ago"){
      	alert("Expiration date for " + this.props.item.key + " has passed! Think about replacing your " + this.props.item.key + ".");
      }else{}

    }

    return (
      <View style={styles.container}>
        <View style={styles.listRow}>
          <Text style={styles.textInput}>Quantity:   {this.props.item.quantity}</Text>
        </View>

        <View style={styles.listRow}>
          <Text style={styles.textInput}>Calories</Text>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={decrementCalories}
          >
            <Icon
              name="remove"
              color="black"
              size={20}
            />
          </TouchableOpacity>
          <TextInput
            underlineColorAndroid={'rgba(0,0,0,0)'}
            style={styles.numberInput}
            keyboardType={'numeric'}
            defaultValue={this.props.item.calories.toString()}
            onChangeText={
              setCalories
            }
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={incrementCalories}
          >
            <Icon
              name="add"
              color="black"
              size={20}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.listRow}>
          <Text style={styles.textInput}>Serving size: </Text>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={decrementServing}
          >
            <Icon
              name="remove"
              color="black"
              size={20}
            />
          </TouchableOpacity>
          <TextInput
            underlineColorAndroid={'rgba(0,0,0,0)'}
            style={styles.numberInput}
            keyboardType={'numeric'}
            defaultValue={this.props.item.serving.toString()}
            onChangeText={
              setServing
            }
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={incrementServing}
          >
            <Icon
              name="add"
              color="black"
              size={20}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.listRow}>
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
    marginBottom: 5,
    marginTop: 5,
  },
  iconContainer: {
    alignItems:'center',
    justifyContent:'center',
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#D0E3F5',
  },
  fadedTextContainer: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 20,
    color: 'black'
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
  listRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 1,
    height: 50,
  }
});
