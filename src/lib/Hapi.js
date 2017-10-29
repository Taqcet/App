/**
 * # Hapi.js
 *
 * This class interfaces with Hapi.com using the rest api
 * see [http://hapijs.com/api](http://hapijs.com/api)
 *
 * Singleton module see: https://k94n.com/es6-modules-single-instance-pattern
 */
'use strict'

/**
 * ## Imports
 *
 * Config for defaults and underscore for a couple of features
 */
import CONFIG from './config'
import _ from 'underscore'
import Backend from './Backend'
//import 'whatwg-fetch'

export class Hapi extends Backend {
  /**
   * ## Hapi.js client
   *
   *
   * @throws tokenMissing if token is undefined
   */
  initialize (token) {
    if (!_.isNull(token) && _.isUndefined(token.sessionToken)) {
      throw new Error('TokenMissing')
    }
    this._sessionToken =
      _.isNull(token) ? null : token.sessionToken.sessionToken

    this.API_BASE_URL = CONFIG.backend.hapiLocal
          ? CONFIG.HAPI.local.url
          : CONFIG.HAPI.remote.url;

    this.API_BASE_WS = CONFIG.backend.hapiLocal
      ? CONFIG.HAPI.local.ws
      : CONFIG.HAPI.remote.ws;
  }
  /**
   * ### signup
   *
   * @param data object
   *
   * {username: "barton", email: "foo@gmail.com", password: "Passw0rd!"}
   *
   * @return
   * if ok, res.json={createdAt: "2015-12-30T15:17:05.379Z",
   *   objectId: "5TgExo2wBA",
   *   sessionToken: "r:dEgdUkcs2ydMV9Y9mt8HcBrDM"}
   *
   * if error, {code: xxx, error: 'message'}
   */
  async signup (data) {
    return await this._fetch({
      method: 'POST',
      url: '/users/register',
      body: data
    })
    .then((res) => {
      if (res && res.jwt) {
        return res
      } else {
        throw "User is already registered"
      }
    })
    .catch((error) => {
      throw (error)
    })
  }
  /**
   * ### login
   * encode the data and and call _fetch
   *
   * @param data
   *
   *  {username: "barton", password: "Passw0rd!"}
   *
   * @returns
   *
   * createdAt: "2015-12-30T15:29:36.611Z"
   * updatedAt: "2015-12-30T16:08:50.419Z"
   * objectId: "Z4yvP19OeL"
   * email: "barton@foo.com"
   * sessionToken: "r:Kt9wXIBWD0dNijNIq2u5rRllW"
   * username: "barton"
   *
   */
  async login (data) {
    return await this._fetch({
      method: 'POST',
      url: '/users/auth',
      body: data
    })
      .then((res) => {

        if (res.valid) {
          return res
        } else {
          throw (res)
        }
      })
      .catch((error) => {
        throw (error)
      })
  }
  /**
   * ### logout
   * prepare the request and call _fetch
   */
  async logout () {
    return await this._fetch({
      method: 'POST',
      url: '/users/logout',
      body: {}
    }).then((res) => {
        if (res.logout) {
          return {}
        } else {
          throw new Error({code: res.statusCode, error: res.message})
        }
      })
      .catch((error) => {
        throw (error)
      })
  }
  /**
   * ### resetPassword
   * the data is already in a JSON format, so call _fetch
   *
   * @param data
   * {email: "barton@foo.com"}
   *
   * @returns empty object
   *
   * if error:  {code: xxx, error: 'message'}
   */
  async resetPassword (data) {
    return await this._fetch({
      method: 'POST',
      url: '/users/resetPasswordRequest',
      body: data
    })
      .then((response) => {
        if ((response.status === 200 || response.status === 201)) {
          return {}
        } else {
          var res = JSON.parse(response._bodyInit)
          throw (res)
        }
      })
      .catch((error) => {
        throw (error)
      })
  }
  /**
   * ### getProfile
   * Using the sessionToken, we'll get everything about
   * the current user.
   *
   * @returns
   *
   * if good:
   * {createdAt: "2015-12-30T15:29:36.611Z"
   *  email: "barton@acclivyx.com"
   *  objectId: "Z4yvP19OeL"
   *  sessionToken: "r:uFeYONgIsZMPyxOWVJ6VqJGqv"
   *  updatedAt: "2015-12-30T15:29:36.611Z"
   *  username: "barton"}
   *
   * if error, {code: xxx, error: 'message'}
   */
  async getProfile () {
    return await this._fetch({
      method: 'GET',
      url: '/users/profile/me'
    })
      .then((res) => {
        if ((res.status === 200 || res.status === 201)) {
          return res.json
        } else {
          throw (res.json)
        }
      })
      .catch((error) => {
        throw (error)
      })
  }
  /**
   * ### updateProfile
   * for this user, update their record
   * the data is already in JSON format
   *
   * @param userId  _id
   * @param data object:
   * {username: "barton", email: "barton@foo.com"}
   */
  async updateProfile (userId, data) {
    return await this._fetch({
      method: 'POST',
      url: '/users/profile/' + userId,
      body: data
    })
      .then((res) => {
        if ((res.status === 200 || res.status === 201)) {
          return {}
        } else {
          throw (res.json)
        }
      })
      .catch((error) => {
        throw (error)
      })
  }
  /**
   * ### _fetch
   * A generic function that prepares the request
   *
   * @returns object:
   *  {code: response.code,
   *   status: response.status,
   *   json: response.json()
   */
  async _fetch (opts) {
    const checkStatus = (response) => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      }
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    };
    const parseJSON = (returned) => {
      return returned.json();
    };

    opts = _.extend({
      method: 'GET',
      url: null,
      body: null,
      callback: null
    }, opts);

    var reqOpts = {
      method: opts.method,
      headers: {
        credentials: "same-origin"
      }
    };

    if (this._sessionToken) {
      reqOpts.headers['Authorization'] = 'Bearer ' + this._sessionToken
    }
    if (/POST|PUT/i.test(opts.method) && opts.type !== 'form_data') {
       reqOpts.headers['Accept'] = 'application/json'
       reqOpts.headers['Content-Type'] = opts['Content-Type']? opts['Content-Type']:'application/json'
    }


    if (opts.body) {
      reqOpts.body = JSON.stringify(opts.body);
    }
    let url = this.API_BASE_URL + opts.url;


    function timeout(ms, promise) {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          reject(new Error("timeout"))
        }, ms)
        promise.then(resolve, reject)
      })
    }
    return timeout(3000, fetch(url, {...reqOpts}))
      .then(checkStatus)
      .then(parseJSON)
      .catch(err =>{
        console.log(err);
        return err
      });

    //return fetch(url, {...reqOpts})
    //      .then(checkStatus)
    //      .then(parseJSON)
    //      .catch(err=>console.log(err));
  }


  async _upload (opts) {
    const checkStatus = (response) => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      }
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    };
    const parseJSON = (response) => {
      return response.json();
    };
    let url = this.API_BASE_URL + opts.url;
    opts = _.extend({
                      method: 'Post',
                      body: opts.data || opts.body,
                    });

    return fetch(url, {...opts})
      .then(checkStatus)
      .then(parseJSON)
      .catch(err=>console.log(err));
  }


  _ws(){
    return this.API_BASE_WS;
  }


}
// The singleton variable
export let hapi = new Hapi();
