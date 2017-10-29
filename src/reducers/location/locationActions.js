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
/**
 * ## Imports
 *
 * The actions supported
 */
var { SET_INITIAL_LOCATION, SET_WATCH_ID,
  SET_LAST_LOCATION, SET_LOCATION,
  SEND_LOCATION_SUCCESS, SEND_LOCATION_FAILURE} = require('./constants').default;


/**
 * ## Set the platformState
 *
 */

export function sendLocation (location, device) {
  if(device.platform == 'android'){
    location = Object.assign(location, device, location.coords);
    location['date'] = location['timestamp'];
    delete location.coords;
    delete location.timestamp;
  }

  return dispatch => {
    dispatch(setLocation(location));
    return BackendFactory()
      ._fetch({method:'POST', url:'/locations',body:{location:location}})
      .then((json) => {
        return dispatch(sendLocationSuccess())
      })
      .catch((error) => {
        return dispatch(sendLocationFailure(error))
      })
  }
}


export function setLocation (location) {
  return {
    type: SET_LOCATION,
    location,
  }
}

export function sendLocationSuccess (location) {
  return {
    type: SEND_LOCATION_SUCCESS,
    location,
  }
}

export function sendLocationFailure (error) {
  return {
    type: SEND_LOCATION_FAILURE,
    error
  }
}



export function setInitialLocation (location) {
  return {
    type: SET_INITIAL_LOCATION,
    location,
  }
}

export function setLastLocation (location) {
  return {
    type: SET_LAST_LOCATION,
    location,
  }
}
export function setWatchID (watchID) {
  return {
    type: SET_WATCH_ID,
    watchID,
  }
}

