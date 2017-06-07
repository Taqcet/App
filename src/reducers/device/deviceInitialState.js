/**
 * # deviceInitialState.js
 *
 * This class is a Immutable object
 * Working *successfully* with Redux, requires
 * state that is immutable.
 * In my opinion, that can not be by convention
 * By using Immutable, it's enforced.  Just saying....
 *
 */
'use strict'
/**
 * ## Import immutable record
 */
import {Record} from 'immutable'

/**
 * ## InitialState
 *
 * The fields we're concerned with
 */
var InitialState = Record({
  isMobile: false,
  platform: '',
  version: null,
  device_brand: null,
  device_unique_id: null,
  device_id: null,
  device_country: null,
  device_locale: null,
  device_emulator: null,
  device_finger_print_enabled: null
})

export default InitialState
