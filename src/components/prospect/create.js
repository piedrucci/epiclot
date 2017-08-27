import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Alert, AsyncStorage, Dimensions } from 'react-native';
import { Container, Header, Content, Icon, Left, Right, Button,
    Body, Title, Footer, FooterTab, List, ListItem, Thumbnail,
    Item, Input, Form, Label, Spinner, InputGroup, Picker } from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './carStyles';
import api from '../../utilities/api';
import DatePicker from 'react-native-datepicker'


const {height, width} = Dimensions.get('window')

class CreateProspect extends Component {

   constructor(props) {
      super(props)
      this.state = {
         session: {},

         newProspect: true,
         driver_license: '1234567890',
         sales_id: 0,
         dealership_id: '',
         firstname: 'Roberth',
         lastname: 'Mejias',
         address: 'Avenida',
         zipcode: '07157',
         state:'Panama',
         city:'Ciudad de Panama',
         cellphone: '60169131',
         emailaddress: 'roberth@beecode.co',
         looking_for:'toyota camry',
         dob:'1958-03-15',
         license_state:'FL',
         license_issued:'2015-07-20',
         license_expiration:'2018-01-01',
         license_height:'5.3',
         sex:'M',
         user_id:'',

         checkingLicense: false,
         validLicense: false,
         disableCheckButton: false,
         captionCheckButton: "Scan driver's license ",
         msgResponse: '',
         vinInfo: {},
         savingInfo: false,

      }

      this.handleChange = this.handleChange.bind(this)
      this.saveInfo = this.saveInfo.bind(this)

      this.checkVINCode = this.checkVINCode.bind(this)
      this.switchButtonStatus = this.switchButtonStatus.bind(this)
      this.nextStep = this.nextStep.bind(this)
      // this.getCarInfo = this.getCarInfo.bind(this)
   }

// OBTENER LOS DATOS DE LA SESSION ACTUAL
    componentDidMount() {
      this.checkSession()

      if ( this.props.vinScanned ){
         this.setState({vin: this.props.vinScanned})
      }

      Actions.refresh({
         title: 'Add Prospect',
         rightTitle: 'Save',
         onRight:()=>this.saveInfo()
      })
   }

   async checkSession() {
      const response = await AsyncStorage.getItem(api.getSessionName())
      const json = JSON.parse(response)
      // console.log(json)
       if ( null !== json ) {
          this.setState({session:json})
       } else if ( null === json ) {
           this.setState({loading:false});
           alert('Empty data');
       }
  }

   componentWillUnmount () {
      this._listeners && this._listeners.forEach(listener => listener.remove());
   }

// ACTIVA - DESACTIVA EL BOTON DE CHECK VIN
    switchButtonStatus(text) {
      const len = text.length
      this.setState( {vin:text} )
      this.setState( { disableCheckButton: ( len < 17)} )
   }


// CUEQUEA EL VIN INGRESADO EN EL TEXTBOX
    checkVINCode() {

      this.setState({
         disableCheckButton:true,
         checkingVIN:true,
         validVin:false,
         captionCheckButton: 'Checking VIN ',
         msgResponse: ''
      })

      const res = api.checkVIN(this.state.vin, this.state.session.dealership_id)
      res.then( (data) => {
         // console.log(data)
         this.setState({
            disableCheckButton:false,
            checkingVIN:false,
            vinInfo:data,
            validVin: (data.valid_vin) ? true : false,
            captionCheckButton: 'Check License ',
            msgResponse: data.msg,
         })
      } )
   }

   // ENVIAR DATOS Y AVANZAR
   nextStep() {
      this.props.fillCarInfo({vin:this.state.vin})
      Actions.createCar2({validVin: this.state.vin})
      // Actions.tabCar()
      // console.log(this.props)
   }

   handleChange(e, data){
      console.log(data);
      // alert(e.target.value)
   }

   // takePicture() {
   //    const options = {};
   //    //options.location = ...
   //    this.camera.capture({metadata: options})
   //    .then((data) => console.log(data))
   //    .catch(err => console.error(err));
   // }

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

    async saveInfo() {
      this.setState({savingInfo:true})
      const prospect = {
         newProspect: true,
      	sales_id: 0,
      	dealership_id: this.state.session.dealership_id,
      	firstname: this.state.firstname,
      	lastname: this.state.lastname,
      	address: this.state.address,
      	zipcode: this.state.zipcode,
      	city: this.state.city,
      	state: this.state.state,
      	cellphone: this.state.cellphone,
      	emailaddress: this.state.emailaddress,
      	looking_for: this.state.looking_for,
      	dob: this.state.dob,
      	driver_license: this.state.driver_license,
      	license_state: this.state.license_state,
      	license_issued: this.state.license_issued,
      	license_expiration: this.state.license_expiration,
      	license_height: this.state.license_height,
      	sex: this.state.sex,
      	user_id: this.state.session.user_id
      }
      // console.log(prospect)
      // const response = await api.sendPOST(api.getApi_Url()+'prospect}', prospect)
      // console.log(response)
      const response = await fetch(api.getApi_Url() + 'prospect',{
         method: 'post',
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
         },
         body: JSON.stringify(prospect)
      })

