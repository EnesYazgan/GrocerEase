import React, { Component, PureComponent } from 'react';
import { AppRegistry, Text, TextInput, View, Button, StyleSheet, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import Icon from '../Icon';
import StepInfo from './StepInfo';

export default class List extends Component {
  static defaultProps = {
    text: '',
    data: [],
  }

  state = {
    index: -1,
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
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 25,
          paddingTop: 10
        }}>
          <Button
            title='Previous Step'
            onPress={() => {
              let index = this.state.index - 1
              if (index < 0) index = -1
              this.setState({ index: index })
            }} />
          <Button
            title='Next Step'
            onPress={() => {
              let index = this.state.index + 1
              if (index >= this.props.data.length) index = this.props.data.length
              this.setState({ index: index })
            }} />
        </View>
      </View>
    );
  }

  renderListRow = ({ item, index }) => {
    return <ListRow
      key={item}
      item={item}
      index={index}
      infoButtonPressed={() => {
        // console.log("got in" + item);
        this.setState({ index: index });
      }
      }
      visible={this.state.index >= 0 ? (this.state.index < index ? 2 : this.state.index == index ? 1 : this.state.index > index ? 0 : -1) : -1}
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
          <TouchableOpacity style={{ flex: 1, flexWrap: 'wrap', flexDirection: "row", margin: 10, justifyContent: "space-between", alignItems: "center" }}
            onPress={this.props.infoButtonPressed}>
            <Text
              style={this.props.visible == 0
                ? styles.pastIndex
                : this.props.visible == 1
                  ? styles.currentIndex
                  : this.props.visible == 2
                    ? styles.futureIndex
                    : styles.futureIndex}>
              {this.props.index + 1}
            </Text>
            <Text
              style={this.props.visible == 0
                ? styles.fadedTextContainer
                : this.props.visible == 1
                  ? styles.highlightedTextContainer
                  : this.props.visible == 2
                    ? styles.textContainer
                    : styles.textContainer}>
              {this.props.item}
            </Text>
          </TouchableOpacity>
        }
      </View>
    )
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
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 15,
    color: '#ccc'
  },
  pastIndex: {
    color: '#ccc',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0)',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: 30,
    height: 30,
  },
  currentIndex: {
    color: '#51A4F7',
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0)',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: 30,
    height: 30,
  },
  futureIndex: {
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
