import React, { Component } from 'react';
import { Text } from 'react-native';

import { Container, Content, List, ListItem, Thumbnail, Body } from 'native-base';

// import { Actions } from 'react-native-router-flux';

export default class CarElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data[0]
        }
    }

    render() {
        // let carElement = this.state.data.map(function (carData, index){
        //     alert(carData);
        //     <List>
        //         <ListItem>
        //             <Thumbnail square size={80} source={{ uri: 'Image URL' }} />
        //             <Body>
        //                 <Text>{carData.make}</Text>
        //                 <Text note>Its time to build a difference . .</Text>
        //             </Body>
        //         </ListItem>
        //     </List>
        // })
        return (
            <Container>
                <Content>
                    {this.state.data}
                </Content>
            </Container>
        );
    }
}
