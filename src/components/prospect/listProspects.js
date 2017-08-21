import React, { Component } from 'react';

import { StyleSheet, Text, AsyncStorage, RefreshControl, FlatList } from 'react-native';

import { Header, Item, Icon, Input, Button, Container, Content, Spinner,
   List, ListItem, Thumbnail, Body, Footer } from 'native-base';

import FAB from 'react-native-fab' // component Float Button

import { Actions, ActionConst, Router, Scene } from 'react-native-router-flux';

import api from '../../utilities/api';

// ===========================================
import { connect } from 'react-redux';
import * as appActions from '../../actions/appActions';
// ================================================

class Prospect extends Component {

  constructor(props) {
      super(props);
      this.state = {
          error: false,
          search: '',
          prospects: [],
          loading: true,
          searchWord: '',
          refreshing: false,
      }
  }

  componentDidMount() {
      let _info = '';

      _info = AsyncStorage.getItem(api.getSessionName())
      .then( (value) => { return JSON.parse(value) || null; } )
      .then( (JSON_Value) => {
          // console.log(JSON_Value);
          if ( null !== JSON_Value ) {
              this.fetchData(JSON_Value.dealership_id).done()
          } else if ( null === JSON_Value ) {
              this.setState({loading:false});
              alert('Empty data');
          }
      } )
  }

   // GET REQUEST PARA OBTENER LA LISTA COMPLETA DE PROSPECTOS DEL DEALER ACTUAL
   async fetchData(dealership_id) {
       try {
           // const response = await fetch(URL+dealership_id)
           const response = api.getProspects(dealership_id);
           response.then( (json) => {
               // const json = await response.json()
               this.setState({
                   loading: false,
                   prospects: json
               })
               listOfProspects = json;
               // console.log(listOfCars);
               // console.log(store.getState());
           } )
       } catch(err){
           this.setState({
               loading: false,
               error: true
           });
           alert(err);
       }
   }

   /* Function: findWord
      Description: esta funcion busca en el arreglo retornado por el servicio
   */
   findWord(word) {
       const newData = listOfProspects.filter( (item) => {
           const itemData = item.firstname.toLowerCase();
           const itemData2 = item.lastname.toLowerCase();
           const textData  = word.toLowerCase();
           return (itemData.indexOf(textData) > -1) || (itemData2.indexOf(textData) > -1)
       } );
       // console.log(newData);
       this.setState({prospects:newData});
   }

  render() {
      return(
        <Container>
          {this.state.loading ? null :
          <Header style={{marginTop:54}} searchBar rounded>
              <Item>
                  <Icon name="ios-search" />
                  <Input
                      placeholder="Search"
                      onChangeText={ (text) => this.findWord( text ) }
                  />
                  <Icon name="ios-car" />
              </Item>

          </Header>
          }

          <Content>
            {this.state.loading ? <Spinner style={{marginTop:75}} /> :
             <FlatList
               data={this.state.prospects}
               renderItem={({item}) =>
               <ListItem button onPress={()=>Actions.prospectDetail({prospect:item})} >
                   <Body>
                       <Text style={{fontWeight: 'bold', marginLeft: 10}}>{item.firstname} {item.lastname}</Text>

                       <Text note style={{marginLeft: 10, }}>{item.address} </Text>
                       <Text note style={{marginLeft: 10, }}>{item.city} - {item.state} </Text>
                       {item.cellphone==='' ? null : <Text note style={{marginLeft: 10, }}>phone: {item.cellphone} </Text>}
                   </Body>
               </ListItem>}
               keyExtractor={item => item.sales_id}
            />
           }

          </Content>

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

export default connect(mapStateToProps, mapDispatchToProps)(Prospect)
