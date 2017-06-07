'use strict'

import store from 'react-native-simple-store'
import CONFIG from './config'

export class LocalStorage {
  constructor () {
    this.SESSION_TOKEN_KEY = CONFIG.SESSION_TOKEN_KEY
  }
  save (key,value) {
    var t = {};
    t[key] = value;
    return store.save(this.SESSION_TOKEN_KEY, t)
  }
  get (key) {
    if (key) {
      return store.get(this.SESSION_TOKEN_KEY).
              then(f => {
                return f[key];
              })
    }
    else
      return store.get(this.SESSION_TOKEN_KEY)
              .then(f => {
                return f;
              })
  }
}
// The singleton variable
export let localStorage = new LocalStorage()
