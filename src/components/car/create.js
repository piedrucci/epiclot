import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, Text } from 'react-native';

import { Container, Header, Content, Icon, Left, Right, Button,
    Body, Title, Footer, FooterTab, List, ListItem, Thumbnail,
    Item, Input, Form, Label, Spinner, InputGroup, Picker } from 'native-base';

import { Actions } from 'react-native-router-flux';

import styles from './carStyles';
import api from '../../utilities/api';

import VinDetail from './vinDetails';

// ===========================================
import { connect } from 'react-redux';
import * as sessionActions from '../../actions/sessionActions';
// ================================================

class CreateCar extends Component {

   constructor(props) {
      super(props)
      this.state = {
         session: {},
         vin: '5XXGM4A70FG352220',
         // vin: '1M1AW07Y1GM051234',
         checkingVIN: false,
         validVin: false,
         disableCheckButton: false,
         captionCheckButton: 'Check VIN ',
         msgResponse: '',
         vinInfo: {},
      }

      this.checkVINCode = this.checkVINCode.bind(this)
      this.switchButtonStatus = this.switchButtonStatus.bind(this)
   }

// OBTENER LOS DATOS DE LA SESSION ACTUAL
    componentDidMount() {
      const response = api.getSession()
      response.then( (data) => {
         this.setState({session: JSON.parse(data)})
      } )
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
            captionCheckButton: 'Check VIN ',
            msgResponse: data.msg,
         })
      } )
   }

    render() {
        return(
         //   , flex:1, alignItems:'center', justifyContent:'center'
         <Container style={{marginTop:60}}>

            <Content>

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
                        //  style={{margin:10}}
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

            </Content>

            {this.state.msgResponse === '' ? null :
            <Footer>
               <Text style={styles.loginMsg}>{this.state.msgResponse}</Text>
            </Footer> }

            {!this.state.validVin ? null :
               <Footer>
                  <Button primary
                     style={styles.buttonNext}
                     onPress = { () => Actions.createCar2() }
                  >
                     <Text style={styles.titleButtonNext}>Next</Text>
                     <Icon style={styles.titleButtonNext} name='ios-arrow-forward-outline' />
                  </Button>
               </Footer> }

            </Container>

        )
    }

}

const mapStateToProps = (state) => {
    return {
      //   cars: state.cars,
        session: state.session,
    }
}

// const mapDispatchToProps = (dispatch) => {
//   return { carActions, sessionActions }
// }

export default connect(mapStateToProps, sessionActions)(CreateCar)
