import React, { Component } from 'react';
import { AppRegistry, Dimensions, StyleSheet, Text, TouchableHighlight,
   View, Alert, AlertIOS, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux'
import Camera from 'react-native-camera'
import Orientation from 'react-native-orientation'
var {height, width} = Dimensions.get('window')
// ===========================================
import { connect } from 'react-redux';
import * as appActions from '../../actions/appActions';
// ================================================

class CameraComp extends Component {
   constructor(props) {
      super(props)
      this.state = {
         title: props.title || 'Scan',
         target: props.target || 'car',
         license: [],
         isNew: props.isNew,
         sales_id: props.sales_id
      }
      this.barCodeRead = this.barCodeRead.bind(this)
   }

   componentWillMount() {
    // The getOrientation method is async. It happens sometimes that
    // you need the orientation at the moment the JS runtime starts running on device.
    // `getInitialOrientation` returns directly because its a constant set at the
    // beginning of the JS runtime.

    const initial = Orientation.getInitialOrientation();
    if (initial === 'PORTRAIT') {
      // do something
    } else {
      // do something else
    }
  }

   componentDidMount() {
      try{

         // this locks the view to Portrait Mode
         Orientation.lockToPortrait();

         // this locks the view to Landscape Mode
         // Orientation.lockToLandscape();

         // this unlocks any previous locks to all Orientations
         // Orientation.unlockAllOrientations();

         Orientation.addOrientationListener(this._orientationDidChange);




         Actions.refresh({title: this.state.title})
      }catch(err){
         alert(err)
         console.log(`AN EXCEPTION WAS DETECTED AT LOADING COMPONENT ${err}` )
      }
   }

   componentWillUnmount() {
      Orientation.getOrientation((err, orientation) => {
         console.log(`Current Device Orientation: ${orientation}`);
      });


      // Remember to remove listener
      Orientation.removeOrientationListener(this._orientationDidChange);
   }

   _orientationDidChange = (orientation) => {
      if (orientation === 'LANDSCAPE') {
         // do something with landscape layout
      } else {
         // do something with portrait layout
      }
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
            let strVIN = e.data
            if ( strVIN.length === 18 ){
               strVIN = strVIN.substr(1, strVIN.length-1)
            }
            info = { vin: strVIN }
            // console.log(info)

            // DISPARA LA ACCION AL REDUCER setLicense
            // this.props.setVinCode({setVIN:info.vin})
            this.props.setVinCode(info.vin)

            Actions.createCar()

         }else if (this.state.target === 'prospect'){
            const splitLicense = e.data.split('\n')
            // console.log(splitLicense)
            const fullLicenseInfo = splitLicense.map( (item, index) => item.replace(/_/g, ' ') )

            if ( fullLicenseInfo.length > 0 ){
               if ( typeof fullLicenseInfo[1] === 'undefined' ){
                  console.log('undefined')
               }else{
                  // set Name and LastName
                  let arrProfile = {}
                  let arrSplit = fullLicenseInfo[1].split(',')
                  arrProfile.firstName = arrSplit[1]
                  arrProfile.lastName = this.getValueFromString(
                     {strBase:arrSplit[0], strReplace: 'DAA'}
                  )
                  // =====================================================

                  // set address
                  arrProfile.address = this.getValueFromString({strBase:fullLicenseInfo[2], strReplace: 'DAG'} )

                  // // set state
                  arrProfile.state = this.getValueFromString({strBase:fullLicenseInfo[4], strReplace: 'DAJ'} )

                  // // set city
                  arrProfile.city = this.getValueFromString({strBase:fullLicenseInfo[3], strReplace: 'DAI'} )

                  // // set zip
                  arrProfile.zipCode = this.getValueFromString({strBase:fullLicenseInfo[5], strReplace: 'DAK'})

                  // // set license class
                  arrProfile.license_class = this.getValueFromString({strBase:fullLicenseInfo[7], strReplace: 'DAR'})

                  // // set DOB
                  let auxStr = this.getValueFromString({strBase:fullLicenseInfo[11], strReplace: 'DBB'})
                  let jsonDate = this.formatDate(auxStr)
                  arrProfile.dob = jsonDate.month+'-'+jsonDate.day+'-'+jsonDate.year

                  // // set ISSUED
                  auxStr = this.getValueFromString({strBase:fullLicenseInfo[13], strReplace: 'DBD'})
                  jsonDate = this.formatDate(auxStr)
                  arrProfile.license_issued = jsonDate.month+'-'+jsonDate.day+'-'+jsonDate.year

                  // // set expiration
                  auxStr = this.getValueFromString({strBase:fullLicenseInfo[10], strReplace: 'DBA'})
                  jsonDate = this.formatDate(auxStr)
                  arrProfile.license_expiration = jsonDate.month+'-'+jsonDate.day+'-'+jsonDate.year

                  info = {
                     license: fullLicenseInfo[6].replace("DAQ", ""),
                     firstname: arrProfile.firstName,
                     lastname: arrProfile.lastName,
                     address: arrProfile.address,
                     state: arrProfile.state,
                     city: arrProfile.city,
                     zipcode: arrProfile.zipCode,
                     license_class: arrProfile.license_class,
                     birthday: arrProfile.dob,
                     license_expiration: arrProfile.license_expiration,
                     license_issued: arrProfile.license_issued,
                  }

                  // DISPARA LA ACCION AL REDUCER
                  this.props.setLicense(info.license)

                  Actions.createProspect()
               }
            }
         }
      }catch(err){
         alert(err)
      }
   }

   getValueFromString = (params) => {
      let str1 = strSplit = params.strBase.replace(params.strReplace, ".")
      let arr1 = str1.split('.')
      return arr1[1]
   }

   formatDate = (fullStrDate) => {
      let year = fullStrDate.substr(0,4)
      let month = fullStrDate.substr(4,2)
      let day = fullStrDate.substr(6,2)
      return {month:month, day:day, year:year}
   }


   render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => { this.camera = cam; }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          orientation={Camera.constants.Orientation.portrait}
          torchMode={Camera.constants.TorchMode.auto}
          onBarCodeRead={this.barCodeRead}
          type={Camera.constants.Type.back}
          flashMode={Camera.constants.FlashMode.on}
          >
          {/* <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text> */}
          <Text style={styles.capture} >+</Text>

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
   //   justifyContent: 'flex-end',
     alignItems: 'center'
  },
  capture: {
     color: '#29e525',
     fontWeight: 'bold',
     fontSize: 20,

     width: width - 20,
     height: 80,

     marginTop: (height/2) - (56-40),

     borderRadius:10,
     borderWidth: 2,
     borderColor: '#29e525',

     textAlign: 'center',
     textAlignVertical: 'center'
  }
});

const mapStateToProps = (state) => {
    return {
        appGlobalParams: state.appParams,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setVinCode: (t) => dispatch(appActions.setVIN(t)),
        setLicense: (t) => dispatch(appActions.setLicense(t)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(CameraComp)
