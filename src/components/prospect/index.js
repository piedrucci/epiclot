import React, { Component } from 'react';
import { Text, FlatList } from 'react-native';
import { Container, Header, Content, Item, Icon, Input, Button, Spinner,
   List, ListItem, Thumbnail, Body, Footer, FooterTab, Tab, Tabs, TabHeading } from 'native-base';

// import FAB from 'react-native-fab' // component Float Button

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
         listFilter: ''
      }
      this.findElement = this.findElement.bind(this)
  }

// ACTUALIZA EL STORE PARA SABER QUE COMPONENTE CARGAR
// AL MOMENTO DE PRESIONAR AGREGAR (+)
  switchScreen(index) {
      this.setState({index: index})

      let _type = 'car'
      if (index===1) {
         _type = 'prospect'
      }else if (index===2) {
         _type = 'Settings'
         alert('Under construction')
      }

      // DISPARA LA ACCION AL REDUCER
      this.props.addTypeAction({addType:_type})
   }


   findElement(str) {
      // console.log(`escribio: ${str}`)
      this.setState({listFilter:str})
      // console.log(`actualizo estado carFilter: ${this.state.carFilter}`)
   }

  render() {
    let AppComponent = Cars;
    let iconSearch = <Icon name="ios-car" />

    if (this.state.index == 0) {
       AppComponent = Cars
    } else {
       AppComponent = Prospect
       iconSearch = <Icon name="ios-person" />
    }


      return(
         <Container>
            <Header style={{marginTop:56}} searchBar rounded>
               <Item>
                  <Icon name="ios-search" />
                  <Input
                     placeholder="Search"
                     onChangeText={ (text) => this.findElement( text ) }
                  />
                  {iconSearch}
               </Item>
            </Header>

            <Content>

               {
                  this.state.index == 0
                  ? <Cars carFilter={this.state.listFilter} />
                  : <Prospect prospectFilter={this.state.listFilter} />
               }

            </Content>

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
