import React, { Component } from 'react'

import { Container, Content, Header } from 'native-base'

import CarForm from './carForm'

class CreateCar2 extends Component {
   render() {
      return (
         <Container>
            <Content>
               <CarForm />
            </Content>
         </Container>
      )
   }
}

export default CreateCar2
