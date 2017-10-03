import React, {Component} from 'react';
import {
  AppRegistry, Dimensions, StyleSheet, Text, TouchableHighlight,
  View, Alert, AlertIOS, Platform
} from 'react-native'

import {Icon} from 'native-base'
import {Actions} from 'react-native-router-flux'
import Camera from 'react-native-camera'
import Orientation from 'react-native-orientation'
var {height, width} = Dimensions.get('window')

import {connect} from 'react-redux';
import * as CarActions from '../../actions/carActions'
import ImageResizer from 'react-native-image-resizer'
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
    this
      .camera
      .capture({metadata: options})
      .then((baseImage) => {

         ImageResizer.createResizedImage(baseImage.path, 600, 400, 'JPEG', 70).then((image) => {
           // response.uri is the URI of the new image that can now be displayed, uploaded...
           // response.path is the path of the new image
           // response.name is the name of the new image with the extension
           // response.size is the size of the new image
         //   console.log(image.size)
           this.props.addImage(image.uri)
           Actions.carImages()
         }).catch((err) => {
            console.log(err)
            Actions.carImages()
           // Oops, something went wrong. Check that the filename is correct and
           // inspect err to get more details.
         });

      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => { this.camera = cam; }}
          flashMode={Camera.constants.FlashMode.auto}
          //orientation= {Camera.constants.Orientation.portrait}
          torchMode={Camera.constants.TorchMode.auto}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text
            style={styles.capture}
            onPress={this.takePicture.bind(this)}>
            <Icon name='ios-camera-outline'/>
          </Text>
        </Camera>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    opacity: 0.7,
    borderRadius: 45,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

const mapStateToProps = (state) => {
  return {
    carInfo: state.carInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addImage: (pathImage) => dispatch(CarActions.addCarImage(pathImage))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CameraApp)
