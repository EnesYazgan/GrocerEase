import React, { Component, PureComponent } from 'react';
import { AppRegistry, Text, TextInput, View, Button, StyleSheet, FlatList, TouchableOpacity, StatusBar} from 'react-native';
import Icon from '../Icon';
import StepInfo from './StepInfo';

export default class List extends Component {
  static defaultProps = {
    text: '',
    data: [],
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
    return <ListRow
      item={item}
      visible={this.state.infoPressed == item}
    />
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

class ListRow extends PureComponent {
  incrementItemQuantity = () => {
    this.props.changeItemQuantity(item.key, 1)
  }

  decrementItemQuantity = () => {
    this.props.changeItemQuantity(item.key, -1)
  }

  setQuantity = (text) => {
    text == ''
      ? this.props.changeItemQuantity(item.key, -item.quantity)
      : this.props.changeItemQuantity(item.key, -item.quantity + parseInt(text))
  }

  render() {
    <View style={styles.listRow}>
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
      <Text
        style={styles.textContainer}
        onPress={this.handleTextPress}>
        {item.key}
      </Text>
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
      </View>
    </View>
  }
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
    fontSize: 15,
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
    height: 100,
  },
  buttons: {
    flexDirection: "row",
    marginRight: 10,
  },
  highlightedTextContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    color: '#51A4F7',
    fontSize: 15,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 15,
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
