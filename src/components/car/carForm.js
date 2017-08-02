import React, { Component } from 'react'

import { Text, Picker } from 'react-native'

import { Container, Form, Label, Button, Item, Input, Icon } from 'native-base'

import styles from './carStyles'

class CarForm extends Component {
   constructor() {
      super()
      this.state = {
         mileage: '',
         language: 'java',
      }
   }

   render() {
      return (
         // <Container style={styles.container}>
         <Container style={{marginTop:54}}>
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

               <Item>
                  <Picker
                     selectedValue={this.state.language}
                     onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                     <Picker.Item label="Java" value="java" />
                     <Picker.Item label="JavaScript" value="js" />
                  </Picker>
               </Item>

               <Button>
                  <Label style={styles.buttonDefaut}>SAVE</Label>
               </Button>
            </Form>
         </Container>
      )
   }
}

export default CarForm
