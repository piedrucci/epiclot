import React, { Component } from 'react';
import { AppRegistry, Dimensions, StyleSheet, Text, TouchableHighlight,
   View, Alert, AlertIOS, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux'
import Camera from 'react-native-camera'
import Orientation from 'react-native-orientation'
var {height, width} = Dimensions.get('window')

class CameraApp extends Component {

    constructor(props) {
        super(props)
        this.state = {
            vinInfo: props.vinInfo,
            newCar: props.newCar
        }
    }

    takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => {
        //   console.log(data.path)
        let auxVinInfo = this.state.vinInfo
       
          Actions.carImages({
              photo: data.path, 
              vinInfo: auxVinInfo,
              newCar: this.state.newCar
            })
      })
      .catch(err => console.error(err));
  }

    render(){
        return (
            <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          flashMode={Camera.constants.FlashMode.on}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
        )
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
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

export default CameraApp