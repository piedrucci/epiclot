import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, Text } from 'react-native';

import { Container, Header, Content, Icon, Left, Right, Button,
    Body, Title, Footer, FooterTab, List, ListItem, Thumbnail,
    Item, Input, Form, Label, Spinner, InputGroup } from 'native-base';

import { Actions } from 'react-native-router-flux';
// import api from '../../utilities/api';


export default class UserInfo extends Component {

    render() {
        return(

            <Container>

                <Header>
                    <Left>
                        <Button transparent onPress={ ()=> {Actions.pop()} }>
                            <Icon style={{fontSize:24}} name='ios-arrow-back-outline' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>User Info</Title>
                    </Body>
                    {/* <Right>
                        <Button transparent>
                            <Icon name='ios-checkmark' />
                        </Button>
                    </Right> */}
                </Header>

                <Content>
                    <Text>USER INFO</Text>
                </Content>
            </Container>

        )
    }

}
