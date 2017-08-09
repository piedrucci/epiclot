import React, { Component } from 'react';
import {
  AppRegistry, StyleSheet, View, AlertIOS, Alert
} from 'react-native'

import { Container, Header, Content, Footer, FooterTab, Button, Text } from 'native-base'

import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux'

import CreateCar from './create'
import CreateCar2 from './create2'

class TabComp extends Component {
   constructor() {
      super()
      // this.state = {
      //
      // }
   }


   render() {
      return (
         <Container>
            <Header />
            <Content>

               <Router>
                  <Scene key='createCar'  component={CreateCar} hideNavBar={false} title='New Car'  />
                  <Scene key='createCar2' component={CreateCar2} hideNavBar={false} title='New Car' />
               </Router>

            </Content>
            <Footer>
               <FooterTab>
                  <Button
                     onPress={()=> Actions.createCar()}
                     >
                     <Text>Apps</Text>
                  </Button>
                  <Button
                     onPress={()=> Actions.createCar2()}
                     >
                     <Text>Camera</Text>
                  </Button>

               </FooterTab>
            </Footer>
         </Container>
      );
   }

}


const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#F5FCFF',
  // },
  container: {
     flex: 1,
     justifyContent: "center",
     alignItems: "center",
     backgroundColor: "transparent",
  },

  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default TabComp
