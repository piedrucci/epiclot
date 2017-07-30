import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, Text, ScrollView, Platform } from 'react-native';

import FitImage from 'react-native-fit-image';

import { Container, Header, Content, Icon, Left, Right, Button,
    Body, Title, Footer, FooterTab, List, ListItem, Thumbnail,
    Item, Input, Form, Label, Spinner, InputGroup } from 'native-base';

import { Actions } from 'react-native-router-flux';

import { FormattedNumber, FormattedCurrency } from 'react-native-globalize';

import PhotoSwiper from './photoSwiper';

const arr = [];

const mTop = (Platform.OS === 'ios') ? 66 : 56;

const styles = {
    label: {
        fontWeight: 'bold'
    },
    container: {
        marginTop: mTop
    }
}


export default class CarDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            car: this.props.car,
            photos: [],
            carAttributes: [],
            loading: false
        }
    }

    componentDidMount() {
        // for (let k of Object.keys(this.state.car)) {
            // strMap.set(k, obj[k]);
            // arr.push( {k:k, v:this.state.car[k]} );
            // this.setState({carAttributes:[...this.state.carAttributes, k ]});
            // console.log(k );
            // console.log( car[k] );
        // }
        // this.setState({carAttributes: JSON.stringify(arr)});
        // alert(this.state.carAttributes);
        // alert(arr);
    }

    render({ car } = this.props) {
        const {
            vin, subdomain, make, model, year, photo, condition, style,
            transmission, engine_size, cylinder, fuel_type,
            color, mileage, status, webprice
        } = car;

        const slides = this.state.photos.map((entry, index) => {
            return (
                <View key={`entry.photo-${index}`} style={styles.container}>
                    <Image style={styles.image}  source={{uri:api.getUrlPhotoHost(entry.subdomain, entry.photo)}} />
                    <Text style={styles.title}>{ entry.photo }</Text>
                </View>
            );
        });

        return(

            // <Container style={{marginTop:mTop}}>
            <Container style={styles.container}>

                {/* <Header>
                    <Left>
                        <Button transparent onPress={ ()=> {Actions.pop()} }>
                            <Icon name='ios-arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Car Detail</Title>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name='ios-create-outline' />
                        </Button>
                    </Right>
                </Header> */}

                <Content>

                    <Text style={{fontWeight:'bold', textAlign:'center', fontSize:24}}>{make} {model}</Text>

                    <PhotoSwiper vin={vin} />

                    <ScrollView>
                        <List style={{marginTop: 15}}>

                            <ListItem itemDivider>
                                <Text style={styles.label}>VIN:   </Text><Text>{vin}</Text>
                            </ListItem>


                            <ListItem >
                                <Text style={styles.label}>Make:   </Text><Text>{make}</Text>
                            </ListItem>
                            <ListItem>
                                <Text style={styles.label}>Model:   </Text><Text>{model}</Text>
                            </ListItem>
                            <ListItem>
                                <Text style={styles.label}>Color:   </Text><Text>{color}</Text>
                            </ListItem>
                            <ListItem>
                                <Text style={styles.label}>Status:   </Text><Text>{status}</Text>
                            </ListItem>
                            <ListItem>
                                <Text style={styles.label}>Price:   </Text><FormattedCurrency value={parseFloat(webprice)} />
                            </ListItem>

                            <ListItem itemDivider>
                                <Text>B</Text>
                            </ListItem>
                            <ListItem>
                                <Text style={styles.label}>Year:   </Text><Text>{year}</Text>
                            </ListItem>
                            <ListItem>
                                <Text style={styles.label}>Condition:   </Text><Text>{condition}</Text>
                            </ListItem>
                            <ListItem>
                                <Text style={styles.label}>Style:   </Text><Text>{style}</Text>
                            </ListItem>
                            <ListItem itemDivider>
                                <Text>ENGINE</Text>
                            </ListItem>
                            <ListItem>
                                <Text style={styles.label}>Transmission:   </Text><Text>{transmission}</Text>
                            </ListItem>
                            <ListItem>
                                <Text style={styles.label}>Engine Size:   </Text><Text>{engine_size}</Text>
                            </ListItem>
                            <ListItem>
                                <Text style={styles.label}>Cylinder:   </Text><Text>{cylinder}</Text>
                            </ListItem>
                            <ListItem>
                                <Text style={styles.label}>Fuel Type:   </Text><Text>{fuel_type}</Text>
                            </ListItem>
                            <ListItem>
                                <Text style={styles.label}>Mileage:   </Text><FormattedNumber value={parseFloat(mileage)} />
                            </ListItem>
                        </List>

                    </ScrollView>

                </Content>
            </Container>

        )
    }

}
