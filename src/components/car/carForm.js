import React, { Component } from 'react'

import { View, Text } from 'react-native'

import { Container, Content, Form, Label, Button, Item, Input, Icon, Picker } from 'native-base'
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
         <Container >

            <Content>
               <Form>

                  <Item floatingLabel>
                      <Label>Mileage</Label>
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

                  <View style={[styles.viewMargins, styles.viewContainer]}>
                     <Text>Mileage Type</Text>
                     <Picker
                        style={{marginTop:-15}}
                        iosHeader="Mileage Type"
                        mode="dialog"
                        selectedValue={this.state.mileage_type}
                        onValueChange={(value)=>this.setState({mileage_type: value})}
                        >
                           {mileageType.map( (item, i) => <Picker.Item key={i} label={item.label} value={item.value} /> )}
                     </Picker>
                  </View>

                  <View style={[styles.viewMargins, styles.viewContainer]}>
                     <Text>Color</Text>
                     <Picker
                        style={{marginTop:-15}}
                        iosHeader="Select Color"
                        mode="dialog"
                        selectedValue={this.state.color}
                        onValueChange={(value)=>this.setState({color: value})}
                        >
                           {color.map( (item, i) => <Picker.Item key={i} label={item.label} value={item.value} /> )}
                     </Picker>
                  </View>

                  <View style={[styles.viewMargins, styles.viewContainer]}>
                     <Text>Transmission</Text>
                     <Picker
                        style={{marginTop:-15}}
                        iosHeader="Select Transmission"
                        mode="dialog"
                        selectedValue={this.state.transmission}
                        onValueChange={(value)=>this.setState({transmission: value})}
                        >
                           {transmission.map( (item, i) => <Picker.Item key={i} label={item.label} value={item.value} /> )}
                     </Picker>
                  </View>

                  <View style={[styles.viewMargins, styles.viewContainer]}>
                     <Text>Status</Text>
                     <Picker
                        style={{marginTop:-15}}
                        iosHeader="Select Status"
                        mode="dialog"
                        selectedValue={this.state.status}
                        onValueChange={(value)=>this.setState({status: value})}
                        >
                           {status.map( (item, i) => <Picker.Item key={i} label={item.label} value={item.value} /> )}
                     </Picker>
                  </View>


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
            </Content>

            <Form>


               {/* <DatePicker
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
               /> */}




               {/* <ModalPicker
                    data={mileageType}
                    initValue="NO_ACTUAL!"
                    onChange={(option)=>{ alert(`${option.label} (${option.key}) nom nom nom`) }} /> */}


            </Form>

         </Container>
      )
   }
}

export default CarForm
