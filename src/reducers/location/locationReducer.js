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
import InitialState from './locationInitialState'
//import localStorage from '../../Lib/LocalStorage'
/**
 * Device actions to test
 */
const {
  SET_INITIAL_LOCATION,
  SET_LAST_LOCATION,
  SET_WATCH_ID
} = require('./constants').default;

const initialState = new InitialState();

/**
 * ## deviceReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function messagesReducer (state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.merge(state)

  switch (action.type) {
    case SET_INITIAL_LOCATION:
          return state.set('initialLocation',action.location);
    case SET_LAST_LOCATION:
      return state.set('lastLocation',action.location);
    case SET_WATCH_ID:
      return state.set('watchID',action.watchID);
  }

  return state
}
