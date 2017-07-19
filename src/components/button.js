/**
 * Created by huoban-xia on 2017/7/18.
 */
import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
export default class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    }
  }

  render() {
    return (
      <TouchableHighlight
        onHideUnderlay={() => {this.setState({ active: false })}}
        onPress={this.props.onPress}
        onShowUnderlay={() => {this.setState({ active: true })}}
        style={[styles.button, this.props.style]}
        underlayColor="#a9d9d4">
        <Text style={styles.buttonText}>{this.props.children}</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 44,
    alignSelf: 'stretch',
    justifyContent: 'center',
    overflow: 'hidden',

  },
  buttonText: {
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
  },
});