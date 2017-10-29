'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  ScrollView,
  View,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';


import FormButton from '../components/FormButton'
import Header from '../components/Header'
import Dimensions from 'Dimensions'
var {height, width} = Dimensions.get('window') // Screen dimensions in current orientation


class TransitionPage extends Component {
  constructor(props){
    super(props)
  }
  render(){
    const {message, body,
          action, actionMessage,
          backMessage, back,
          error, errorMessage, header,
          image} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.mark}
                 source={require('../images/logo.png')}/>

          {header? <Text style={styles.headerText}>{header}</Text>:null}
        </View>
          <ScrollView width={width} height={height} horizontal={false}  >
            <View style={styles.subContainer}>
              {image?
                  <Image
                    resizeMode="cover"
                    style={styles.image}
                    source={{uri:image}}/>
              :null}
              <Text style={styles.text}>
                  {message}
              </Text>
              <Text style={styles.bodyText}>
                {body}
              </Text>
              <View style={styles.actionContainer}>


              {error?
                  <Text style={styles.error}>
                    {errorMessage}
                  </Text>:null}


              {action?
                   <FormButton
                     fill={true}
                     Disabled={this.props.uploading}
                     onPress={action}
                     buttonText={actionMessage}
                   />
                :null}
              {back?
                  <FormButton
                    Disabled={this.props.uploading}
                    onPress={back}
                    buttonText={backMessage}
                  />
                :null}
              </View>
            </View>
          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
                                   text: {
                                     fontFamily: 'BodoniSvtyTwoITCTT-Book',
                                     fontSize: 18,
                                     fontWeight: 'bold',
                                     textAlign:"center",
                                   },
                                   bodyText:{
                                     textAlign:"center",
                                   },
                                   headerText:{
                                     fontSize: 24,
                                     fontWeight: 'bold',
                                     marginBottom:30,
                                   },
                                   container:{
                                      marginTop:20
                                    },
                                   subContainer:{
                                      marginLeft:20,
                                      marginRight:20
                                    },
                                   actionContainer:{
                                     marginTop:20
                                   },
                                   mark: {
                                     height: 100,
                                     width: 100
                                   },
                                   header: {
                                     marginTop: 20,
                                     justifyContent: 'center',
                                     alignItems: 'center',
                                     backgroundColor: 'transparent'
                                   },
                                   item:{
                                      flex: 1,
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      backgroundColor: 'transparent',
                                  },
                                   image:{
                                      flex:1,
                                      alignSelf: 'center',
                                      height: 250,
                                      width: 250,
                                      borderWidth: 1,
                                    },
                                   error:{
                                     color:'red',
                                     marginBottom:10
                                   }
                                 });
export default TransitionPage;
