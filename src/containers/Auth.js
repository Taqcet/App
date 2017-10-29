/**
 * # Main.js
 *  This is the main app screen
 *
 */
'use strict'
/*
 * ## Imports
 *
 * Imports from redux
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import BackendFactory from '../lib/BackendFactory'
/**
 * The actions we need
 */
import * as authActions from '../reducers/auth/authActions'
import * as globalActions from '../reducers/global/globalActions'
import Color from '../config/Colors';

import Icon from 'react-native-vector-icons/Ionicons'
/**
 * Router
 */
import {Actions} from 'react-native-router-flux'

/**
 * The Header will display a Image and support Hot Loading
 */
import Header from '../components/Header'
import FormButton from '../components/FormButton'
/**
 * The components needed from React
 */
import React, {Component} from 'react'
import {StyleSheet,View,Text} from 'react-native'

/**
 * The platform neutral button
 */
const Button = require('apsl-react-native-button')
const t = require('tcomb-form-native');
let Form = t.form.Form;



/**
 *  Instead of including all app states via ...state
 *  One could explicitly enumerate only those which Main.js will depend on.
 *
 */
function mapStateToProps (state) {
  return {
    auth: {
      form: {
        isFetching: state.auth.form.isFetching
      }
    },
    global: {
      currentUser: state.global.currentUser,
      userVerified: state.global.userVerified,
      currentState: state.global.currentState,
      showState: state.global.showState
    }
  }
}

/*
 * Bind all the actions
 */
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...authActions, ...globalActions }, dispatch)
  }
}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },

  summary: {
    fontFamily: 'SharpSansNo1-MediumItalic',
    fontSize: 24,
    textAlign:"center",
    color:"black"
  },
  button: {
    backgroundColor: '#FF3366',
    borderColor: '#FF3366',
    marginLeft: 10,
    marginRight: 10
  },
  row:{
      flexDirection: 'row',
      alignItems:'center',
      justifyContent:'center'
  },
  inputContainer: {
    maxWidth:300,
  },
  inputWrapper:{
    alignItems:'center',
    marginTop:20
  },
  title:{
    fontFamily: 'SharpSansNo1-BoldItalic',
    fontSize:22,
    alignItems:'center',
    marginBottom:20,
    textAlign:"center"
   },
   value:{
     color:Color.blue,
     fontSize:18,
     textAlign:'center',
     fontFamily: 'SharpSansNo1-MediumItalic',
   },
   label:{
     color:"black",
     fontSize:12,
     textAlign:'center',
     fontFamily: 'SharpSansNo1-Medium',
   },
  trial:{
     fontFamily: 'SharpSansNo1-Medium',
     color:"red",
     textAlign:"center",
     marginTop:10,
     marginBottom:10
  }
})
/**
 * ### Translations
 */
var I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
I18n.translations = Translations

/**
 * ## App class
 */

const initState = {
  checking:false,
  status:'get-pending-transaction',
  transaction:null,
  ws:null,
  interval:null,
  passwordValue:null,
  authenticating:false,

  error:null,
  trials:null,
  maxTrialsReached:false,
  remainingTrials:null
}


class Auth extends Component {
  constructor(props){
    super(props);

    this.state = initState;
  }

  componentWillUnmount(){
    this._clearEverything();
  }
  componentWillMount(){
    if(this.props.global.userVerified == 0){
     this._waitForVerification();
    }
    else if(this.props.global.userVerified == 1){
      this._Auth()
    }
  }

  _toInitState(){
    this._clearEverything();
    //setTimeout(this._Auth,200)
    console.log('Every thing cleared and tim to build authentications');
    setTimeout(s => {
      this._Auth()
    },500)
  }
  _clearEverything(){
    const {interval, ws} = this.state;
    if(interval)
      clearInterval(interval);

    if(ws)
      ws.close();
    this.setState(initState);
  }
  _waitForVerification(){
    const {setUserVerification} = this.props.actions;
    var ws = new WebSocket(BackendFactory()._ws()+'/verification/watch');
    let intvl= null;
    ws.onopen = () => {
      intvl = setInterval(s => {
          ws.send('verification');
      },3000);
    };
    ws.onmessage = (e) => {
      if(e.data == 1){
        setUserVerification(1);
        this._Auth();
      }
      else{
        setUserVerification(0);
      }
      clearInterval(intvl);
      ws.close();
    };

  }
  _Auth(){
    const {status} = this.state;
    var ws = new WebSocket(BackendFactory()._ws()+'/authentication/watch');
    let intvl= null;
    ws.onopen = () => {
      console.log('do we open');
      intvl = setInterval(s => {
        switch (status){
          case 'get-pending-transaction':
               return ws.send(JSON.stringify({status:status}));
        }
      },2000);
    };

    ws.onmessage = (e) => {
      const received = JSON.parse(e.data);
      console.log(received);
      switch (received.status){
        case 'received-pending-transaction':
          clearInterval(intvl);
          return this.setState({status: received.status, transaction:received.transaction});
          break;
        case 'authenticate-transaction-error':
          return this.setState({error: true,
                                 status:'received-pending-transaction',
                                 remainingTrials: received.remainingTrials,
                                 trials:received.trials,
                                 maxTrialsReached: received.maxTrialsReached});
          break;
        case 'authenticate-transaction-success':
          return this.setState({error: false,
                                 status:'authenticate-transaction-success',
                                 remainingTrials: null,
                                 trials:null,
                                 maxTrialsReached: null});
          break;
      }
    };
    this.setState({ws:ws, interval:intvl});

    ////HARD CODE
    //setTimeout(s =>{
    //  clearInterval(intvl);
    //  return this.setState({status: 'received-pending-transaction',
    //                         transaction:{
    //                           from:'Souq Egypt',
    //                           amount:23684,
    //                           currency:'EGP',
    //                           transaction_request_date: '24/10/2017',
    //                           transaction_id:12384,
    //                         }});
    //},2000)

  }
  _onPinChange(sup){
    this.setState({passwordValue: sup});
  }
  _confirmPurchase(){
    console.log(this, this.state);
      const {passwordValue, ws, transaction}  = this.state;
      var object = {
        status: 'authenticate-transaction',
        transaction_id: transaction.transaction_id,
        pin: passwordValue.password
      };
      this.setState({authenticating:true, status:'authenticate-transaction'})
      ws.send(JSON.stringify(object));
  }




