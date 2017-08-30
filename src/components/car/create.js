import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, Text, View, Alert, AsyncStorage } from 'react-native';

import { Container, Header, Content, Icon, Left, Right, Button,
    Body, Title, Footer, FooterTab, List, ListItem, Thumbnail,
    Item, Input, Form, Label, Spinner, InputGroup, Picker } from 'native-base';

import { Actions } from 'react-native-router-flux';

import styles from './carStyles';
import api from '../../utilities/api';

import VinDetail from './vinDetails';

import Camera from 'react-native-camera';

// ===========================================
import { connect } from 'react-redux';
import * as carActions from '../../actions/carActions';
// ================================================

class CreateCar extends Component {

   constructor(props) {
      super(props)
      this.state = {
         session: {},
         // vin: 'NM0LS7EX9G1276250',
         // vin: '1M1AW07Y1GM051234',
         vin: '5XXGM4A70FG352220',
         checkingVIN: false,
         validVin: false,
         disableCheckButton: false,
         captionCheckButton: 'Check VIN ',
         msgResponse: '',
         vinInfo: {},

      }

      this.checkVINCode = this.checkVINCode.bind(this)
      this.switchButtonStatus = this.switchButtonStatus.bind(this)
      this.nextStep = this.nextStep.bind(this)
      this.getCarInfo = this.getCarInfo.bind(this)
   }

// OBTENER LOS DATOS DE LA SESSION ACTUAL
    componentDidMount() {
      // console.log(this.props);
      this.setSessionData()

      if ( this.props.vinScanned ){
         this.setState({vin: this.props.vinScanned})
      }

      Actions.refresh({title: 'Add Car'})
   }

   componentWillUnmount () {
      this._listeners && this._listeners.forEach(listener => listener.remove());
   }

   async setSessionData() {
      const session = await AsyncStorage.getItem(api.getSessionName())
      this.setState({session: JSON.parse(session)})
   }

// ACTIVA - DESACTIVA EL BOTON DE CHECK VIN
    switchButtonStatus(text) {
      const len = text.length
      this.setState( {vin:text} )
      this.setState( { disableCheckButton: ( len < 17)} )
   }


// CUEQUEA EL VIN INGRESADO EN EL TEXTBOX
    async checkVINCode() {

      this.setState({
         disableCheckButton:true,
         checkingVIN:true,
         validVin:false,
         captionCheckButton: 'Checking VIN ',
         msgResponse: ''
      })

      try{
         const response = await api.checkVIN(this.state.vin, this.state.session.dealership_id)
         const json = await response.json()

         let vinDetails = json
         delete vinDetails.details;
         delete vinDetails.msg;

         this.setState({
            disableCheckButton:false,
            checkingVIN:false,
            vinInfo:vinDetails,
            validVin: (json.valid_vin) ? true : false,
            captionCheckButton: 'Check VIN ',
            msgResponse: json.msg,
         })
         if (json.valid_vin){
            // const buttonNextCarImages = ()=><Icon name='ios-arrow-dropright' onPress={ () => this.nextStep() } />
            Actions.refresh({ rightTitle: 'Next', onRight:()=>this.nextStep() })
         }
      }catch(err) {
         console.log(err)
         this.setState({
            disableCheckButton:false,
            checkingVIN:false,
            vinInfo:null,
            validVin: false,
            captionCheckButton: 'Check VIN ',
            msgResponse: '',
         })
      }

   }

   // ENVIAR DATOS Y AVANZAR
   nextStep() {
      Actions.carImages({vinInfo: this.state.vinInfo})
   }

   getCarInfo() {
      // alert(this.props.getCarInfo());
      console.log(this.props.getCarInfo())
   }

   // _onBarCodeRead(e) {
   //    // this.setState({showCamera: false});
   //    Alert.alert(
   //       "Barcode Found!",
   //       "Type: " + e.type + "\nData: " + e.data
   //    );
   // }


   // ===================== scanner
   // _onBarCodeRead = (e) => {
   //      console.log(`e.nativeEvent.data.type = ${e.nativeEvent.data.type}, e.nativeEvent.data.code = ${e.nativeEvent.data.code}`)
   //      this._stopScan()
   //      Alert.alert(e.nativeEvent.data.type, e.nativeEvent.data.code, [
   //          {text: 'OK', onPress: () => this._startScan()},
   //      ])
   //  }

    _startScan = (e) => {
        this._barCode.startScan()
    }

    _stopScan = (e) => {
        this._barCode.stopScan()
    }

    render() {
        return(
           <Content style={{marginTop:60}}>
             <Form >

                  <Item >
                     {/* <Label>Username</Label> */}
                     <Icon name='ios-barcode-outline' />
                     <Input
                        maxLength = {20}
                        keyboardType='default'
                        //   style={{width:250}}
                        returnKeyType='next'
                        placeholder='Enter VIN Code'
                        autoCapitalize='characters'
                        onChangeText={ (text) => this.switchButtonStatus(text) }
                        // onSubmitEditing = { () => this.emailInput.focus() }
                        value={this.state.vin}
                     />
                     <Button
                        disabled={this.state.disableCheckButton}
                        onPress = { () => Actions.cameraScanner({title:'Scan Vin'}) }
                        ><Icon name='ios-camera-outline' />
                     </Button>

                  </Item>

               </Form>

               <Button
                  disabled={this.state.disableCheckButton}
                  style={{alignSelf: 'center', width:250,justifyContent: 'center',
                  alignItems: 'center', margin:10}}
                  onPress={() => this.checkVINCode()} >
                  {/* rounded> */}
                  <Text style={{color:'white'}}>{this.state.captionCheckButton}</Text>
                  <Icon name='ios-search-outline' />
               </Button>

               {this.state.checkingVIN ? <Spinner /> : null }
               {this.state.validVin ? <VinDetail det={this.state.vinInfo}  /> : null }

               {this.state.msgResponse === '' ? null :
            // <Text>
               <Text style={styles.loginMsg}>{this.state.msgResponse}</Text>
            // </Text>
         }

           </Content>

        )
    }

}


const mapStateToProps = (state) => {
    return {
        carInfo: state.carInfo,
      //   newCarInfo2: state.getNewCarInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fillCarInfo: (car) => dispatch(carActions.fillCarInfo(car)),
        getCarInfo: () => dispatch(carActions.getCarInfo())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateCar)
