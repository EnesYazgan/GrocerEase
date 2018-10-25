//import React from 'react';
import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';


class List extends Component{
	render(){
		return(
			<Text>Hello {this.props.name}!</Text>
		);
	}
}

export default List;