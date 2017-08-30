import React, { Component } from 'react';
import {
   AppRegistry,
   Dimensions,
   StyleSheet,
   Text,
   TouchableHighlight,
   View,
   Alert, AlertIOS, Platform

} from 'react-native';

import { Actions } from 'react-native-router-flux'

import Camera from 'react-native-camera'

class CameraComp extends Component {
   constructor(props) {
      super(props)
      this.state = {
         title: props.title || 'Scan',
         license: [],
      }
   }

   componentDidMount() {
      Actions.refresh({title: this.state.title})
   }

   _onBarCodeRead(e) {
      // this.setState({showCamera: false});
      // 0=pasap, 1=lic, 2=nombre, 3=apel, 5=direc, 8=fecnac, 9=expiracion, 10=expedicion

      // if (Platform.OS === 'ios') {
      //    AlertIOS.alert(
      //       "Barcode Found!",
      //       "Type: " + e.type + "\nData: " + e.data
      //    )
      // }else {
      //    Alert.alert(
      //       "Barcode Found!",
      //       "Type: " + e.type + "\nData: " + e.data
      //    )
      // }
      const splitLicense = e.data.split("|")
      const fullLicenseInfo = splitLicense.map( (item, index) => item.replace(/_/g, ' ') )

      const info = {
         driver_license: fullLicenseInfo[0],
         firstname: fullLicenseInfo[2],
         lastname: fullLicenseInfo[3],
      }

      // driver_license: (props.prospect===null)?'1234567890':(props.prospect.license),
      // sales_id: (props.prospect===null)?0:(props.prospect.sales_id),
      // dealership_id: (props.prospect===null)?'':(props.prospect.dealership_id),
      // firstname: (props.prospect===null)?'roberth':(props.prospect.firstname),
      // lastname: (props.prospect===null)?'mejias':(props.prospect.lastname),
      // address: (props.prospect===null)?'avenida':(props.prospect.address),
      // zipcode: (props.prospect===null)?'07157':(props.prospect.zipcode),
      // state:(props.prospect===null)?'PA':(props.prospect.state),
      // city:(props.prospect===null)?'Ciudad de Panama':(props.prospect.city),
      // cellphone: (props.prospect===null)?'507 60169131':(props.prospect.cellphone),
      // emailaddress: (props.prospect===null)?'roberth@beecode.co':(props.prospect.emailaddress),
      // looking_for: (props.prospect===null)?'ford explorer':(props.prospect.looking_for),
      // dob:(props.prospect===null)?'1958-03-15':(props.prospect.birthday),
      // license_state:(props.prospect===null)?'FL':(props.prospect.licensestate),
      // license_issued:(props.prospect===null)?'2015-07-20':(props.prospect.license_issued),
      // license_expiration:(props.prospect===null)?'2018-01-01':(props.prospect.license_expiration),
      // license_height:(props.prospect===null)?'5.3':(props.prospect.license_height),
      // sex:(props.prospect===null)?'Male':(props.prospect.sex),
      // user_id:(props.prospect===null)?'':(props.prospect.user),



      Actions.createProspect({prospect:info})
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
          onBarCodeRead={this._onBarCodeRead}
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
