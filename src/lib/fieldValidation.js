/**
 * # fieldValidation.js
 *
 * Define the validation rules for various fields such as email, username,
 * and passwords.  If the rules are not passed, the appropriate
 * message is displayed to the user
 *
 */
'use strict'

/**
 * ## Imports
 *
 * validate and underscore
 *
 */
import validate from 'validate.js'
import _ from 'underscore'
/**
 * ### Translations
 */
var I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
I18n.translations = Translations

/**
 * ## Email validation setup
 * Used for validation of emails
 */
const emailConstraints = {
  from: {
    email: true
  }
}

/**
* ## username validation rule
* read the message.. ;)
*/
const usernamePattern = /^[a-zA-Z0-9]{6,12}$/
const usernameConstraints = {
  username: {
    format: {
      pattern: usernamePattern,
      flags: 'i'
    }
  }
}









/**
* ## password validation rule
* read the message... ;)
*/
//const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/

const passwordPattern = /^(?=.*[0-9])[0-9]{6,8}$/
const passwordConstraints = {
  password: {
    format: {
      pattern: passwordPattern,
      flags: 'i'
    }
  }
}

const passwordAgainConstraints = {
  confirmPassword: {
    equality: 'password'
  }
}

/**
 * ## Field Validation
 * @param {Object} state Redux state
 * @param {Object} action type & payload
 */
export default function fieldValidation (state, action) {
  const {field, value} = action.payload;
  /**
   * ## nationalid & mobile rule uses state info validation rule
   * read the message... ;)
   *
   * It should be dynamic length based on country
   *
   * => state.props.global.country.validation.nationalidLength
   * =>state.props.global.country.validation.mobileLength
   */
  const nationalidPattern = new RegExp(`^(?=.*[0-9])[0-9]{14}$`)
  const nationalidConstraints = {
    nationalid: {
      format: {
        pattern: nationalidPattern,
        flags: 'i'
      }
    }
  }
  const mobilePattern = new RegExp(`^(?=.*[0-9])[0-9]{11}$`)
  const mobileConstraints = {
    mobile: {
      format: {
        pattern: mobilePattern,
        flags: 'i'
      }
    }
  }


  switch (field) {
    /**
     * ### username validation
     * set the form field error
     */
    case ('username'): {
      let validUsername = _.isUndefined(validate({username: value},
                                                usernameConstraints))
      if (validUsername) {
        return state.setIn(['form', 'fields', 'usernameHasError'],
                         false)
        .setIn(['form', 'fields', 'usernameErrorMsg'], '')
      } else {
        return state.setIn(['form', 'fields', 'usernameHasError'], true)
        .setIn(['form', 'fields', 'usernameErrorMsg'],
               I18n.t('FieldValidation.valid_user_name'))
      }
    }




    case ('nationalid'): {
      let validNationalid = _.isUndefined(validate({nationalid: value},
                                                 nationalidConstraints))
      if (validNationalid) {
        return state.setIn(['form', 'fields', 'nationalidHasError'],
                           false)
          .setIn(['form', 'fields', 'nationalidErrorMsg'], '')
      } else {
        return state.setIn(['form', 'fields', 'nationalidHasError'], true)
          .setIn(['form', 'fields', 'nationalidErrorMsg'],
                 I18n.t('FieldValidation.valid_nationalid'))
      }
    }



    case ('mobile'): {
      let validMobile = _.isUndefined(validate({mobile: value},
                                               mobileConstraints))
      if (validMobile) {
        return state.setIn(['form', 'fields', 'mobileHasError'],
                           false)
          .setIn(['form', 'fields', 'mobileErrorMsg'], '')
      } else {
        return state.setIn(['form', 'fields', 'mobileHasError'], true)
          .setIn(['form', 'fields', 'mobileErrorMsg'],
                 I18n.t('FieldValidation.valid_mobile'))
      }
    }
    /**
     * ### email validation
     * set the form field error
     */
    case ('email'): {
      let validEmail = _.isUndefined(validate({from: value},
                                             emailConstraints))
      if (validEmail) {
        return state.setIn(['form', 'fields', 'emailHasError'], false)
      } else {
        return state.setIn(['form', 'fields', 'emailHasError'], true)
        .setIn(['form', 'fields', 'emailErrorMsg'],
                 I18n.t('FieldValidation.valid_email'))
      }
    }

    /**
     * ### password validation
     * set the form field error
     */
    case ('password'): {
      let validPassword = _.isUndefined(validate({password: value},
                                               passwordConstraints))
      if (validPassword) {
        return state.setIn(['form', 'fields', 'passwordHasError'],
                         false)
        .setIn(['form', 'fields', 'passwordErrorMsg'],
               '')
      } else {
        return state.setIn(['form', 'fields', 'passwordHasError'], true)
        .setIn(['form', 'fields', 'passwordErrorMsg'],
          I18n.t('FieldValidation.valid_password'))
      }
    }

    /**
     * ### passwordAgain validation
     * set the form field error
     */
    case ('passwordAgain'):
      var validPasswordAgain =
          _.isUndefined(validate({password: state.form.fields.password,
                                confirmPassword: value}, passwordAgainConstraints))
      if (validPasswordAgain) {
        return state.setIn(['form', 'fields', 'passwordAgainHasError'],
                         false)
        .setIn(['form', 'fields', 'passwordAgainErrorMsg'], '')
      } else {
        return state.setIn(['form', 'fields', 'passwordAgainHasError'],
                          true)
        .setIn(['form', 'fields', 'passwordAgainErrorMsg'],
        I18n.t('FieldValidation.valid_password_again'))
      }

    /**
     * ### showPassword
     * toggle the display of the password
     */
    case ('showPassword'):
      return state.setIn(['form', 'fields',
                                'showPassword'], value)

  }
  return state
}
