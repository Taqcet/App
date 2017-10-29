/**
 * # app.js
 *  Display startup screen and
 *  getSessionTokenAtStartup which will navigate upon completion
 *
 *
 *
 */
'use strict';
/*
 * ## Imports
 *
 * Imports from redux
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

/**
 * Project actions
 */
import * as authActions from '../reducers/auth/authActions'
import * as deviceActions from '../reducers/device/deviceActions'
import * as globalActions from '../reducers/global/globalActions'
import * as messageActions from '../reducers/messages/messagesActions'
import * as locationActions from '../reducers/location/locationActions'
import * as validatePersonActions from '../reducers/validatePerson/validatePersonActions'
var  {localStorage} = require('../lib/LocalStorage');

/**
 * The components we need from ReactNative
 */
import React from 'react'
import
{StyleSheet, View, Text, Image,  ActivityIndicator} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
try{
  //var SmsAndroid = require('react-native-sms-android');
}
catch (err){

}
/**
 *
 * The Header will display a Image and support Hot Loading
 *
 */
import Header from '../components/Header'
const FormButton = require('../components/FormButton')
import {Actions} from 'react-native-router-flux'
/**
 *  Save that state
 */
function mapStateToProps (state) {
  return {
    deviceVersion: state.device.version,
    auth: {
      form: {
        isFetching: state.auth.form.isFetching,
        error: state.auth.form.error
      }
    },
    device: state.device.toObject(),
    global: {
      currentState: state.global.currentState,
      showState: state.global.showState,
      processingInfo: state.global.processingInfo,
      country: state.global.country,
    },
    messages:{
      messages: state.messages.messages,
    },
    location:{
      watchID: state.location.watchID
    },
    validatePerson: state.validatePerson.toObject()
  }
}

/**
 * Bind all the actions from authActions, deviceActions and globalActions
 */
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...authActions,
                                  ...deviceActions,
                                  ...globalActions,
                                  ...messageActions,
                                  ...locationActions,
                                   ...validatePersonActions
                                },
                                  dispatch)
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",

  },
  summary: {
    fontFamily: 'SharpSansNo1-BoldItalic',
    fontSize: 18,
    color:"black"
  },
  initPadder:{
    marginTop: 120,
    padding: 10
  },
  text:{
    fontFamily: 'SharpSansNo1-MediumItalic',
    fontSize: 22,
    textAlign:"center",
    color:"black"
  },
  giveMeSpace:{
    marginTop:10
  }
});
/**
 * ## App class
 */
var reactMixin = require('react-mixin');
import TimerMixin from 'react-timer-mixin'
/**
 * ### Translations
 */
var I18n = require('react-native-i18n');
import Translations from '../lib/Translations';
I18n.translations = Translations;

let App = React.createClass({
  /**
   *
   *
   *
   * See if there's a sessionToken from a previous login
   *
   *
   *
   *
   *
   */
  componentDidMount(){
    this._getLocation();
    console.log('APP MOUNTED')
    this.props.actions.getSessionToken()
  },
  _authenticate(){
    this.props.actions.setProcessInfo(false);
  },
  _register(){
    Actions.Register()
  },
  _getLocation(){
    const _this = this;
    const {actions, device} = this.props;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        actions.sendLocation(position, device);
        //_this._authenticate()
      },
      (error) => console.log('===>',JSON.stringify(error))
    );
  },
  _reload(){
    this.props.actions.getSessionToken()
  },
  render () {
    const {error, isFetching} = this.props.auth.form

    return  <View style={styles.container}>
              <LinearGradient colors={['#fff', '#f1f2f2']} style={styles.container}>
                <View style={styles.initPadder}>
                  <Header isProcessing={this.props.global.processingInfo}
                          isFetching={this.props.auth.form.isFetching}
                          showState={this.props.global.showState}
                          currentState={this.props.global.currentState}
                          onGetState={this.props.actions.getState}
                          onSetState={this.props.actions.setState}/>
                </View>
                {isFetching?
                   <Text style={styles.text}>
                    {I18n.t('wait')}
                   </Text>
                  :
                  error?
                    <View>
                      <View>
                        <Text style={styles.text}>
                          {I18n.t('internetError.message')}
                        </Text>
                      </View>
                        <View style={styles.giveMeSpace}>
                          <FormButton
                          buttonText={I18n.t('internetError.action')}
                        onPress={this._reload}/>
                      </View>
                    </View>
                  :null}
              </LinearGradient>

            </View>
  }
});
// Since we're using ES6 classes, have to define the TimerMixin
reactMixin(App.prototype, TimerMixin);
/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(App)


/*
*
* <View style={{paddingTop:40}}>
 {this.props.global.processingInfo ?
 <ActivityIndicator
 animating size='large' />
 :
 <FormButton
 onPress={this._register}
 buttonText={I18n.t('Register.register')}
 />}
 </View>
*
* */
