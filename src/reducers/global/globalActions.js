/**
 * # globalActions.js
 *
 * Actions that are global in nature
 */
'use strict'

/**
 * ## Imports
 *
 * The actions supported
 */
const {
  SET_SESSION_TOKEN,
  SET_STORE,
  SET_STATE,
  GET_STATE,
  SET_PROCESSING_INFO,
  SET_USER_VERIFICATION
} = require('../../lib/constants').default

/**
 * ## set the sessionToken
 *
 */
export function setSessionToken (sessionToken) {
  return {
    type: SET_SESSION_TOKEN,
    payload: sessionToken
  }
}
/**
 * ## set the store
 *
 * this is the Redux store
 *
 * this is here to support Hot Loading
 *
 */
export function setStore (store) {
  return {
    type: SET_STORE,
    payload: store
  }
}

export function setUserVerification (value) {
  return {
    type: SET_USER_VERIFICATION,
    payload: value
  }
}


/**
 * ## set state
 *
 */
export function setState (newState) {
  return {
    type: SET_STATE,
    payload: newState
  }
}
/**
 * ## getState
 *
 */
export function getState (toggle) {
  return {
    type: GET_STATE,
    payload: toggle
  }
}

/**
 *
 *
 * */
export function setProcessInfo (processingInfo) {
  return {
    type: SET_PROCESSING_INFO,
    payload: processingInfo
  }
}
