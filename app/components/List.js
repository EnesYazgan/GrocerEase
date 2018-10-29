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

function Node(value) {
  this.value = value;
  this.next = undefined;
  this.prev = undefined;
}

function DLinkedList() {
  var head = undefined;
  var tail = undefined;
  var length = 0;

  return {
    insert: function(item) {
      if (!item) return;

      var node = new Node(item);

      if (head) {
        node.next = head;
	head.prev = node;
      }

      head = node;
			
	if (!tail){
	  tail = node;
	}
			
      length++;
    },
    delete: function(value) {
	var curr = head; //Start from head of the list

	//Iterate through list to find the matching node
	while (curr) {
		if (curr.value === value){
			var prev = curr.prev, next = curr.next;

			//Update the pointers
			if (prev){
				prev.next = next;
			}
			else{
				head = next; //If matched node is the head
			}

			if (next){
				next.prev = prev;
			}
			else{
				tail = prev;//If matched node is the tail
			}

			length--;
			break;
		}

		curr = curr.next;
	}
    },
    search: function(value) {
      var curr = head;
      var found = undefined;

      while (curr) {
        if (curr.value === value) {
          found = curr;
          break;
        }

        curr = curr.next;
      }

      return found;
    },
    get size() {
      return length;
    },
    print: function() {
      var result = [];

      var curr = head;
      while (curr) {
        result.push(curr.value);

        curr = curr.next;
      }

      return result;
    }
  }
}

export default List;