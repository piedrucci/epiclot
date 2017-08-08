import React, { Component } from 'react';
import {
  AppRegistry, StyleSheet, Text, View, AlertIOS, Alert
} from 'react-native';

import { Actions } from 'react-native-router-flux'

import Camera from 'react-native-camera'

class CameraComp extends Component {
   constructor() {
      super()
      this.state = {
         showCamera: true,
         cameraType: Camera.constants.Type.back
      }
   }

   _onBarCodeRead(e) {
      // this.setState({showCamera: false});
      // Alert.alert(
      //    "Barcode Found!",
      //    "Type: " + e.type + "\nData: " + e.data
      // );
      Actions.createCar({vinScanned:e.data})
   }

   renderCamera() {
      if(this.state.showCamera) {
         return (
            <Camera
               ref="cam"
               style={styles.container}
               onBarCodeRead={this._onBarCodeRead}
               type={this.state.cameraType}>
            </Camera>
         );
      } else {
         return (
            <View style={styles.container}>
               <Text style={styles.welcome}>
                  React Native Camera iOS!
               </Text>
               {/* <Text style={styles.instructions}>
                  To get started, edit index.ios.js
               </Text>
               <Text style={styles.instructions}>
                  Press Cmd+R to reload,{'\n'}
                  Cmd+D or shake for dev menu
               </Text> */}
            </View>
         );
      }
   }


   render() {
      return (
         this.renderCamera()
      );
   }

}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#F5FCFF',
  // },
  container: {
     flex: 1,
     justifyContent: "center",
     alignItems: "center",
     backgroundColor: "transparent",
  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default CameraComp
