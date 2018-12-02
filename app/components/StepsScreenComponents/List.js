import React, { Component, PureComponent } from 'react';
import { Text, View, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

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
          ref={view => this.scrollView = view}
          //A FlatList renders a component in multiple rows like a list, given an array of data.
          extraData={this.state}
          data={
            this.props.data
          }
          renderItem={this.renderListRow}
          //This optional parameter gives FlatList a component to render in-between rows
          ItemSeparatorComponent={this.renderSeparator}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={true}
        />
        <View style={{
          position: 'absolute',
          width: '100%',
          bottom: 0,          
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingBottom: 25,
          paddingTop: 10,
        }}
        backgroundColor='transparent'>
          <Button
            title='Previous Step'
            onPress={() => {
              let index = this.state.index - 1
              if (index < 0) {
                index = -1
              } else {
                this.scrollView.scrollToIndex({index: index, viewPosition: 0.5, animated: true})
              }
              this.setState({ index: index })
            }} />
          <Button
            title='Next Step'
            onPress={() => {
              let index = this.state.index + 1
              if (index >= this.props.data.length) {
                index = this.props.data.length
              } else {
                this.scrollView.scrollToIndex({index: index, viewPosition: 0.5, animated: true})
              }               
              this.setState({ index: index })
            }} />
        </View>
      </View>
    );
  }

  renderListRow = ({ item, index }) => {
    return <ListRow
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
          <TouchableOpacity style={styles.listRow}
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listRow: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: "row",
    margin: 10,
    justifyContent: "space-between",
    alignItems: "center"
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 15,
  },
  highlightedTextContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    color: '#51A4F7',
    fontSize: 15,
  },
  fadedTextContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 15,
    color: '#ccc',
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
});
