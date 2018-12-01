import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Button, StyleSheet, FlatList, TouchableOpacity, StatusBar} from 'react-native';
import Icon from '../Icon';
import IngredientInfo from './IngredientInfo';

export default class List extends Component {
  static defaultProps = {
    text: '',
    data: [],
  }

  state = {
    infoPressed: null,
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          //A FlatList renders a component in multiple rows like a list, given an array of data.
          extraData = {this.state}
          data={
            this.props.data
          }
          renderItem={this.renderListRow}
          //This optional parameter gives FlatList a component to render in-between rows
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }

  renderListRow = ({ item }) => {
    /*open or close the information button*/
    infoButtonPressed = () => {
      if(this.state.infoPressed == item){
        this.setState({infoPressed: null});
      }else{
        this.setState({infoPressed: item});
      }
    }
    /*call the prop function in App.js to increase or decrease the item quantity*/
    incrementItemQuantity = () => {
      this.props.changeItemQuantity(item.key, 1);
    }
    decrementItemQuantity = () => {
      this.props.changeItemQuantity(item.key, -1);
    }
    /*call the props function in App.js when user edits the item's name*/
    setNewName = () => {
      /*only update the name if the text inputted by the user is not null or undefined*/
      if(this.state.text != '' && typeof(this.state.text)!="undefined"){
        this.props.changeItemName(item.key, this.state.text);
        this.setState({text:''});
      }
    }
    /*call the prop function in App.js to set the item quantity if the value is not null */
    setQuantity = (text) => {
      text == ''
        ? this.props.changeItemQuantity(item.key, -item.quantity)
        : this.props.changeItemQuantity(item.key, -item.quantity + parseInt(text))
    }

    //the actual rendering
    //two different components are used, one is visible when the quantity of the ingredient is 0, the other when it's greater than 0
    if (item.quantity > 0)
      return (
        <View>
          /*When item name pressed, user can edit it*/
          <View style={styles.listRow}>  
            <TextInput style={styles.textContainer}
              placeholder={item.key}
              placeholderTextColor={'black'}
              onChangeText={(text) => this.setState({text})}
              onSubmitEditing={setNewName}
              value={item.key}
            />
            /*decrement,increment, or specifically set the item quantity*/
            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={decrementItemQuantity}
              >
                <Icon
                  name="remove"
                  color="#51A4F7"
                  size={20}
                />
              </TouchableOpacity>
              <TextInput
                underlineColorAndroid={'rgba(0,0,0,0)'}
                style={styles.textContainer}
                keyboardType={'numeric'}
                defaultValue={item.quantity.toString()}
                onChangeText={
                  setQuantity
                }
              />
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={incrementItemQuantity}
              >
                <Icon
                  name="add"
                  color="#51A4F7"
                  size={20}
                />
              </TouchableOpacity>
              /**/
              <TouchableOpacity
                style={styles.iconInfo}
                onPress={infoButtonPressed}
              >
                {
                  item.isExpired == 0
                  ?
                    <Icon
                      name='information-circle'
                      color="#51A4F7"
                      size={30}
                    />
                  : item.isExpired == 1
                  ?
                    <Icon
                      name='information-circle'
                      color='orange'
                      size={30}
                    />
                  : item.isExpired == 2
                  ?
                    <Icon
                      name='information-circle'
                      color="red"
                      size={30}
                    />
                  : null
                }
              </TouchableOpacity>
            </View>
        </View>
        /*if item information button pressed, provide all ingredient properties*/
        {
          this.state.infoPressed == item
          ? <IngredientInfo item={item}
            changeItemQuantity={this.props.changeItemQuantity}
            changeItemCalories={this.props.changeItemCalories}
            changeItemServingSize={this.props.changeItemServingSize}
            changeItemExpiration={this.props.changeItemExpiration}
            changeItemCarbs={this.props.changeItemCarbs}
            changeItemProtein={this.props.changeItemProtein}
            changeItemSugar={this.props.changeItemSugar}
            changeItemFat={this.props.changeItemFat}
            changeItemSodium={this.props.changeItemSodium}
          />
          : null
        }
        </View>
      )
    else
      return (
        /*if the quantity of the item is 0, allow for removal of the item*/
        <View style={styles.listRow}>
          <Text
            style={styles.fadedTextContainer}
            onPress={this.handleTextPress}>
            {item.key}
          </Text>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={decrementItemQuantity}
            >
              <Icon
                name="close"
                color="red"
                size={20}
              />
            </TouchableOpacity>
            <TextInput
              underlineColorAndroid={'rgba(0,0,0,0)'}
              style={styles.fadedTextContainer}
              keyboardType={'numeric'}
              defaultValue={item.quantity.toString()}
              onChangeText={
                setQuantity
              }
            />
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={incrementItemQuantity}
            >
              <Icon
                name="add"
                color="#51A4F7"
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>
      )
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE",
          marginLeft: "0%"
        }}
      />
    );
  };
}

String.prototype.toTitleCase = function () {
  return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  textInput: {
    flex: 1,
    fontSize: 20,
    padding: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
  icon: {
    marginRight: 10,
  },
  listRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 1,
    height: 50,
  },
  buttons: {
    flexDirection: "row",
    marginRight: 10,
  },
  textContainer: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 20,
    color: "black",
  },
  fadedTextContainer: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: 20,
    color: '#ccc'
  },
  iconInfo: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0)',
    alignItems:'flex-end',
    justifyContent:'flex-end',
    width:30,
    height:30,
  },
  iconContainer: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0)',
    alignItems:'center',
    justifyContent:'center',
    width:30,
    height:30,
    backgroundColor:'#fff',
    borderRadius:30,
  }
});
