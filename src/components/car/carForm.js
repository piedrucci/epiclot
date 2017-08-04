import React, { Component } from 'react'

import { Text, Picker } from 'react-native'

import { Container, Form, Label, Button, Item, Input, Icon } from 'native-base'
import DatePicker from 'react-native-datepicker'

import styles from './carStyles'

// ELEMENTOS PARA LLENAR LOS PICKERS
import { mileageType, color, transmission, status } from './pickerOptions'

// =============================================================================

class CarForm extends Component {
   constructor() {
      super()
      this.state = {
         mileage: '',
         date:"2016-05-15",

         mileage_type: mileageType[0].value,
         color: '',
         transmission: '',
         status: '',
         purchase_price: '',
         webprice: '',
         sale_price: '',
         whosale_price: '',

      }
   }

   render() {
      return (
         // <Container style={styles.container}>
         <Container style={{flex:1, marginTop:54}}>
            <Form>
               <Item >
                   {/* <Label>Username</Label> */}
                   <Icon name='ios-car-outline' />
                   <Input
                       maxLength = {12}
                       keyboardType='numeric'
                     //   style={{width:300}}
                       returnKeyType='next'
                       placeholder='Mileage'
                       onChangeText={ (text) => this.setState( {mileage:text} ) }
                       // onSubmitEditing = { () => this.emailInput.focus() }
                       value={this.state.mileage}
                   />
               </Item>

               <DatePicker
                  style={{width: 200}}
                  date={this.state.date}
                  mode="date"
                  placeholder="select date"
                  format="YYYY-MM-DD"
                  minDate="2016-05-01"
                  maxDate="2016-06-01"
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
                  onDateChange={(date) => {this.setState({date: date})}}
               />

               <Item>
                  <Text>Mileage Type</Text>
                  <Picker
                     style={{width:150}}
                     selectedValue={this.state.mileage_type}
                     onValueChange={(itemValue, itemIndex) => this.setState({mileage_type: itemValue})}>
                     {mileageType.map( (item, i) => <Picker.Item key={i} label={item.label} value={item.value} /> )}
                  </Picker>
               </Item>

               {/* <Item>
                  <Text>Color</Text> */}
                  <Picker
                     selectedValue={this.state.color}
                     onValueChange={(itemValue, itemIndex) => this.setState({color: itemValue})}>
                     {color.map( (item, i) => <Picker.Item key={i} label={item.label} value={item.value} /> )}
                  </Picker>
               {/* </Item> */}

{/* <Item>
   <Text>Transmission</Text>
   <Picker
      selectedValue={this.state.transmission}
      onValueChange={(itemValue, itemIndex) => this.setState({transmission: itemValue})}>
      {transmission.map( (item, i) => <Picker.Item key={i} label={item.label} value={item.value} /> )}
   </Picker>
</Item>

<Item>
   <Text>Status</Text>
   <Picker
      selectedValue={this.state.status}
      onValueChange={(itemValue, itemIndex) => this.setState({status: itemValue})}>
      {status.map( (item, i) => <Picker.Item key={i} label={item.label} value={item.value} /> )}
   </Picker>
</Item> */}

               <Item >
                   <Icon name='ios-cash-outline' />
                   <Input
                       maxLength = {12}
                       keyboardType='numeric'
                     //   style={{width:300}}
                       returnKeyType='next'
                       placeholder='Purchase Price'
                       onChangeText={ (text) => this.setState( {purchase_price:text} ) }
                       // onSubmitEditing = { () => this.emailInput.focus() }
                       value={this.state.purchase_price}
                   />
               </Item>

               <Item >
                   <Icon name='ios-cash-outline' />
                   <Input
                       maxLength = {12}
                       keyboardType='numeric'
                     //   style={{width:300}}
                       returnKeyType='next'
                       placeholder='Web Price'
                       onChangeText={ (text) => this.setState( {webprice:text} ) }
                       // onSubmitEditing = { () => this.emailInput.focus() }
                       value={this.state.webprice}
                   />
               </Item>

               <Item >
                   <Icon name='ios-cash-outline' />
                   <Input
                       maxLength = {12}
                       keyboardType='numeric'
                     //   style={{width:300}}
                       returnKeyType='next'
                       placeholder='Sale Price'
                       onChangeText={ (text) => this.setState( {sale_price:text} ) }
                       // onSubmitEditing = { () => this.emailInput.focus() }
                       value={this.state.sale_price}
                   />
               </Item>

               <Item >
                   <Icon name='ios-cash-outline' />
                   <Input
                       maxLength = {12}
                       keyboardType='numeric'
                     //   style={{width:300}}
                       returnKeyType='next'
                       placeholder='Whosale Price'
                       onChangeText={ (text) => this.setState( {whosale_price:text} ) }
                       // onSubmitEditing = { () => this.emailInput.focus() }
                       value={this.state.whosale_price}
                   />
               </Item>






               <Button style={{alignSelf: 'center', width:250,justifyContent: 'center',
               alignItems: 'center', margin:10}}>
                  <Label style={{color:'white'}}>SAVE</Label>
               </Button>
            </Form>
         </Container>
      )
   }
}

export default CarForm
