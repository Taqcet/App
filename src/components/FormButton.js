/**
 * # FormButton.js
 *
 * Display a button that responds to onPress and is colored appropriately
 */
'use strict'
/**
 * ## Imports
 *
 * React
 */
import React from 'react'
import
{
  StyleSheet,
  View
} from 'react-native'
import colors from '../config/Colors';
/**
 * The platform neutral button
 */
const Button = require('apsl-react-native-button')

/**
 * ## Styles
 */
var styles = StyleSheet.create({
  signin: {
    marginLeft: 10,
    marginRight: 10,

  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: colors.lightBlue,
    borderWidth:2,
    borderRadius:2,
    minWidth:300,
    maxWidth:400,
  },

  fill: {
     backgroundColor: colors.blue,
     borderColor: colors.lightBlue,
     borderWidth:2,
     borderRadius:2,
     minWidth:300,
     maxWidth:400,
  }
})

var FormButton = React.createClass({
  /**
   * ### render
   *
   * Display the Button
   */
  render () {

    return (
      <View style={styles.signin}>
        <Button
          style={this.props.fill?styles.fill:styles.outline}
          textStyle={{fontSize: 18, color:this.props.fill?colors.white:colors.blue,
          fontFamily:"SharpSansNo1-MediumItalic"}}
          isDisabled={this.props.isDisabled}
          onPress={this.props.onPress} >
          {this.props.buttonText}
        </Button>
      </View>
    )
  }
})

module.exports = FormButton
