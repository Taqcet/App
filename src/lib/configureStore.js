/**
 * # configureStore.js
 *
 * A Redux boilerplate setup
 *
 */
'use strict'

/**
 * ## Imports
 *
 * redux functions
 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'remote-redux-devtools';
/**
* ## Reducer
* The reducer contains the 4 reducers from
* device, global, auth, profile
*/
import reducer from '../reducers'

/**
 * ## creatStoreWithMiddleware
 * Like the name...
 */
//const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const composeEnhancers = composeWithDevTools({ realtime: true});
/**
 * ## configureStore
 * @param {Object} the state with for keys:
 * device, global, auth, profile
 *
 */
export default function configureStore (initialState) {
  //return createStoreWithMiddleware(reducer, initialState)
  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(
      applyMiddleware(thunk)
    )
  );
  return store;
}
