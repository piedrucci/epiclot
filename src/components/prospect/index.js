import React, { Component } from 'react';

import { StyleSheet, Text, AsyncStorage, RefreshControl, FlatList } from 'react-native';

import { Header, Item, Icon, Input, Button, Container, Content, Spinner,
   List, ListItem, Thumbnail, Body, Footer, FooterTab } from 'native-base';

import FAB from 'react-native-fab' // component Float Button

import { Actions, ActionConst, Router, Scene } from 'react-native-router-flux';

import Cars from './listCars' // your first screen

import Prospect from './listProspects' // your second screen


class Dashboard2 extends Component {

  constructor(props) {
      super(props)
      this.state = {index: 0} // default screen index
  }

  switchScreen(index) {
      this.setState({index: index})
   }


  render() {
    let AppComponent = Cars;

    if (this.state.index == 0) {
       AppComponent = Cars
    } else {
       AppComponent = Prospect
    }


      return(
        <Container>
          {/*<Header style={{marginTop:54}}>{this.state.index == 0 ? <Text>Cars</Text> : <Text>Prospects</Text>}</Header>*/}
          <Content>

              {this.state.index == 0 ? <Cars/> : <Prospect/>}

          </Content>

          {
          	this.state.index == 0 ?
          		<FAB buttonColor="blue"
          			style={{marginButton:54}}
          			iconTextColor="#FFFFFF"
          			onClickAction={() => {Actions.createCar()}}
          			visible={true}
          			iconTextComponent={<Icon name="ios-add-outline"/>}
      			/>
 			:
 				<FAB
 					buttonColor="blue"
 					style={{marginButton:54}}
 					iconTextColor="#FFFFFF"
 					onClickAction={() => {Actions.createProspect()}}
 					visible={true}
 					iconTextComponent={<Icon name="ios-add-outline"/>}
				/>

			}

      <Footer>

          <FooterTab>
            <Button onPress={() => this.switchScreen(0) }>
              <Icon name="ios-car" />
              <Text>Cars</Text>
            </Button>
            <Button onPress={() => this.switchScreen(1) }>
              <Icon name="ios-person" />
              <Text>Prospects</Text>
            </Button>
            <Button >
              <Icon name="navigate" />
              <Text>Settings</Text>
            </Button>
          </FooterTab>

      </Footer>


        </Container>
      )
  }

}

export default Dashboard2
