import React, { Component, PureComponent } from 'react';
import { AppRegistry, Text, TextInput, View, Button, StyleSheet, FlatList, TouchableOpacity, StatusBar} from 'react-native';
import Icon from '../Icon';
import StepInfo from './StepInfo';

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
      infoButtonPressed={() => {
        // console.log("got in" + item);
        if (this.state.infoPressed == item) {
          this.setState({ infoPressed: null });
        } else {
          this.setState({ infoPressed: item });
        }
      }
      }
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
  render() {
    return (
      <View>
        {
          this.props.visible
            ? <TouchableOpacity style={{flex: 1,flexWrap: 'wrap',flexDirection: "row",margin: 10,justifyContent: "space-between",alignItems: "center"}}
            onPress={this.props.infoButtonPressed}>
              <Text
                style={styles.highlightedTextContainer}
                onPress={this.handleTextPress}>
                {this.props.item}
              </Text>
            </TouchableOpacity>
            : <TouchableOpacity style={{flex: 1,flexWrap: 'wrap',flexDirection: "row",margin: 10,justifyContent: "space-between",alignItems: "center"}}
            onPress={this.props.infoButtonPressed}>
              <Text
                style={styles.textContainer}
                onPress={this.handleTextPress}>
                {this.props.item}
              </Text>
            </TouchableOpacity>
        }
      </View>
    )
  }
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
