import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, Text, AsyncStorage, RefreshControl, FlatList } from 'react-native';

import { Header, Item, Icon, Input, Button, Container, Content, Spinner,
   List, ListItem, Thumbnail, Body } from 'native-base';

import FitImage from 'react-native-fit-image';

import { Actions, ActionConst, Router, Scene } from 'react-native-router-flux';

import api from '../../utilities/api';

// import DashboardHeader from './header';
// import DashboardSearchBar from './searchBar';
// import DashboardBody from './body';
import DashboardFooter from './footer';
import DashboardBody from './body';
import UserInfo from '../user/info';
// import CarDetail from '../car/detail';
// import CreateCar from '../car/create';

import Elements from './listCars'

import { FormattedNumber, FormattedCurrency } from 'react-native-globalize';

const listOfCars = []

import store from '../../store';

export default class Dashboard extends Component {

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
    }

    componentDidMount() {
        let _info = '';

        _info = AsyncStorage.getItem(api.getSessionName())
        .then( (value) => { return JSON.parse(value) || null; } )
        .then( (JSON_Value) => {
            // console.log(JSON_Value.dealership_id);
            if ( null !== JSON_Value ) {
                this.fetchData(JSON_Value.dealership_id).done()
            } else if ( null === JSON_Value ) {
                this.setState({loading:false});
                alert('Empty data');
            }
        } )
    }

   //  _onRefresh() {
   //    this.setState({refreshing: true});
   //    fetchData().then(() => { this.setState({refreshing: false}); });
   //    alert('aaaaa');
   // }

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
                <Header style={{marginTop:54}} searchBar rounded>
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
                    {/* <Router >
                        <Scene key='carList' component={DashboardBody} hideNavBar={true} />
                        <Scene key='userInfo' component={UserInfo} hideNavBar={true} />
                    </Router> */}

                <Content>

                   {/* <Thumbnail square size={80} source={{uri: 'http://epiclot.com/dealer/accounts/'+item.subdomain+'/photos/'+item.photo}} /> */}
                    {/* {this.state.loading? <Spinner /> :
                       <List
                          refreshControl={ <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)} /> }
                        dataArray={this.state.cars} renderRow={(item) =>
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
                        </ListItem>
                    } />} */}

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

                {/* <DashboardFooter /> */}

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
