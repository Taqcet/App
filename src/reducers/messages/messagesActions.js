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
var {SET_LAST_MESSAGE_INDEX, SET_MESSAGES, } = require('./constants').default;


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
export function sendMessagesSuccess (messages) {}
export function sendMessagesFaliure (messages) {}
export function sendMessages (messages, device) {
  messages = messages.map(m => {
    m.date = new Date(m.date);
    return Object.assign(m, device)
  });

  return dispatch => {
    dispatch(setMessages(messages));
    return BackendFactory()
      ._fetch({method:'POST', url:'messages',body:{message:messages}})
      .then((json) => {
         console.log('post successful', json);
        return dispatch(sendMessagesSuccess())
      })
      .catch((error) => {
        console.log('ERROR ====>', error)
        return dispatch(sendMessagesFaliure(error))
      })
  }
}
