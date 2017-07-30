import React, { Component } from 'react';
import { Header, Body, Title, Left, Right, Button, Icon, Text } from 'native-base';

import { Actions } from 'react-native-router-flux';

// import DashboardSearchBar from './searchBar';

export default class DashboardHeader extends Component {

    createCar() {
        try{
            Actions.createCar()
        }catch(err){
            alert(err)
        }
    }

    render() {

        return (
                // <Header >
                //     <Left>
                //         <Button transparent onPress={() => Actions.pop({parent: 'login'})}>
                //         <Icon name='ios-log-out-outline' />
                //         {/* <Text>Logout</Text> */}
                //         </Button>
                //     </Left>
                //     <Body>
                //         <Title style={{textAlign:'center'}}>Home</Title>
                //     </Body>
                //     <Right>
                //         <Button transparent onPress={() => this.createCar()}>
                //             <Icon name='ios-add' />
                //         </Button>
                //     </Right>
                // </Header>
                {/* <DashboardSearchBar /> */}

        );

    }

}
