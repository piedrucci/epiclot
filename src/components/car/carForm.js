import React, { Component } from 'react'

import { View, Text, ScrollView } from 'react-native'

import { Container, Content, Form, Label, Button, Item, Title,
   Input, Icon, Picker, Footer, Header, Left, Right, Body, FooterTab } from 'native-base'
import DatePicker from 'react-native-datepicker'
import ModalPicker from 'react-native-modal-picker'

import styles from './carStyles'

// ELEMENTOS PARA LLENAR LOS PICKERS
import { mileageType, color, transmission, status } from './pickerOptions'

// const PickerItem = Picker.Item;

// =============================================================================

class CarForm extends Component {
   constructor() {
      super()
      this.state = {
         mileage: '',
         date:"2016-05-15",

         mileage_type: mileageType[0].value,
         color: color[0].value,
         transmission: transmission[0].value,
         status: status[0].value,
         purchase_price: '',
         webprice: '',
         sale_price: '',
         whosale_price: '',

      }
   }

   onValueChange(value: string) {
    this.setState({
      mileageType: value
    });
  }

   render() {
      return (

            <Container>
               <ScrollView>

               <Header />

               <Content style={{marginTop:54}}>
                  <Form>

                     <Item >
                        {/* <Label>Mileage1</Label> */}
                        {/* <Icon name='ios-car-outline' /> */}
                        <Input
                           maxLength = {12}
                           keyboardType='numeric'
                           returnKeyType='next'
                             placeholder='mileage'
                           onChangeText={ (text) => this.setState( {mileage:text} ) }
                           // onSubmitEditing = { () => this.emailInput.focus() }
                           value={this.state.mileage}
                        />
                     </Item>

                     <Item floatingLabel>
                        <Label>Mileage2</Label>
                        {/* <Icon name='ios-car-outline' /> */}
                        <Input
                           maxLength = {12}
                           keyboardType='numeric'
                           returnKeyType='next'
                           //   placeholder='enter the mileage'
                           onChangeText={ (text) => this.setState( {mileage:text} ) }
                           // onSubmitEditing = { () => this.emailInput.focus() }
                           value={this.state.mileage}
                        />
                     </Item>

                     <Item floatingLabel>
                        <Label>Mileage3</Label>
                        {/* <Icon name='ios-car-outline' /> */}
                        <Input
                           maxLength = {12}
                           keyboardType='numeric'
                           returnKeyType='next'
                           //   placeholder='enter the mileage'
                           onChangeText={ (text) => this.setState( {mileage:text} ) }
                           // onSubmitEditing = { () => this.emailInput.focus() }
                           value={this.state.mileage}
                        />
                     </Item>

                     <Item floatingLabel>
                        <Label>Mileage4</Label>
                        {/* <Icon name='ios-car-outline' /> */}
                        <Input
                           maxLength = {12}
                           keyboardType='numeric'
                           returnKeyType='next'
                           //   placeholder='enter the mileage'
                           onChangeText={ (text) => this.setState( {mileage:text} ) }
                           // onSubmitEditing = { () => this.emailInput.focus() }
                           value={this.state.mileage}
                        />
                     </Item>

                     <Item floatingLabel>
                        <Label>Mileage5</Label>
                        {/* <Icon name='ios-car-outline' /> */}
                        <Input
                           maxLength = {12}
                           keyboardType='numeric'
                           returnKeyType='next'
                           //   placeholder='enter the mileage'
                           onChangeText={ (text) => this.setState( {mileage:text} ) }
                           // onSubmitEditing = { () => this.emailInput.focus() }
                           value={this.state.mileage}
                        />
                     </Item>

                     <Item floatingLabel>
                        <Label>Mileage6</Label>
                        {/* <Icon name='ios-car-outline' /> */}
                        <Input
                           maxLength = {12}
                           keyboardType='numeric'
                           returnKeyType='next'
                           //   placeholder='enter the mileage'
                           onChangeText={ (text) => this.setState( {mileage:text} ) }
                           // onSubmitEditing = { () => this.emailInput.focus() }
                           value={this.state.mileage}
                        />
                     </Item>

                     <Item floatingLabel>
                        <Label>Mileage7</Label>
                        {/* <Icon name='ios-car-outline' /> */}
                        <Input
                           maxLength = {12}
                           keyboardType='numeric'
                           returnKeyType='next'
                           //   placeholder='enter the mileage'
                           onChangeText={ (text) => this.setState( {mileage:text} ) }
                           // onSubmitEditing = { () => this.emailInput.focus() }
                           value={this.state.mileage}
                        />
                     </Item>

                     <Item floatingLabel>
                        <Label>Mileage8</Label>
                        {/* <Icon name='ios-car-outline' /> */}
                        <Input
                           maxLength = {12}
                           keyboardType='numeric'
                           returnKeyType='next'
                           //   placeholder='enter the mileage'
                           onChangeText={ (text) => this.setState( {mileage:text} ) }
                           // onSubmitEditing = { () => this.emailInput.focus() }
                           value={this.state.mileage}
                        />
                     </Item>

                     <Item floatingLabel>
                        <Label>Mileage9</Label>
                        {/* <Icon name='ios-car-outline' /> */}
                        <Input
                           maxLength = {12}
                           keyboardType='numeric'
                           returnKeyType='next'
                           //   placeholder='enter the mileage'
                           onChangeText={ (text) => this.setState( {mileage:text} ) }
                           // onSubmitEditing = { () => this.emailInput.focus() }
                           value={this.state.mileage}
                        />
                     </Item>



                  </Form>
               </Content>
               <Footer>
               {/* <FooterTab> */}
               <Button block>
                  <Text>Footer</Text>
               </Button>
               {/* </FooterTab> */}
               </Footer>
            </ScrollView>
            </Container>


      )
   }
}

export default CarForm
