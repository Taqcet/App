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
import InitialState from './deviceInitialState'

/**
 * Device actions to test
 */
const {
  SET_PLATFORM,
  SET_VERSION,
  SET_DEVICE_INFO
} = require('../../lib/constants').default;

const initialState = new InitialState();

/**
 * ## deviceReducer function
 * @param {Object} state - initialState
 * @param {Object} action - type and payload
 */
export default function deviceReducer (state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.merge(state)

  switch (action.type) {
    case SET_DEVICE_INFO:
          return state.set('device_brand',action.device_brand)
                      .set('device_unique_id',action.device_unique_id)
                      .set('device_model_id',action.device_id)
                      .set('device_country',action.device_country)
                      .set('device_locale',action.device_locale)
                      .set('device_emulator',action.device_emulator)
                      .set('device_finger_print_enabled',action.device_finger_print_enabled);
    /**
     * ### set the platform in the state
     *
     */
    case SET_PLATFORM: {
      const platform = action.payload
      return state.set('platform', platform)
    }

    /**
     * ### set the version in the state
     *
     */
    case SET_VERSION: {
      const version = action.payload
      return state.set('version', version)
    }
  }

  return state
}
