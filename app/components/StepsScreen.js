import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Button, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
import Icon from './Icon';
import List from './StepsScreenComponents/List';
import ActionBar from './StepsScreenComponents/ActionBar';

export default class StepsScreen extends Component {
  state = {
    filter: this.props.data,
    text: '',
    viewAllRecipes: false,
  }

  static defaultProps = {
    orderList: undefined,
    changeItemQuantity: undefined,
    data: [],
    title: '',
  }

  changeSortParameterThenOrderList = () => {
    this.setState({ sortParameter: !this.state.sortParameter })
    this.props.orderList(this.state.sortParameter)
  }

  toggleCamera = () => {
    this.setState({ cameraOn: !this.state.cameraOn });
  }

  addNewItem = () => {
    this.props.changeItemQuantity(this.state.text, 1)
    this.setState({ text: '', filter: this.props.data })
  }

  searchData = (text) => {
    var searchResults = this.props.data.filter(item => item.substring(0, text.length) == text);
    // var searchResults = [] //make a copy of the current array
    // for (var j = 0; j < this.props.data.length; j++) {
    //   var match = true
    //   for (var l = 0; l < text.length; l++) {
    //     if (text.charAt(l).toLowerCase() != this.props.data[j].key.charAt(l).toLowerCase()) {
    //       match = false
    //       break
    //     }
    //   }
    //   if (match) searchResults.push(this.props.data[j])
    // }
    this.setState({ text: text, filter: searchResults })
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.banner}>
          <TouchableOpacity style={styles.iconContainer}
            onPress={this.props.switchScreen}>
            <Icon
              style={styles.icon}
              color='white'
              name='arrow-back'
              size={30}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Recipe Steps</Text> /*{this.props.title}*/
          <TouchableOpacity style={styles.iconContainer}
            onPress={this.props.logOut}>
            <Icon
              style={styles.icon}
              color='white'
              name='log-out'
              size={30}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <ActionBar
            text={this.state.text}
            toggleCamera={this.toggleCamera}
            addNewItem={this.addNewItem}
            searchData={this.searchData}
            sortList={this.changeSortParameterThenOrderList}
          />
          <List
            data={this.state.text == ''
              ? this.props.data
              : this.state.filter
            }
            changeItemQuantity={this.props.changeItemQuantity}
          />
        </View>
      </View>
    );
	}
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
    marginRight: 10,
  },
  banner: {
    backgroundColor: '#51A4F7',
    flexDirection: 'row',
  },
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
  headerText: {
    flexDirection: 'row',
    flex: 100,
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    justifyContent: 'center',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    /*marginRight: -60*/
  },
  footer: {
    flexDirection: 'row',
    flex: 100,
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    justifyContent: 'center',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    marginRight: -60
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
  icon: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  textInput: {
    flex: 1,
    fontSize: 20,
    padding: 10,
  },
});