  render () {
    const {currentUser, userVerified} = this.props.global;
    const {status, transaction,authenticating, maxTrialsReached, trials, remainingTrials} = this.state;

    let options = {
      fields: {
      }
    }

    let password = {
      maxLength: 12,
      secureTextEntry: true,
      editable: true,
      //label:I18n.t('LoginForm.password')
      //hasError: this.props.form.fields.passwordHasError,
      //error: this.props.form.fields.passwordErrorMsg
    }


    let loginForm = t.struct({
                               password: t.String
                             })
    options.fields['password'] = password
    options.fields['password'].autoCapitalize = 'none'
    //options.fields['password'].placeholder = I18n.t('LoginForm.password')
    return (
      <View style={styles.container}>
        <View>
          <Header
            isFetching={this.props.auth.form.isFetching}
            showState={this.props.global.showState}
            currentState={this.props.global.currentState}
            onGetState={this.props.actions.getState}
            onSetState={this.props.actions.setState} />

          {userVerified == 0?
           <Text style={styles.summary}>
             {I18n.t('Main.notVerified')}
           </Text>
          : status == 'get-pending-transaction'?
            <Text style={styles.summary}>
              {I18n.t('Main.pendingAuth')}
            </Text>
          : status == 'received-pending-transaction'?
            <View>
              <Text style={styles.title}>{I18n.t('Auth.purchaseRequest')}</Text>
              <View style={styles.row}>
                <Text style={styles.label}>{I18n.t('Auth.from')}</Text>
                <Text style={styles.value}>{transaction.business_name}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>{I18n.t('Auth.amount')}</Text>
                <Text style={styles.value}>{transaction.transaction_amount} {transaction.currency_name} </Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>{I18n.t('Auth.date')} </Text>
                <Text style={styles.value}>{transaction.transaction_request_date} </Text>
              </View>
              {!maxTrialsReached?
               <View style={styles.inputWrapper} >
                <View style={styles.inputContainer} >
                  <Form
                    isDisabled={authenticating}
                    ref='form'
                    type={loginForm}
                    options={options}
                    value={this.state.passwordValue}
                    onChange={this._onPinChange.bind(this)}
                  />
                  <FormButton
                    isDisabled={status == 'authenticate-transaction'}
                    buttonText={I18n.t('Auth.confirm')}
                    fill={true}
                    onPress={this._confirmPurchase.bind(this)}
                  />
                </View>
              </View>
               :
                <View style={{ alignItems: 'center', padding:20}}>
                  <Icon style={{color: Color.red}} name={'md-close-circle'} size={60} />
                  <Text style={styles.title}>{I18n.t('Auth.maxTrialsReached')}</Text>
                  <FormButton
                    fill={true}
                    buttonText={I18n.t('ack')}
                    onPress={this._toInitState.bind(this)}
                  />
                </View>}

              {remainingTrials > 0 && !maxTrialsReached?
               <Text style={styles.trial}>{I18n.t('Auth.remainingTrials')} {remainingTrials}</Text>:null}
            </View>
          : status == 'authenticate-transaction'?
            <Text style={styles.title}>{I18n.t('Auth.authenticating')}</Text>
          : status == 'authenticate-transaction-success'?
            <View style={{ alignItems: 'center', padding:30}}>
              <Icon style={{color: Color.green}} name={'md-checkmark-circle'} size={60} />
              <Text style={{color: Color.green,fontSize:20, fontFamily:'SharpSansNo1-BoldItalic'}}>{I18n.t('Auth.purchaseSuccess')}</Text>
              <Text style={{textAlign:"center", fontFamily:'SharpSansNo1-Medium'}}>
                {I18n.t('Auth.purchaseSuccessMessage')}
              </Text>
              <View style={{marginTop:20}}>
                <FormButton
                  fill={true}
                  buttonText={I18n.t('ack')}
                  onPress={this._toInitState.bind(this)}
                />
              </View>
            </View>
          :null}
        </View>
      </View>
    )
  }
}

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(Auth)
