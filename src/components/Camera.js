'use strict';
import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import Camera from 'react-native-camera';
import colors from '../config/Colors';

class PhotoTaker extends Component {
  constructor(props){
    super(props);
    this.state={token: null, recording:false};
  }

  takePicture() {
    const self = this;
    this.camera.capture()
      .then((data) => {
        self.props.action(data.path);
      })
      .catch(err => console.error(err));
  }

  takeVideo(){
    const self = this;
    if(this.props.mode== 'video' && this.props.tokenize && !this.state.recording)
      this.generateRandomToken();

    this.setState({recording:true})
    this.camera.capture({totalSeconds:10})
      .then((data) => {
        console.log(data,self.state.token);
        self.props.action(data.path, self.state.token);
      })
      .catch(err => console.error(err));
  }

  generateRandomToken(){
    const token = Math.floor(Math.random() * 1000000000);
    this.setState({token: token})
    return token
  }

  render() {
    const {mode} = this.props;
    const {token, recording} = this.state;
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          //flashMode={Camera.constants.FlashMode.auto}
          captureTarget={Camera.constants.CaptureTarget.disk}
          type={mode=='video'?Camera.constants.Type.front:Camera.constants.Type.back}
          captureMode={mode=='video'? Camera.constants.CaptureMode.video: Camera.constants.CaptureMode.still}
          aspect={Camera.constants.Aspect.fill}
          >

          <View>
            <Text style={token?styles.token:styles.capture}
                  onPress={mode=='video'? this.takeVideo.bind(this):this.takePicture.bind(this)}>
              {mode=='photo'?
                'Capture'
                :
                token?
                  `Please state your full name and repeat this number below out loud ${token}`
                  :`Record`}
            </Text>
          </View>

        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
                                   container: {
                                     flex: 1,
                                     flexDirection: 'row',
                                   },
                                   preview: {
                                     flex: 1,
                                     justifyContent: 'flex-end',
                                     alignItems: 'center'
                                   },
                                   capture: {
                                     flex: 0,
                                     backgroundColor: '#fff',
                                     textAlign: 'center',
                                     borderRadius: 50,
                                     width:100,
                                     height:100,
                                     color: '#000',
                                     padding: 10,
                                     margin: 40,
                                     paddingTop:40,
                                     fontSize:14,
                                     fontWeight:"bold",
                                     borderColor:colors.lightBlue,
                                     borderWidth:2
                                   },
                                   token: {
                                     flex: 0,
                                     backgroundColor: '#fff',
                                     borderRadius: 5,
                                     color: '#000',
                                     textAlign: 'center',
                                     padding: 10,
                                     margin: 40,
                                     fontSize:20,
                                     borderColor:colors.lightBlue,
                                     borderWidth:2
                                   },
                                   recording:{
                                     backgroundColor:"red",
                                     flex: 0,
                                     borderRadius: 10,
                                     padding: 10,
                                     margin: 40,
                                     color:"white",
                                   }
                                 });


export default PhotoTaker;
