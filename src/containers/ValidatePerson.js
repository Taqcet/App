/**
 * Register.js
 *
 * Allow user to register
 */
'use strict'
/**
 * ## Imports
 *
 * Redux
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {Actions} from 'react-native-router-flux'

/**
 * The actions we need
 */
import * as validatePersonActions from '../reducers/validatePerson/validatePersonActions'
import TransitionPage from '../components/TransitionPage'
import Camera from '../components/Camera'
/**
 *   LoginRender
 */
import {View, StyleSheet} from 'react-native'

/**
 * The necessary React
 */
import React from 'react'

const {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
  } = require('../lib/constants').default;

/**
 * ## Redux boilerplate
 */

function mapStateToProps (state) {
  return {
    validatePerson: state.validatePerson.toObject(),
    global: state.global.toObject()
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(validatePersonActions, dispatch)
  }
}

var styles = StyleSheet.create({
                                 container: {
                                   flexDirection: 'column',
                                   flex: 1
                                 }})
/**
 * ### Translations
 */
var I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
I18n.translations = Translations

let Register = React.createClass({
                                   _handleInitMessage(evt){
                                     this.props.actions.prepareID(true);
                                   },
                                   _handleFirstPicture(picture){
                                     console.log(picture);
                                     this.props.actions.takeFirstPicture(true,picture);
                                   },
                                   _handleFirstPictureConfirmation(){
                                     this.props.actions.confirmFirstPicture(true);
                                   },
                                   _handleSecondPicture(picture){
                                     console.log(picture);
                                     this.props.actions.takeSecondPicture(true,picture);
                                   },
                                   _handleSecondPictureConfirmation(){
                                     this.props.actions.confirmSecondPicture(true);
                                   },
                                   _handleVideoReady(){
                                     this.props.actions.readyForVideo(true);
                                   },
                                   _handleVideoTaken(video, token){
                                     console.log(video, token);
                                     this.props.actions.tookVideo(true,video,token);
                                   },
                                   _handleConfirmVideo(video){
                                     this.props.actions.submit(this.props.validatePerson);
                                   },
                                   _toTabbar(){
                                     Actions.Tabbar();
                                     //this.props.actions.reset();

                                   },
                                   render () {
                                     const {
                                       prepareTheirID,
                                       prepareTheirIDError,

                                       takeFirstPic,
                                       firstPicture,

                                       takeSecondPic, confirmFirstPic,
                                       secondPicture,

                                       confirmSecondPic,

                                       readyForVideo,
                                       readyForVideoError,
                                       video,
                                       videoCompleted,

                                       uploading,
                                       uploadingError,
                                       uploadingSuccess,
                                       }  = this.props.validatePerson;


                                     if(uploading || uploadingSuccess)
                                       return <View style={styles.container}>
                                                {uploading?
                                                   <TransitionPage
                                                     header={I18n.t('ValidatePerson.uploadingMessage')}
                                                     body={I18n.t('ValidatePerson.uploadingBody')}
                                                   />
                                                 :uploadingSuccess?
                                                    <TransitionPage

                                                      header={I18n.t('ValidatePerson.uploadingSuccessMessage')}
                                                      body={I18n.t('ValidatePerson.uploadingSuccessBody')}
                                                      actionMessage={I18n.t('ValidatePerson.toHomePage')}
                                                      action={this._toTabbar}
                                                    />
                                                 :null}
                                              </View>;




                                     return <View style={styles.container}>
                                              {!prepareTheirID?
                                                  <TransitionPage
                                                    header={I18n.t('ValidatePerson.header')}
                                                    message={I18n.t('ValidatePerson.prepareTheirIDHeader')}
                                                    body={I18n.t('ValidatePerson.prepareTheirIDBody')}
                                                    actionMessage={I18n.t('ValidatePerson.prepareTheirIDAction')}
                                                    action={this._handleInitMessage}
                                                  />
                                                :
                                                prepareTheirID && !takeFirstPic?
                                                  <Camera
                                                   mode="photo"
                                                   message={I18n.t('ValidatePerson.takeFirstPic')}
                                                   captureMessage={I18n.t('ValidatePerson.takeFirstPic')}
                                                   action={this._handleFirstPicture}
                                                  />
                                                :
                                                prepareTheirID && takeFirstPic && !confirmFirstPic && !takeSecondPic?
                                                  <TransitionPage
                                                    header={I18n.t('ValidatePerson.header')}
                                                    image={firstPicture}
                                                    message={I18n.t('ValidatePerson.confirmTakeFirstPicHeader')}
                                                    body={I18n.t('ValidatePerson.confirmTakeFirstPicMessage')}

                                                    action={this._handleFirstPictureConfirmation}
                                                    actionMessage={I18n.t('ValidatePerson.goToNextImage')}

                                                    back={this._handleInitMessage}
                                                    backMessage={I18n.t('ValidatePerson.retakeFirstPicture')}
                                                  />
                                                :
                                                prepareTheirID && takeFirstPic && confirmFirstPic && !takeSecondPic?
                                                  <Camera
                                                    mode="photo"
                                                    message={I18n.t('ValidatePerson.takeSecondPic')}
                                                    captureMessage={I18n.t('ValidatePerson.capture')}
                                                    action={this._handleSecondPicture}
                                                  />
                                                :
                                                prepareTheirID && takeFirstPic && confirmFirstPic && takeSecondPic && !confirmSecondPic?
                                                  <TransitionPage
                                                    header={I18n.t('ValidatePerson.header')}
                                                    image={secondPicture}
                                                    message={I18n.t('ValidatePerson.confirmTakeSecondPicHeader')}
                                                    body={I18n.t('ValidatePerson.confirmTakeSecondPicMessage')}

                                                    action={this._handleSecondPictureConfirmation}
                                                    actionMessage={I18n.t('ValidatePerson.goToNextVideo')}

                                                    back={this._handleFirstPictureConfirmation}
                                                    backMessage={I18n.t('ValidatePerson.retakeSecondPicture')}
                                                  />
                                                :
                                                prepareTheirID && takeFirstPic && confirmFirstPic && takeSecondPic
                                                && confirmSecondPic && !readyForVideo?
                                                  <TransitionPage
                                                    header={I18n.t('ValidatePerson.header')}
                                                    message={I18n.t('ValidatePerson.HowVideoWorksHeader')}
                                                    body={I18n.t('ValidatePerson.confirmTakeSecondPicMessage')}

                                                    action={this._handleVideoReady}
                                                    actionMessage={I18n.t('ValidatePerson.StartVideo')}
                                                  />
                                                :
                                                prepareTheirID && takeFirstPic && confirmFirstPic && takeSecondPic
                                                && confirmSecondPic && readyForVideo && !videoCompleted?
                                                    <Camera
                                                      tokenize
                                                      mode="video"
                                                      message={I18n.t('ValidatePerson.Record')}
                                                      captureMessage={I18n.t('ValidatePerson.Record')}
                                                      action={this._handleVideoTaken}
                                                    />
                                                :
                                                    <TransitionPage
                                                      header={I18n.t('ValidatePerson.header')}
                                                      image={firstPicture.path}
                                                      message={I18n.t('ValidatePerson.ConfirmVideoHeader')}
                                                      body={I18n.t('ValidatePerson.confirmTakeSecondPicMessage')}

                                                      error={uploadingError}
                                                      errorMessage={I18n.t('ValidatePerson.uploadingError')}

                                                      action={this._handleConfirmVideo}
                                                      actionMessage={I18n.t('ValidatePerson.Submit')}
                                                      back={this._handleVideoReady}
                                                      backMessage={I18n.t('ValidatePerson.RetakeVideo')}
                                                    />
                                              }
                                            </View>



                                   }
                                 })
export default connect(mapStateToProps, mapDispatchToProps)(Register)
