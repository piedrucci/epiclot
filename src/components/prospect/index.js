import React, { Component } from 'react';
import { Text, FlatList, Dimensions, StyleSheet, AsyncStorage, Alert, AlertIOS, Platform } from 'react-native';
import { Container, Header, Content, Item, Icon, Input, Button, Spinner,
   List, ListItem, Thumbnail, Body, Footer, FooterTab, Tab, Tabs, TabHeading } from 'native-base';

// import FAB from 'react-native-fab' // component Float Button
import { Actions, ActionConst, Router, Scene } from 'react-native-router-flux';
import Cars from './listCars' // your first screen
import Prospect from './listProspects' // your second screen
import api from '../../utilities/api';
import FitImage from 'react-native-fit-image';
import { FormattedCurrency } from 'react-native-globalize';

// ===========================================
import { connect } from 'react-redux';
import * as appActions from '../../actions/appActions';
// ================================================

const {height, width} = Dimensions.get('window')
const footerHeight = parseInt((6 * height) / 100)

console.disableYellowBox = true

class Dashboard2 extends Component {

  constructor(props) {
      super(props)
      this.state = {
         index: 0,      // default screen index
         listFilter: '',
         refreshData: props.refreshData,
         loading: false,
      }
      this.findElement = this.findElement.bind(this)
  }

  componentDidMount() {

   try{
     let _info = '';

     _info = AsyncStorage.getItem(api.getSessionName())
     .then( (value) => { return JSON.parse(value) || null; } )
     .then( (JSON_Value) => {
         // console.log(JSON_Value);
         if ( null !== JSON_Value ) {
          this.setState({dealership_id:JSON_Value.dealership_id})
          this.fetchData(JSON_Value.dealership_id)
        } else if ( null === JSON_Value ) {
          this.setState({loading:false});
          alert('Empty data');
        }
     } )
   }catch(err){
     alert(err)
     console.log(err)
   }

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


   // GET REQUEST PARA OBTENER LA LISTA COMPLETA DE PROSPECTOS DEL DEALER ACTUAL
   async fetchData(dealership_id) {
      try{
         //  console.log('actualizando lista de carros');
          const response = await api.getCars(dealership_id);
          const json = await response.json()

         this.setState({
            loading: false,
            cars: json,
            refreshData: false,
         })
         listOfCars = json;

      }catch(err){

          this.setState({
             loading: false,
             error: true,
             refreshData: false,
          });

          Actions.refresh({ rightTitle: 'rrr', onRight:()=>false })
          const msg = 'Network request failed... \nCheck your network configuration'
          if (Platform.OS === 'ios') {
             // AlertIOS.alert('Error', msg)
          }else{
            Alert.alert('Error', msg)
          }
      }
   }

   componentWillReceiveProps(nextProps) {
      if (typeof nextProps.refreshData !== 'undefined') {
         this.setState({refreshData: nextProps.refreshData})
         // console.log(`en HOME receiveProps refreshData cambio a ${nextProps.refreshData}`)
      }
   }

  render() {
   //   try{
   //      let AppComponent = Cars;
   //      let iconSearch = <Icon name="ios-car" />
     //
   //      if (this.state.index == 0) {
   //         AppComponent = Cars
   //      } else {
   //         AppComponent = Prospect
   //         iconSearch = <Icon name="ios-person" />
   //      }
   //   }catch(err){
   //      console.log(err)
   //      alert(err)
   //   }


      return(
         <Container>
            {/* <Header style={{marginTop:56}} searchBar rounded>
               <Item>
                  <Icon name="ios-search" />
                  <Input
                     placeholder="Search"
                     onChangeText={ (text) => this.findElement( text ) }
                  />
                  {iconSearch}
               </Item>
            </Header> */}

            <Content style={{marginTop:56}}>
{/* refreshData={this.state.refreshData}  */}
               {
                  this.state.index == 0
                  ? <Cars carFilter={this.state.listFilter} />
                  : <Prospect prospectFilter={this.state.listFilter} />
               }

            </Content>

            <Footer style={styles.footerTab}>
               <FooterTab>
                  <Button onPress={() => this.switchScreen(0) }>
                     <Icon name="ios-car" />
                     {/* <Text>Cars</Text> */}
                  </Button>
                  <Button onPress={() => this.switchScreen(1) }>
                     <Icon name="ios-person" />
                     {/* <Text>Prospects</Text> */}
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


const styles = StyleSheet.flatten({
   footerTab: {
      height: footerHeight
   },
});


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard2)