      // status 200 para determinar si la peticion tuvo exito!.
      if (response.status === 200 ) {
         console.log("Prospect Saved, statusCode: "+response.status)
         Actions.home2()
      }
      this.setState({savingInfo:false})

   }

    render() {
        return(
         //   , flex:1, alignItems:'center', justifyContent:'center'
            <Content style={{marginTop:60}}>

               {
                  this.state.savingInfo
                  ? <Spinner />
                  :
               <Form >

                  <Button
                     disabled={this.state.disableCheckButton}
                     style={{alignSelf: 'center', width:(width*65)/100,justifyContent: 'center',
                     alignItems: 'center', margin:10}}
                     onPress={() => Actions.cameraScanner() } >
                     <Text style={{color:'white'}}>{this.state.captionCheckButton}</Text>
                     <Icon name='ios-camera-outline' />
                  </Button>

                  <Item >
                     <Icon name='ios-barcode-outline' />
                     <Input
                        // maxLength = {20}
                        keyboardType='default'
                        //   style={{width:250}}
                        returnKeyType='next'
                        placeholder='Driver license'
                        autoCapitalize='characters'
                        onChangeText={ (text) => this.setState({driver_license:text}) }
                        // onSubmitEditing = { () => this.emailInput.focus() }
                        value={this.state.driver_license}
                     />

                  </Item>

                  <Item >
                     <Icon name='ios-barcode-outline' />
                     <Input
                        maxLength = {20}
                        keyboardType='default'
                        //   style={{width:250}}
                        returnKeyType='next'
                        placeholder='Firstname'
                        autoCapitalize='characters'
                        onChangeText={ (text) => this.setState({firstname:text}) }
                        // onSubmitEditing = { () => this.emailInput.focus() }
                        value={this.state.firstname}
                     />
                  </Item>

                  <Item >
                     <Icon name='ios-barcode-outline' />
                     <Input
                        maxLength = {20}
                        keyboardType='default'
                        //   style={{width:250}}
                        returnKeyType='next'
                        placeholder='Lastname'
                        autoCapitalize='characters'
                        onChangeText={ (text) => this.setState({lastname:text}) }
                        // onSubmitEditing = { () => this.emailInput.focus() }
                        value={this.state.lastname}
                     />
                  </Item>

                  {/* <View style={[styles.viewMargins, styles.viewContainer]}>
                     <Text>State</Text>
                     <Picker
                       style={{marginTop:-15}}
                       iosHeader="State"
                       mode="dialog"
                       selectedValue={this.state.state}
                       onValueChange={(value)=>this.setState({state: value})}
                     >
                       {transmission.map( (item, i) => <Picker.Item key={i} label={item.label} value={item.value} /> )}
                     </Picker>
                  </View>

                  <View style={[styles.viewMargins, styles.viewContainer]}>
                     <Text>City</Text>
                     <Picker
                       style={{marginTop:-15}}
                       iosHeader="State"
                       mode="dialog"
                       selectedValue={this.state.state}
                       onValueChange={(value)=>this.setState({state: value})}
                     >
                       {transmission.map( (item, i) => <Picker.Item key={i} label={item.label} value={item.value} /> )}
                     </Picker>
                  </View> */}

                  <Item >
                     <Icon name='ios-pin-outline' />
                     <Input
                        maxLength = {45}
                        keyboardType='default'
                        //   style={{width:250}}
                        returnKeyType='next'
                        placeholder='Address'
                        autoCapitalize='characters'
                        onChangeText={ (text) => this.setState({address:text}) }
                        // onSubmitEditing = { () => this.emailInput.focus() }
                        value={this.state.address}
                     />
                  </Item>

                  <Item >
                     <Icon name='ios-navigate-outline' />
                     <Input
                        maxLength = {20}
                        keyboardType='default'
                        //   style={{width:250}}
                        returnKeyType='next'
                        placeholder='State'
                        autoCapitalize='characters'
                        onChangeText={ (text) => this.setState({state:text}) }
                        // onSubmitEditing = { () => this.emailInput.focus() }
                        value={this.state.state}
                     />
                  </Item>

                  <Item >
                     <Icon name='ios-navigate-outline' />
                     <Input
                        maxLength = {20}
                        keyboardType='default'
                        //   style={{width:250}}
                        returnKeyType='next'
                        placeholder='City'
                        autoCapitalize='characters'
                        onChangeText={ (text) => this.setState({city:text}) }
                        // onSubmitEditing = { () => this.emailInput.focus() }
                        value={this.state.city}
                     />
                  </Item>

                  <Item >
                     <Icon name='ios-more-outline' />
                     <Input
                        maxLength = {20}
                        keyboardType='default'
                        //   style={{width:250}}
                        returnKeyType='next'
                        placeholder='Zip Code'
                        autoCapitalize='characters'
                        onChangeText={ (text) => this.setState({zipcode:text}) }
                        // onSubmitEditing = { () => this.emailInput.focus() }
                        value={this.state.zipcode}
                     />
                  </Item>

                  <Item >
                     <Icon name='ios-phone-portrait-outline' />
                     <Input
                        maxLength = {20}
                        keyboardType='default'
                        //   style={{width:250}}
                        returnKeyType='next'
                        placeholder='Cellphone'
                        autoCapitalize='characters'
                        onChangeText={ (text) => this.setState({cellphone:text}) }
                        // onSubmitEditing = { () => this.emailInput.focus() }
                        value={this.state.cellphone}
                     />
                  </Item>

                  <Item >
                     <Icon name='ios-at-outline' />
                     <Input
                        maxLength = {20}
                        keyboardType='default'
                        //   style={{width:250}}
                        returnKeyType='next'
                        placeholder='email'
                        autoCapitalize='characters'
                        onChangeText={ (text) => this.setState({emailaddress:text}) }
                        // onSubmitEditing = { () => this.emailInput.focus() }
                        value={this.state.emailaddress}
                     />
                  </Item>

                  <Item >
                     <Icon name='ios-search-outline' />
                     <Input
                        maxLength = {20}
                        keyboardType='default'
                        //   style={{width:250}}
                        returnKeyType='next'
                        placeholder='Looking For'
                        autoCapitalize='characters'
                        onChangeText={ (text) => this.setState({looking_for:text}) }
                        // onSubmitEditing = { () => this.emailInput.focus() }
                        value={this.state.looking_for}
                     />
                  </Item>

                 <DatePicker
                    style={styles.dPicker}
                    date={this.state.dob}
                    mode="date"
                    placeholder="Date of Birth"
                    format="YYYY-MM-DD"
                    minDate ="1950-01-01"
                  //   maxDate ={currentDate}
                  //   maxDate ={Moment.format('YYYY-MM-DD')}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                       dateIcon: {
                          position: 'absolute',
                          left: 0,
                          top: 4,
                          marginLeft: 0
                       },
                       dateInput: {
                          marginLeft: 36
                       }
                       // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {this.setState({dob: date})}}
                 />

                 <DatePicker
                    style={styles.dPicker}
                    date={this.state.license_issued}
                    mode="date"
                    placeholder="License Issued"
                    format="YYYY-MM-DD"
                    minDate ="2010-01-01"
                  //   maxDate ={currentDate}
                  //   maxDate ={Moment.format('YYYY-MM-DD')}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                       dateIcon: {
                          position: 'absolute',
                          left: 0,
                          top: 4,
                          marginLeft: 0
                       },
                       dateInput: {
                          marginLeft: 36
                       }
                       // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {this.setState({license_issued: date})}}
                 />

                 <DatePicker
                    style={styles.dPicker}
                    date={this.state.license_expiration}
                    mode="date"
                    placeholder="License Expiration"
                    format="YYYY-MM-DD"
                    minDate ="2010-01-01"
                  //   maxDate ={currentDate}
                  //   maxDate ={Moment.format('YYYY-MM-DD')}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                       dateIcon: {
                          position: 'absolute',
                          left: 0,
                          top: 4,
                          marginLeft: 0
                       },
                       dateInput: {
                          marginLeft: 36
                       }
                       // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {this.setState({license_expiration: date})}}
                 />

                 <Item >
                    <Icon name='ios-more-outline' />
                    <Input
                       maxLength = {20}
                       keyboardType='default'
                       //   style={{width:250}}
                       returnKeyType='next'
                       placeholder='License Height'
                       autoCapitalize='characters'
                       onChangeText={ (text) => this.setState({license_height:text}) }
                       // onSubmitEditing = { () => this.emailInput.focus() }
                       value={this.state.license_height}
                    />
                 </Item>

                 <View style={[styles.viewMargins, styles.viewContainer]}>
                    <Text>Sex</Text>
                    <Picker
                      style={{marginTop:-15}}
                      iosHeader="State"
                      mode="dialog"
                      selectedValue={this.state.sex}
                      onValueChange={(value)=>this.setState({sex: value})}
                    >
                      <Picker.Item label="Male" value="M" />
                      <Picker.Item label="Female" value="F" />
                    </Picker>
                 </View>

               </Form>
               }

            </Content>


        )
    }

}

export default CreateProspect
