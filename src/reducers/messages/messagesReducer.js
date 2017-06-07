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
import InitialState from './messagesInitialState'
//import localStorage from '../../Lib/LocalStorage'
/**
 * Device actions to test
 */
const {
  SET_MESSAGES,
  SET_LAST_MESSAGE_INDEX
} = require('./constants').default;
var  {localStorage} = require('../../lib/LocalStorage');
const initialState = new InitialState();

/**
 * ## deviceReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function messagesReducer (state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.merge(state)

  switch (action.type) {
    case SET_MESSAGES:
          return state.set('messages',action.messages);

    case SET_LAST_MESSAGE_INDEX: {
      localStorage.save('lastMessageCount',action.count)
      .then(s =>{
        localStorage.save('lastMessageDate',action.date);
      });
      return state.set('lastMessageDate', action.date)
                  .set('lastMessageCount',action.count)
    }
  }

  return state
}
