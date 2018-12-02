import React, { Component } from 'react';
import {DatePickerIOS, View, AppRegistry, Text, TextInput, Button, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
import Icon from '../SharedComponents/Icon';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

export default class IngredientInfo extends React.Component {
  static defaultProps = {
    item: null,
  }

  //isExpired 0 = not expired, 1 = close to being expired, 2 = expired
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
    setCarbs = (text) => {
      text == ''
        ? this.props.changeItemCarbs(this.props.item.key, 0)
        : this.props.changeItemCarbs(this.props.item.key, parseInt(text))
    }
    setProtein = (text) => {
      text == ''
        ? this.props.changeItemProtein(this.props.item.key, 0)
        : this.props.changeItemProtein(this.props.item.key, parseInt(text))
    }
    setSugar = (text) => {
      text == ''
        ? this.props.changeItemSugar(this.props.item.key, 0)
        : this.props.changeItemSugar(this.props.item.key, parseInt(text))
    }
    setFat = (text) => {
      text == ''
        ? this.props.changeItemFat(this.props.item.key, 0)
        : this.props.changeItemFat(this.props.item.key, parseInt(text))
    }
    setSodium = (text) => {
      text == ''
        ? this.props.changeItemSodium(this.props.item.key, 0)
        : this.props.changeItemSodium(this.props.item.key, parseInt(text))
    }
    /*parse date entered by user and format so Moment.js recognizes it and can compare it to today's date*/
    setDate = (date, index) => {
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
      /*use Moment.js to determine if date entered is now, before, or later*/
      timeDifference = moment((dateArray[3]+month+dateArray[2]), "YYYYMMDD").fromNow();
      /*timeAgo is the keyword that says the time difference, like "ago" means the date entered has past*/
      timeAgo = timeDifference.split(' ');
      /*after data parsed, close the date picker*/
      this._hideDateTimePicker();
      /*if the date is within 3 days of today, make isExpired=1, if is past, make isExpired=2, if much later, make isExpired=0 */
      if(timeDifference == "in a day" || timeDifference == "in 2 days" || timeDifference == "in 3 days"
      || timeAgo[2] == "hours" || timeAgo[2] == "hour" || timeAgo[2] == "minutes"){
        this.props.changeItemExpiration(this.props.item.key, index, timeDifference, 1);
      }else if(timeAgo[2] == "ago"){
        this.props.changeItemExpiration(this.props.item.key, index, timeDifference, 2);
      }else{
        this.props.changeItemExpiration(this.props.item.key, index, timeDifference, 0);
      }

    }
    /*for the setter functions, make sure if decrementing that the value never goes below zero*/
    incrementCalories = () => {
      this.props.changeItemCalories(this.props.item.key, (this.props.item.calories + 1) );
    }
    decrementCalories = () => {
      if(this.props.item.calories > 0){
        this.props.changeItemCalories(this.props.item.key, (this.props.item.calories - 1) );
      }
    }
    incrementServing = () => {
      this.props.changeItemServingSize(this.props.item.key, (this.props.item.serving + 1) );
    }
    decrementServing = () => {
      if(this.props.item.serving > 0){
        this.props.changeItemServingSize(this.props.item.key, (this.props.item.serving - 1) );
      }
    }
    incrementCarbs = () => {
      this.props.changeItemCarbs(this.props.item.key, (this.props.item.carbs + 1) );
    }
    decrementCarbs = () => {
      if(this.props.item.carbs > 0){
        this.props.changeItemCarbs(this.props.item.key, (this.props.item.carbs - 1) );
      }
    }
    incrementProtein = () => {
      this.props.changeItemProtein(this.props.item.key, (this.props.item.protein + 1) );
    }
    decrementProtein = () => {
      if(this.props.item.protein > 0){
        this.props.changeItemProtein(this.props.item.key, (this.props.item.protein - 1) );
      }
    }
    incrementSugar = () => {
      this.props.changeItemSugar(this.props.item.key, (this.props.item.sugar + 1) );
    }
    decrementSugar = () => {
      if(this.props.item.serving > 0){
        this.props.changeItemSugar(this.props.item.key, (this.props.item.sugar - 1) );
      }
    }
    incrementFat = () => {
      this.props.changeItemFat(this.props.item.key, (this.props.item.fat + 1) );
    }
    decrementFat = () => {
      if(this.props.item.fat > 0){
        this.props.changeItemFat(this.props.item.key, (this.props.item.fat - 1) );
      }
    }
    incrementSodium = () => {
      this.props.changeItemSodium(this.props.item.key, (this.props.item.sodium + 1) );
    }
    decrementSodium = () => {
      if(this.props.item.sodium > 0){
        this.props.changeItemSodium(this.props.item.key, (this.props.item.sodium - 1) );
      }
    }

    bothSetDateAndExpirationAlert = (date) => {
      setDate(date);
    }

    return (
      /*list all the properties of Ingredient object, allow them to be decreased, increased, or set to specific value*/
      <View style={styles.container}>
        <View style={styles.listRow}>
          <Text style={styles.textInput}>Quantity:   {this.props.item.quantity}</Text>
        </View>
        <View style={styles.listRow}>
          <Text style={styles.textInput}>Calories:</Text>
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
            onChangeText={setCalories}
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
          <Text style={styles.textInput}>Carbs (grams): </Text>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={decrementCarbs}
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
            defaultValue={this.props.item.carbs.toString()}
            onChangeText={setCarbs}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={incrementCarbs}
          >
            <Icon
              name="add"
              color="black"
              size={20}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.listRow}>
          <Text style={styles.textInput}>Protein (grams): </Text>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={decrementProtein}
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
            defaultValue={this.props.item.protein.toString()}
            onChangeText={setProtein}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={incrementProtein}
          >
            <Icon
              name="add"
              color="black"
              size={20}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.listRow}>
          <Text style={styles.textInput}>Sugar (grams): </Text>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={decrementSugar}
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
            defaultValue={this.props.item.sugar.toString()}
            onChangeText={setSugar}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={incrementSugar}
          >
            <Icon
              name="add"
              color="black"
              size={20}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.listRow}>
          <Text style={styles.textInput}>Fat (grams): </Text>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={decrementFat}
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
            defaultValue={this.props.item.fat.toString()}
            onChangeText={setFat}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={incrementFat}
          >
            <Icon
              name="add"
              color="black"
              size={20}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.listRow}>
          <Text style={styles.textInput}>Sodium  (milligrams): </Text>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={decrementSodium}
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
            defaultValue={this.props.item.sodium.toString()}
            onChangeText={setSodium}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={incrementSodium}
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
            onChangeText={setServing}
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
          {
            /*determine which color and icon to display based on isExpired*/
            this.props.item.isExpired == 0
              ?
                <Icon
                  style={styles.icon}
                  name='happy'
                  size={30}
                  color="green"
                />
            : this.props.item.isExpired == 1
            ?
              <Icon
                style={styles.icon}
                name='sad'
                size={30}
                color="orange"
              />
            : this.props.item.isExpired == 2
            ?
              <Icon
                style={styles.icon}
                name='sad'
                size={30}
                color="red"
              />
            : null
          }

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
  icon: {
    marginLeft: 10
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
    height: 35,
  }
});
