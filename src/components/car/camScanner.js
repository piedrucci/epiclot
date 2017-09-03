import React, { Component } from 'react';
import { AppRegistry, Dimensions, StyleSheet, Text, TouchableHighlight,
   View, Alert, AlertIOS, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux'
import Camera from 'react-native-camera'

class CameraComp extends Component {
   constructor(props) {
      super(props)
      this.state = {
         title: props.title || 'Scan',
         target: props.target || 'car',
         license: [],
      }
      this.barCodeRead = this.barCodeRead.bind(this)
   }

   componentDidMount() {
      Actions.refresh({title: this.state.title})
   }

   // _onBarCodeRead(e) {
   barCodeRead(e) {
      try{
         // this.setState({showCamera: false});
         // 0=pasap, 1=lic, 2=nombre, 3=apel, 5=direc, 8=fecnac, 9=expiracion, 10=expedicion

         // if (Platform.OS === 'ios') {
         //    AlertIOS.alert(
         //       "Barcode Found!",
         //       "Type: " + e.type + "\nData: " + e.data
         //    )
         // }else {
            // Alert.alert(
            //    "Barcode Found!",
            //    "Type: " + e.type + "\nData: " + e.data
            // )
         // }

         const info = null;

         if (this.state.target === 'car'){
            info = { vin: e.data }
            Actions.createCar({car:info})
         }else if (this.state.target === 'prospect'){
            const splitLicense = e.data.split("|")
            const fullLicenseInfo = splitLicense.map( (item, index) => item.replace(/_/g, ' ') )
            info = {
               driver_license: fullLicenseInfo[0],
               firstname: fullLicenseInfo[2],
               lastname: fullLicenseInfo[3],
               address: fullLicenseInfo[5],
               dob: fullLicenseInfo[8],
               license_expiration: fullLicenseInfo[9],
               license_issued: fullLicenseInfo[10],
               license_height: fullLicenseInfo[11],
            }
            Actions.createProspect({prospect:info})
         }
      }catch(err){
         alert(err)
      }
   }


   render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
         //  onBarCodeRead={this._onBarCodeRead}
          onBarCodeRead={this.barCodeRead}
          type={Camera.constants.Type.back}
          >
          {/* <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text> */}
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
