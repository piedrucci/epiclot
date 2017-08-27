import React, { Component } from 'react';
import {
   AppRegistry,
   Dimensions,
   StyleSheet,
   Text,
   TouchableHighlight,
   View
} from 'react-native';

import { Actions } from 'react-native-router-flux'

import Camera from 'react-native-camera'

class CameraComp extends Component {
   render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => console.log(data))
      .catch(err => console.error(err));
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
   }
});

export default CameraComp
