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


export default class CreateCar extends Component {

    constructor(props) {
        super(props)
        this.state = {
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

      const res = api.checkVIN(this.state.vin)
      res.then( (data) => {
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
            <Container style={{marginTop:60 }}>

                {/* <Header>
                    <Left>
                        <Button transparent onPress={ ()=> {Actions.pop()} }>
                            <Icon style={{fontSize:24}} name='ios-arrow-back-outline' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Create Car</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='ios-checkmark' />
                        </Button>
                    </Right>
                </Header> */}

                {/* style={{width:350 }} */}
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
                        <Picker
            //   iosHeader="Select one"
              mode="dropdown"
            //   selectedValue={this.state.selected1}
            //   onValueChange={this.onValueChange.bind(this)}
            >
              <Item label="Wallet" value="key0" />
              <Item label="ATM Card" value="key1" />
              <Item label="Debit Card" value="key2" />
              <Item label="Credit Card" value="key3" />
              <Item label="Net Banking" value="key4" />
            </Picker>


                    </Form>
                    <Button
                       disabled={this.state.disableCheckButton}
                       //   style={{width:250}}
                       onPress={() => this.checkVINCode()}
                       rounded>
                       <Text style={{color:'white'}}>{this.state.captionCheckButton}</Text>
                    </Button>

                    {this.state.checkingVIN ? <Spinner /> : null }
                    {this.state.validVin ? <VinDetail det={this.state.vinInfo}  /> : null }

                </Content>

                {this.state.msgResponse === '' ? null :
                <Footer>
                  <Text style={styles.loginMsg}>{this.state.msgResponse}</Text>
               </Footer> }

            </Container>

        )
    }

}
