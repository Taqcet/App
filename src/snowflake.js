'use strict'
/**
 *  # snowflake
 *  Snowflake ![snowflake](https://cloud.githubusercontent.com/assets/1282364/11599365/1a1c39d2-9a8c-11e5-8819-bc1e48b30525.png)
 */

/**
 * ## imports
 *
 */
/**
 * ### React
 *
 * Necessary components from ReactNative
 */
import React from 'react'
import {
    AppRegistry,
    StyleSheet,
    View,
    Text } from 'react-native'

/**
 * ### Router-Flux
 *
 * Necessary components from Router-Flux
 */
import {Router, Scene} from 'react-native-router-flux'

/**
 * ### Redux
 *
 * ```Provider``` will tie the React-Native to the Redux store
 */
import {Provider} from 'react-redux'

/**
 * ### configureStore
 *
 *  ```configureStore``` will connect the ```reducers```, the
 *
 */
import configureStore from './lib/configureStore'


/**
 * ## DEVICE INFO
 *
 * LETS DETERMINE DEVICE INFO
 */
var DeviceInfo = require('react-native-device-info');


/**
 * ### Translations
 */
var I18n = require('react-native-i18n')

// Support fallbacks so en-US & en-BR both use en
I18n.fallbacks = true

import Translations from './lib/Translations'
I18n.translations = Translations

/**
 * ### containers
 *
 * All the top level containers
 *
 */
import App from './containers/App'
import Login from './containers/Login'
import Logout from './containers/Logout'
import Register from './containers/Register'
import ForgotPassword from './containers/ForgotPassword'
import Profile from './containers/Profile'
import Main from './containers/Main'
import Auth from './containers/Auth'
import Subview from './containers/Subview'
import ValidatePerson from './containers/ValidatePerson'

/**
 * ### icons
 *
 * Add icon support for use in Tabbar
 *
 */
import Icon from 'react-native-vector-icons/SimpleLineIcons'

/**
 * ## Actions
 *  The necessary actions for dispatching our bootstrap values
 */
import {setPlatform, setVersion, setDeviceInfo} from './reducers/device/deviceActions'
import {setStore} from './reducers/global/globalActions'

/**
 * ## States
 * Snowflake explicitly defines initial state
 *
 */
import AuthInitialState from './reducers/auth/authInitialState'
import DeviceInitialState from './reducers/device/deviceInitialState'
import GlobalInitialState from './reducers/global/globalInitialState'
import ProfileInitialState from './reducers/profile/profileInitialState'
import MessagesInitialState from './reducers/messages/messagesInitialState'
import LocationInitialState from './reducers/location/locationInitialState'
import ValidatePersonInitialState from './reducers/validatePerson/validatePersonInitialState'

/**
 *  The version of the app but not  displayed yet
 */
import pack from '../package'
var VERSION = pack.version

/**
 *
 * ## Initial state
 * Create instances for the keys of each structure in snowflake
 * @returns {Object} object with 4 keys
 */
function getInitialState () {
  return {
    auth: new AuthInitialState(),
    device: (new DeviceInitialState()).set('isMobile', true),
    global: (new GlobalInitialState()),
    profile: new ProfileInitialState(),
    messages:new MessagesInitialState(),
    location:new LocationInitialState(),
    validatePerson:new ValidatePersonInitialState(),
  };
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70
  }
});






import Colors from './config/Colors';
/**
 * ## TabIcon
 *
 * Displays the icon for the tab w/ color dependent upon selection
 */
class TabIcon extends React.Component {
  render () {
    var color = this.props.selected ? Colors.lightBlue : Colors.blue
    return (
      <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center'}}>
        <Icon style={{color: color}} name={this.props.iconName} size={20} />
        <Text style={{color: color,fontSize:14}}>{this.props.title}</Text>
      </View>
     )
  }
}

/**
 * ## Native
 *
 * ```configureStore``` with the ```initialState``` and set the
 * ```platform``` and ```version``` into the store by ```dispatch```.
 * *Note* the ```store``` itself is set into the ```store```.  This
 * will be used when doing hot loading
 */

export default function native (platform) {
  let Snowflake = React.createClass({
    render () {
      const store = configureStore(getInitialState())

            // configureStore will combine reducers from snowflake and main application
            // it will then create the store based on aggregate state from all reducers
      store.dispatch(setPlatform(platform))
      store.dispatch(setVersion(VERSION))
      store.dispatch(setStore(store));
      var device = {
        device_brand: DeviceInfo.getBrand(),
        device_unique_id: DeviceInfo.getUniqueID(),
        device_id: DeviceInfo.getDeviceId(),
        device_country: DeviceInfo.getDeviceCountry(),
        device_locale: DeviceInfo.getDeviceLocale(),
        device_emulator: DeviceInfo.isEmulator()
      };
      store.dispatch(setDeviceInfo(device))





      return (
        <Provider store={store}>
          <Router sceneStyle={{ backgroundColor: 'white' }}>
            <Scene key='root' hideNavBar>

              <Scene key='App'
                component={App}
                type='replace'
                initial />

              <Scene key='InitialLoginForm'
                component={Register}
                type='replace'/>

              <Scene key='Login'
                component={Login}
                type='replace' />

              <Scene key='Register'
                component={Register}
                type='replace' />

              <Scene key='ForgotPassword'
                component={ForgotPassword}
                type='replace' />

              <Scene key='ValidatePerson'
                     component={ValidatePerson}
                     type='replace' />

              <Scene key='Subview'
                component={Subview} />


              <Scene key='Tabbar'
                tabs
                hideNavBar
                tabBarStyle={styles.tabBar}
                default='Main'>

                <Scene key='Overview'
                       title={I18n.t('Snowflake.overview')}
                       icon={TabIcon}
                       iconName={'event'}
                       hideNavBar
                       component={Logout} />


                <Scene key='Logout'
                  title={I18n.t('Snowflake.wallet')}
                  icon={TabIcon}
                  iconName={'wallet'}
                  hideNavBar
                  component={Logout} />

                <Scene key='Main'
                  title={I18n.t('Snowflake.main')}
                  iconName={'lock'}
                  icon={TabIcon}
                  hideNavBar
                  component={Auth}
                  initial />

                <Scene key='Profile'
                  title={I18n.t('Snowflake.profile')}
                  icon={TabIcon}
                  iconName={'settings'}
                  hideNavBar
                  component={Profile} />

              </Scene>
            </Scene>
          </Router>
        </Provider>
      )
    }
  })
    /**
     * registerComponent to the AppRegistery and off we go....
     */

  AppRegistry.registerComponent('snowflake', () => Snowflake)
}
