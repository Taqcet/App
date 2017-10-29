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
var {SET_LAST_MESSAGE_INDEX,
  SEND_MESSAGES_FAILURE,SEND_MESSAGES_SUCCESS,
  SET_MESSAGES, } = require('./constants').default;


/**
 * ## Set the platformState
 *
 */
export function setLastMessageIndex (count,date) {
  return {
    type: SET_LAST_MESSAGE_INDEX,
    count,
    date
  }
}

export function setMessages (messages) {
  return {
    type: SET_MESSAGES,
    messages
  }
}
export function sendMessagesSuccess (messages) {
  return {
    type: SEND_MESSAGES_SUCCESS,

  }
}
export function sendMessagesFailure (error) {
  return {
    type: SEND_MESSAGES_FAILURE,
    error,
  }
}
export function sendMessages (messages, device) {
  messages = messages.map(m => {
    m.date = new Date(m.date);
    return Object.assign(m, device)
  });

  return dispatch => {
    dispatch(setMessages(messages));
    return BackendFactory()
      ._fetch({method:'POST', url:'/messages',body:{message:messages}})
      .then((json) => {
        return dispatch(sendMessagesSuccess())
      })
      .catch((error) => {
        return dispatch(sendMessagesFailure(error))
      })
  }
}
