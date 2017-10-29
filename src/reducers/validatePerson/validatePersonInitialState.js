/**
 * # deviceInitialState.js
 *
 * This class is a Immutable object
 * Working *successfully* with Redux, requires
 * state that is immutable.
 * In my opinion, that can not be by convention
 * By using Immutable, it's enforced.  Just saying....
 *
 */
'use strict'
/**
 * ## Import immutable record
 */
import {Record} from 'immutable'
var  {localStorage} = require('../../lib/LocalStorage');

/**
 * ## InitialState
 *
 * The fields we're concerned with
 */
var InitialState = Record({
  prepareTheirID: false,
  prepareTheirIDError:null,

  takeFirstPic: false,
  firstPicture:null,
  confirmFirstPic:false,

  takeSecondPic: false,
  secondPicture:null,
  confirmSecondPic:false,

  previewPictures:null,

  readyForVideo: null,
  readyForVideoError: null,
  token:null,
  video:null,
  videoCompleted: null,
  confirmVideo:false,

  uploading:false,
  uploadingError:false,
  uploadingSuccess:false
});

export default InitialState
