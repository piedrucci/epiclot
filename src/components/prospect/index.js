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
import { connect } from 'react-redux'
import * as appActions from '../../actions/appActions'
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
         refreshData: false,
         loading: false,
         session: {},
      }
      this.findElement = this.findElement.bind(this)
  }

  async componentDidMount() {
     try{
        await this.setState({session:this.props.GlobalParams.session})
      //   console.log( this.props.GlobalParams.session)
        this.fetchData()
     }catch(err){
        console.log(err)
     }


  }


// ACTUALIZA EL STORE PARA SABER QUE COMPONENTE CARGAR
// AL MOMENTO DE PRESIONAR AGREGAR (+)
  async switchScreen(index) {
      await this.setState({index: index})

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
   async fetchData() {
      try{
         if (typeof this.state.session.dealership_id === 'undefined'){
            console.log('SESSION ES  NULO');
            const sess = await AsyncStorage.getItem(api.getSessionName())
            const jsonSess = JSON.parse(response)
            if ( null !== json ) {
               await this.setState({session: jsonSess})
            } else if ( null === json ) {
               this.setState({loading:false});
               alert('Empty data');
            }
            console.log(this.state.session);
         }
         console.log(`index=${this.state.index}`)
         console.log('actualizando lista para dealership: '+this.state.session.dealership_id);

         let response = (this.state.index===0) ? await api.getCars(this.state.session.dealership_id) : await api.getProspects(this.state.session.dealership_id)
         const json = await response.json()

         this.setState({
            loading: false,
            cars: json,
            refreshData: false,
         })

         if (this.state.index===1){
            this.setState({
               loading: false,
               prospects: json,
               refreshData: false,
            })
         }

         // listOfCars = json;
         // console.log(json);

      }catch(err){

          this.setState({
             loading: false,
             error: true,
             refreshData: false,
          });

          Actions.refresh({ rightTitle: '', onRight:()=>false })
          const msg = 'Network request failed... \nCheck your network configuration'
          console.log(msg)

      }
   }

   componentWillReceiveProps(nextProps) {
      // if (nextProps.refreshData){
      //    alert('REFRESCAR')
      // }
      // console.log("sss");
      this.fetchData()
      if (typeof nextProps.refreshData !== 'undefined') {
         this.setState({refreshData: nextProps.refreshData})
         console.log(nextProps.refreshData);
         // this.fetchData()
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
                  ? <Cars data={this.state.cars} carFilter={this.state.listFilter} refreshData={this.state.refreshData} />
                  : <Prospect data={this.state.prospects}  prospectFilter={this.state.listFilter} />
               }

            </Content>

            <Footer style={styles.footerTab}>
               <FooterTab>
                  <Button onPress={() => this.switchScreen(0) }>
                     <Icon name="ios-car" />
                     {/* <Text>Cars</Text> */}
                  </Button>
                  {/* <Button onPress={() => this.switchScreen(1) }> */}
                     {/* <Icon name="ios-person" /> */}
                     {/* <Text>Prospects</Text> */}
                  {/* </Button> */}

               </FooterTab>
            </Footer>

         </Container>
      )
  }

}

const styles = StyleSheet.flatten({
   footerTab: {
      height: footerHeight
   },
});


const mapStateToProps = (state) => {
   return {
      GlobalParams: state.appParams,
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      addTypeAction: (t) => dispatch(appActions.addType(t)),
      StoreSession: (s) => dispatch(appActions.setSession(s)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard2)
