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
var  {localStorage} = require('../lib/LocalStorage');

/**
 * The components we need from ReactNative
 */
import React from 'react'
import
{StyleSheet, View, Text, Image} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
try{
  var SmsAndroid = require('react-native-sms-android');
}
catch (err){

}
/**
 *
 * The Header will display a Image and support Hot Loading
 *
 */
import Header from '../components/Header'

/**
 *  Save that state
 */
function mapStateToProps (state) {
  return {
    deviceVersion: state.device.version,
    auth: {
      form: {
        isFetching: state.auth.form.isFetching
      }
    },
    device: state.device.toObject(),
    global: {
      currentState: state.global.currentState,
      showState: state.global.showState,
      processingInfo: state.global.processingInfo,

    },
    messages:{
      messages: state.messages.messages,
    },
    location:{
      watchID: state.location.watchID
    }
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
                                  ...locationActions}, dispatch)
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",

  },
  summary: {
    fontFamily: 'BodoniSvtyTwoITCTT-Book',
    fontSize: 18,
    fontWeight: 'bold'
  },
  initPadder:{
    marginTop: 120,
    padding: 10
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

    this.setTimeout(() => this.props.actions.setProcessInfo(false),10000);
    this.getLocation();
    this.readMessages();
  },
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.props.location.watchID);
  },
  readMessages(){
    const {messages, actions, device} = this.props;
    try{
      const handleRead = stored =>{
        var filter = {
          box: 'sent',
          indexFrom: 0,
        };
        SmsAndroid.list(JSON.stringify(filter),
                        fail => console.log("OH Snap: " + fail),
                        (count, smsList) => {
                          var arr = JSON.parse(smsList);
                          if(arr.length > 0){
                            if(stored.lastMessageCount) {
                              var diff = count - stored.lastMessageCount;
                              var lastDate = arr[arr.length -1]['date'];
                              console.log(diff,lastDate)
                              if(diff > 0 && stored.lastMessageDate > lastDate){
                                filter = {
                                  box: 'sent',
                                  indexFrom: 0,
                                  maxCount: diff
                                };
                                SmsAndroid.list(JSON.stringify(filter),
                                                fail => console.log("OH Snap: " + fail),
                                                (count2, smsList2) => {
                                                  var arr2 = JSON.parse(smsList2);
                                                  actions.sendMessages(arr2, device);
                                                  actions.setLastMessageIndex(count2, arr2[0]['date'])
                                                });
                              }
                            }
                            else{
                              actions.sendMessages(arr, device);
                              actions.setLastMessageIndex(count, arr[0]['date'])
                            }
                          }
                        });
      };

      localStorage.get()
      .then(handleRead)
      .catch(err => console.log(err));
    }
    catch (err){}
  },
  getLocation(){
    const {actions, device} = this.props;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        actions.sendLocation(position, device);
      },
      (error) => alert(JSON.stringify(error))
    );
    const x = navigator.geolocation.watchPosition((position) => {
      actions.sendLocation(position, device);
    });
  },
  render () {
    return  <View style={styles.container}>
              <LinearGradient colors={['#614385', '#516395']} style={styles.container}>
                <View style={styles.initPadder}>
                  <Header isProcessing={this.props.global.processingInfo}
                          isFetching={this.props.auth.form.isFetching}
                          showState={this.props.global.showState}
                          currentState={this.props.global.currentState}
                          onGetState={this.props.actions.getState}
                          onSetState={this.props.actions.setState} />

                </View>
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
