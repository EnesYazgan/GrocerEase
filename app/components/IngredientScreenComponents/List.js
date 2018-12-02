import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Button, StyleSheet, FlatList, TouchableOpacity, StatusBar, ScrollView, RefreshControl } from 'react-native';
import Icon from '../Icon';
import IngredientInfo from './IngredientInfo';

export default class List extends Component {
  static defaultProps = {
    data: [],
  }

  state = {
    infoPressed: null,
    text: '',
    number: '',
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          //A FlatList renders a component in multiple rows like a list, given an array of data.
          extraData={this.state}
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
      if (this.state.infoPressed == item) {
        this.setState({ infoPressed: null });
      } else {
        this.setState({ infoPressed: item });
      }
    }
    /*call the prop function in App.js to increase or decrease the item quantity*/
    incrementItemQuantity = () => {
      this.props.changeItemQuantity(item.key, item.quantity + 1);
    }
    decrementItemQuantity = () => {
      this.props.changeItemQuantity(item.key, item.quantity - 1);
    }

    recordNumberText = (text) => {
      this.setState({ number: text })
    }

    setQuantity = () => {
      let quantity = parseInt(Number(this.state.number));
      if (quantity < 0) quantity = 0
      this.props.changeItemQuantity(item.key, quantity)
    }

    /*call the props function in App.js when user edits the item's name*/
    setName = () => {
      /*only update the name if the text inputted by the user is not null or undefined*/
      if(this.state.text != '' && typeof(this.state.text)!="undefined"){
        this.props.changeItemName(item.key, this.state.text);
        this.setState({text:''});
      }
    }

    recordNameText = (text) => {
      this.setState({text: text})
    }

    //showing the listRow constructed component. includes conditional rendering for when the quantity is equal to zero and greater than zero

    return (
      <View>
        <View style={styles.listRow}>
          <TextInput key={item.index}
            style={item.quantity > 0
              ? styles.textContainer
              : styles.fadedTextContainer}
            underlineColorAndroid={'rgba(0,0,0,0)'}
            defaultValue={item.key}
            placeholderTextColor={'black'}
            onChangeText={
              recordNameText
            }
            onSubmitEditing={
              setName
            }
          />
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={decrementItemQuantity}
            >
              {item.quantity > 0
                ?
                <Icon
                  name="remove"
                  color="#51A4F7"
                  size={20}
                />
                :
                <Icon
                  name="close"
                  color="red"
                  size={20}
                />
              }
            </TouchableOpacity>
            <TextInput
              underlineColorAndroid={'rgba(0,0,0,0)'}
              style={item.quantity > 0
                ? styles.textContainer
                : styles.fadedTextContainer}
              keyboardType={'numeric'}
              defaultValue={item.quantity.toString()}
              onChangeText={
                recordNumberText
              }
              onSubmitEditing={
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
            <TouchableOpacity
              style={styles.iconInfo}
              onPress={infoButtonPressed}
            >
              <Icon
                name='information-circle'
                color={item.isExpired == 0
                  ? "#51A4F7"
                  : item.isExpired == 1
                    ? 'orange'
                    : item.isExpired == 2
                      ? 'red'
                      : 'black'}
                size={30}
              />
            </TouchableOpacity>
          </View>
        </View>
        {
          this.state.infoPressed == item
            ? <IngredientInfo item={item}
              {...this.props}
            />
            : null
        }
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
  return this.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
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
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0)',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: 30,
    height: 30,
  },
  iconContainer: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 30,
  }
});
