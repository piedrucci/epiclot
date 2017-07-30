import React, { Component } from 'react';
import { Container, Content, Spinner, List, ListItem, Body, Text } from 'native-base';

import FitImage from 'react-native-fit-image';

import { Actions } from 'react-native-router-flux';

import { FormattedNumber, FormattedCurrency } from 'react-native-globalize';

import DashboardHeader from './header';
import DashboardSearchBar from './searchBar';

const URL = 'http://api.epiclot.com/epiclots/cars/3'

export default class DashboardBody extends Component {

    constructor() {
        super();
        this.state = {
            error: false,
            cars: [],
            loading: true,
        }
    }

    componentWillMount() {
        this.fetchData().done()
    }

    async fetchData() {
        try{
            const response = await fetch(URL)
            const json = await response.json()

            this.setState({
                loading: false,
                cars: json
            })
            // alert(this.state.cars)
        }catch(err){
            this.setState({
                loading: false,
                error: true
            })
        }
    }

    render() {

        return (
            // <DashboardSearchBar />

            <Content>

                {this.state.loading? <Spinner /> : <List dataArray={this.state.cars} renderRow={(item) =>
                    <ListItem button onPress={()=>Actions.carDetail()} >
                        {/* <Thumbnail square size={80} source={{uri: 'http://epiclot.com/dealer/accounts/'+item.subdomain+'/photos/'+item.photo}} /> */}
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
                } />}

            </Content>

        );

    }

}
