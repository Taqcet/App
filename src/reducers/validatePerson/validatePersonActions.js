/**
 * # deviceActions.js
 *
 * What platform are we running on, ie ```ios``` or ```android```
 *
 * What version is the app?
 *
 */
'use strict'
const BackendFactory = require('../../lib/BackendFactory').default;
import {Actions} from 'react-native-router-flux'
/**
 * ## Imports
 *
 * The actions supported
 */
var c = require('./constants').default;

/**
 * ## Set the platformState
 *
 */

export function prepareID (prepareTheirID,prepareTheirIDError) {
  return {
    type: c.PREPARED_ID,
    prepareTheirID,
    prepareTheirIDError
  }
}
export function takeFirstPicture (takeFirstPic,firstPicture) {
  return {
    type: c.TAKE_FIRST_PICTURE,
    takeFirstPic,
    firstPicture,
  }
}

export function confirmFirstPicture (confirmFirstPic) {
  return {
    type: c.CONFIRM_FIRST_PICTURE,
    confirmFirstPic,
  }
}

export function takeSecondPicture (takeSecondPic, secondPicture) {
  return {
    type: c.TAKE_SECOND_PICTURE,
    takeSecondPic,
    secondPicture,
  }
}

export function confirmSecondPicture (confirmSecondPic) {
  return {
    type: c.CONFIRM_SECOND_PICTURE,
    confirmSecondPic,
  }
}

export function readyForVideo (readyForVideo,readyForVideoError) {
  return {
    type: c.READY_FOR_VIDEO,
    readyForVideo,
    readyForVideoError
  }
}

export function tookVideo (videoCompleted,video, token) {
  return {
    type: c.TOOK_VIDEO,
    token,
    video,
    videoCompleted
  }
}



export function uploading () {
  return {
    type: c.UPLOADING,
  }
}

export function uploadingSuccess() {
  return {
    type: c.UPLOADING_SUCCESS
  }
}

export function uploadingFailure () {
  return {
    type: c.UPLOADING_FAILURE
  }
}


export function reset () {
  return {
    type: c.RESET
  }
}



//export function confirmVideo (confirmVideo) {
//  return {
//    type: c.CONFIRM_VIDEO,
//    confirmVideo,
//  }
//}

export function submit({firstPicture,secondPicture,video,token}) {
  return dispatch => {
    dispatch(uploading());

    var pic1name = firstPicture.split('/');
    pic1name = pic1name[pic1name.length-1];

    var pic2name = secondPicture.split('/');
    pic2name = pic2name[pic2name.length-1];

    var videoName = video.split('/');
    videoName = videoName[videoName.length-1];

    var data = new FormData();
    data.append('validation_picture_1', {uri: firstPicture, name: pic1name, type: 'image/jpg'});
    data.append('validation_picture_2', {uri: secondPicture, name: pic2name, type: 'image/jpg'});
    data.append('validation_video', {uri: video, name: videoName, type: 'video/mp4'});

    return BackendFactory()._upload({url:`/validation?validation_token=${token}`, body:data})
            .then(res => {
              if(res.uploaded){
                dispatch(uploadingSuccess());
              }
            })
            .catch(err=>{
              dispatch(uploadingFailure());
            })
  }
}
