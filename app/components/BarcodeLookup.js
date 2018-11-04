import React, { Component } from 'react';
import { AppRegistry, Text, View } from 'react-native';

class BarcodeLookup extends Component{
	render(){
		return (
			<Text>Hello {this.props.name}!</Text>
		);
	}
}

function lookup(barcodeVal) {
  var request = require('request');
  var url = 'https://www.upcindex.com/' + barcodeVal;
  request(url, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  });
  alert('yeet')
}
