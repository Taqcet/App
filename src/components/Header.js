/**
 * # Header.js
 *
 * This component initially displays a image. But when clicked, things
 * get interesting.
 *
 * On the initial display after being clicked, the
 * textinput will display the current ```state``` of the application.
 *
 * The button will be enabled and if clicked, whatever state is now
 * contained in the textinput will be processed and the application
 * will be restored to that state.
 *
 * By pasting in a previous state, the application will reset to that
 * state
 *
 * When the mark image is clicked, it is just toggled to display or hide.
*/
'use strict'

/**
 * ## Imports
 *
 * React
*/
import React, {PropTypes} from 'react'
import
{
  Button,
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import {Actions} from 'react-native-router-flux'
import colors from '../config/Colors';

/**
 * Project component that will respond to onPress
 */
const FormButton = require('./FormButton')

/**
 * ## Styles
 */
var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    marginTop: 10
  },
  header: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  mark: {
    height: 200,
    width: 200
  },
  text: {
    textAlign: 'center',
    color: colors.white,
  }

})

/**
 * ### Translations
 */
var I18n = require('react-native-i18n');
import Translations from '../lib/Translations';
I18n.translations = Translations;

var Header = React.createClass({
  render () {
    return (
      <View>
        <View style={styles.header}>
          <TouchableHighlight>
            <Image style={styles.mark}
              source={require('../images/logo.png')}/>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
})

module.exports = Header
