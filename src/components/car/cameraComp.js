import React, {Component} from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Alert,
  AlertIOS,
  Platform
} from 'react-native'
import {Icon} from 'native-base'
import {Actions} from 'react-native-router-flux'
import Camera from 'react-native-camera'
import Orientation from 'react-native-orientation'
var {height, width} = Dimensions.get('window')

import {connect} from 'react-redux';
import * as CarActions from '../../actions/carActions'

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
      .then((data) => {
        //   console.log(data.path)
        this.props.addImage(data.path)
        // console.log(this.props.carInfo)

        // let auxVinInfo = this.state.vinInfo
        // Actions.carImages({     photo: data.path,     vinInfo: auxVinInfo,
        // newCar: this.state.newCar   })
        Actions.carImages()
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
          this.camera = cam;
        }}
          flashMode={Camera.constants.FlashMode.auto}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text
            style={styles.capture}
            onPress={this
            .takePicture
            .bind(this)}>

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