/**
 * # deviceReducer.js
 *
 * The reducer for all the actions from the various log states
 */
'use strict'
/**
 * ## Imports
 *
 * InitialState
 */
import InitialState from './validatePersonInitialState'
//import localStorage from '../../Lib/LocalStorage'
/**
 * Device actions to test
 */
const c = require('./constants').default;

const initialState = new InitialState();

/**
 * ## deviceReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function validatePersonReducer (state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.merge(state)

  switch (action.type) {
    case c.PREPARED_ID:
          return state.set('prepareTheirID',action.prepareTheirID)
                      .set('prepareTheirIDError',action.prepareTheirIDError)
                      .set('takeFirstPic',null)
                      .set('firstPicture',null)
                      .set('confirmFirstPic',null)
                      .set('takeSecondPic',null)
                      .set('secondPicture',null)
                      .set('confirmSecondPic',null)
                      .set('readyForVideo',null)
                      .set('video',null)
                      .set('videoCompleted',null)
                      .set('confirmVideo',null);



    case c.TAKE_FIRST_PICTURE:
      return state
        .set('takeFirstPic',action.takeFirstPic)
        .set('firstPicture',action.firstPicture)
        .set('confirmFirstPic',null)
        .set('takeSecondPic',null)
        .set('secondPicture',null)
        .set('confirmSecondPic',null)
        .set('readyForVideo',null)
        .set('readyForVideoError',null)
        .set('video',null)
        .set('videoCompleted',null)
        .set('confirmVideo',null);

    case c.CONFIRM_FIRST_PICTURE:
      return state
        .set('confirmFirstPic',action.confirmFirstPic)
        .set('takeSecondPic',null)
        .set('secondPicture',null)
        .set('confirmSecondPic',null)
        .set('readyForVideo',null)
        .set('readyForVideoError',null)
        .set('video',null)
        .set('videoCompleted',null)
        .set('confirmVideo',null);

    case c.TAKE_SECOND_PICTURE:
      return state
              .set('takeSecondPic',action.takeSecondPic)
              .set('secondPicture',action.secondPicture)
              .set('confirmSecondPic',null)
              .set('readyForVideo',null)
               .set('readyForVideoError',null)
              .set('video',null)
              .set('videoCompleted',null)
              .set('confirmVideo',null);

    case c.CONFIRM_SECOND_PICTURE:
      return state
        .set('confirmSecondPic',action.confirmSecondPic)
        .set('readyForVideo',null)
        .set('readyForVideoError',null)
        .set('video',null)
        .set('videoCompleted',null)
        .set('confirmVideo',null);


    case c.READY_FOR_VIDEO:
      return state.set('readyForVideo',action.readyForVideo)
                  .set('readyForVideoError',action.readyForVideoError)
                  .set('video',null)
                  .set('videoCompleted',null)
                   .set('confirmVideo',null);


    case c.TOOK_VIDEO:
      return state.set('video',action.video)
             .set('token',action.token)
        .set('videoCompleted',action.videoCompleted)
        .set('confirmVideo',null);

    case c.CONFIRM_VIDEO:
      return state.set('confirmVideo',action.confirmVideo);



    case c.UPLOADING:
      return state.set('uploading',true)
                  .set('uploadingError',false)
                  .set('uploadingSuccess',false);

    case c.UPLOADING_SUCCESS:
      return state.set('uploading',false)
        .set('uploadingError',false)
        .set('uploadingSuccess',true);

    case c.UPLOADING_FAILURE:
      return state.set('uploading',false)
        .set('uploadingError',true)
        .set('uploadingSuccess',false);

    case c.RESET:
          return initialState;


  }

  return state
}
