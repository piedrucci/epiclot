import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { StyleSheet, Text, AsyncStorage, RefreshControl, FlatList } from 'react-native';

import { Header, Item, Icon, Input, Button, Container, Content, Spinner,
   List, ListItem, Thumbnail, Body, Footer } from 'native-base';

import FitImage from 'react-native-fit-image';

import FAB from 'react-native-fab' // component Float Button

import { Actions, ActionConst, Router, Scene } from 'react-native-router-flux';

import api from '../../utilities/api';

import { FormattedNumber, FormattedCurrency } from 'react-native-globalize';

const listOfCars = []

// import store from '../../store';

// ===========================================
import { connect } from 'react-redux';
import * as appActions from '../../actions/appActions';
// ================================================

class Cars extends Component {

  constructor(props) {
      super(props);
      this.state = {
          error: false,
          search: '',
          cars: [],
          loading: true,
          searchWord: '',
          refreshing: false,
      }
      console.log('==== RENDER CAR =====')
  }

 //  componentWillMount() {
 //     this.props.addTypeAction({addType:'car'})
 //     console.log('==== recibio props ==== CAR')
 // }

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

// GET REQUEST PARA OBTENER LA LISTA COMPLETA DE CARROS DEL DEALER ACTUAL
  async fetchData(dealership_id) {
      try{
          // const response = await fetch(URL+dealership_id)
          const response = api.getCars(dealership_id);
          response.then( (json) => {
              // const json = await response.json()
              this.setState({
                  loading: false,
                  cars: json
              })
              listOfCars = json;
              // console.log(listOfCars);
              // console.log(store.getState());
          } )
      }catch(err){
          this.setState({
              loading: false,
              error: true
          });
          alert(err);
      }
  }

  findWord(word) {
      const newData = listOfCars.filter( (item) => {
          const itemData = item.make.toLowerCase();
          const itemData2 = item.model.toLowerCase();
          const textData  = word.toLowerCase();
          return (itemData.indexOf(textData) > -1) || (itemData2.indexOf(textData) > -1)
      } );
      // console.log(newData);
      this.setState({cars:newData});
  }

  render() {
      return (
          <Container>

              {this.state.loading ? null :
              <Header searchBar rounded>
                  <Item>
                      <Icon name="ios-search" />
                      <Input
                          placeholder="Search"
                          // onChangeText={ (text) => this.setState( {searchWord:text} ) }
                          onChangeText={ (text) => this.findWord( text ) }
                      />
                      <Icon name="ios-car" />
                  </Item>
                  {/* <Button transparent>
                      <Text>Search</Text>
                  </Button> */}
              </Header>
              }

              <Content>

                {this.state.loading ? <Spinner style={{marginTop:75}} /> :
                 <FlatList
                   data={this.state.cars}
                   renderItem={({item}) =>
                   <ListItem button onPress={()=>Actions.carDetail({car:item})} >
                       <FitImage style={{borderRadius:10, width:90, height: 60}} source={{uri: 'http://epiclot.com/dealer/accounts/'+item.subdomain+'/photos/'+item.photo}} />
                       <Body>
                           <Text style={{fontWeight: 'bold', marginLeft: 10}}>{item.make} {item.model}</Text>

                           <Text note style={{marginLeft: 10, }}>{item.year}</Text>
                           <Text note style={{marginLeft: 10, }}>{item.condition}</Text>
                           <Text note style={{marginLeft: 10, }}>
                               <FormattedCurrency value={parseFloat(item.webprice)} />
                           </Text>

                       </Body>
                   </ListItem>}
                   keyExtractor={item => item.vin}
                />
               }

              </Content>

              <Footer>
                <FAB buttonColor="blue"
                  style={{marginButton:54}}
                  iconTextColor="#FFFFFF"
                  onClickAction={() => {Actions.createCar()}}
                  visible={true}
                  iconTextComponent={<Icon name="ios-add-outline"/>}
        			  />
              </Footer>

          </Container>

      );
  }
}

const styles = StyleSheet.create({
  footer: {
      // color: 'blue',
      fontWeight: 'bold',
      fontSize: 18,
      textAlign: 'center'
  },
  fitImage: {
      borderRadius: 20,
    },
});


const mapStateToProps = (state) => {
    return {
        appGlobalParams: state.appParams,
      //   newCarInfo2: state.getNewCarInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTypeAction: (t) => dispatch(appActions.addType(t)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cars)
