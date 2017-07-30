import React, { Component } from 'react';
import { Button, Text, Header, Icon, Item, Input } from 'native-base';

import { Actions } from 'react-native-router-flux';

export default class DashboardSearchBar extends Component {

    constructor() {
        super()
        this.state = {
            searchWord: ''
        }
    }

    render() {

        return (

            <Header style={{marginTop:54}} searchBar rounded>
                <Item>
                    <Icon name="ios-search" />
                    <Input
                        placeholder="Search"
                        onChangeText={ (text) => this.setState( {searchWord:text} ) }
                    />
                    <Icon name="ios-car" />
                </Item>
                <Button transparent>
                    <Text>Search</Text>
                </Button>
                <Item><Label>{this.state.searchWord}</Label></Item>
            </Header>

        );

    }

}
