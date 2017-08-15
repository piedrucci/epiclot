import React, { Component } from 'react';

import { StyleSheet, Text, AsyncStorage, RefreshControl, FlatList } from 'react-native';

import { Container, Header, Content, Item, Icon, Input, Button, Spinner,
   List, ListItem, Thumbnail, Body, Footer, FooterTab, Tab, Tabs, TabHeading } from 'native-base';

import FAB from 'react-native-fab' // component Float Button

import { Actions, ActionConst, Router, Scene } from 'react-native-router-flux';

import Cars from './listCars' // your first screen

import Prospect from './listProspects' // your second screen

// ===========================================
import { connect } from 'react-redux';
import * as appActions from '../../actions/appActions';
// ================================================

class Dashboard2 extends Component {

  constructor(props) {
      super(props)
      this.state = {
         index: 0,      // default screen index
      }
  }

  switchScreen(index) {
      this.setState({index: index})

      let _type = 'car'
      if (index===1) {
         _type = 'prospect'
      }else if (index===2) {
         _type = 'Settings'
      }

      // DISPARA LA ACCION AL REDUCER
      this.props.addTypeAction({addType:_type})
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

          {/* <Header hasTabs />
          <Tabs initialPage={0}>
            <Tab heading="Cars" >
              <Content>
              <Cars />
              </Content>
            </Tab>
            <Tab heading="Prospect">
              <Content>
                <Prospect />
              </Content>
            </Tab>
            <Tab heading="Settings">

            </Tab>
          </Tabs> */}

          <Content>

              {this.state.index == 0 ? <Cars/> : <Prospect/>}

          </Content>

          {/* {
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
			} */}

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
            <Button onPress={() => this.switchScreen(2) } >
              <Icon name="navigate" />
              <Text>Settings</Text>
            </Button>
          </FooterTab>

      </Footer>


        </Container>
      )
  }

}


const mapStateToProps = (state) => {
    return {
        appGlobalParams: state.appParams,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTypeAction: (t) => dispatch(appActions.addType(t)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard2)
