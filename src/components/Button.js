import React from 'react'
import colors from '../config/Colors';
import{
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';


var styles = StyleSheet.create({
                                 button: {
                                   backgroundColor: colors.blue,
                                   color: "#fff",
                                 }
                               })



export default class B extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return <TouchableOpacity onPress={this.props.fire}>
              <View style={styles.button}>
                {this.props.message}
              </View>
           </TouchableOpacity>
  }
}

