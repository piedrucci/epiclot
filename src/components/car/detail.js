import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, ScrollView, Platform } from 'react-native';
import FitImage from 'react-native-fit-image';
import { Container, Header, Content, Icon, Left, Right, Button,
    Body, Title, Footer, FooterTab, List, ListItem, Thumbnail,
    Item, Input, Form, Label, Spinner, InputGroup } from 'native-base';
import { FormattedNumber, FormattedCurrency } from 'react-native-globalize';
import PhotoSwiper from './photoSwiper';
const mTop = (Platform.OS === 'ios') ? 66 : 56;
import { Actions } from 'react-native-router-flux';

const styles = {
    label: {
        fontWeight: 'bold'
    },
    container: {
        marginTop: mTop
    }
}

// ===========================================
import { connect } from 'react-redux';
import * as CarActions from '../../actions/carActions';
// ================================================

class CarDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // car: this.props.car,
            // car: this.props.CarInfo,
            photos: [],
            carAttributes: [],
            loading: false
        }
    }

    componentDidMount() {
      Actions.refresh({
         // title: 'Add Prospect',
         rightTitle: 'Edit',
         onRight:()=>this.editInfo()
      })
    }

    editInfo = () => {
      Actions.carImages({vinInfo: this.props.car, newCar: false})
   }

    render({ CarInfo } = this.props) {
        const {
            vin, subdomain, make, model, year, photo, condition, style,
            transmission, engine_size, cylinder, fuel_type,
            color, mileage, mileage_type, status, webprice
        } = CarInfo.car;

        return(

            <Container style={styles.container}>

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
                            <ListItem>
                                <Text style={styles.label}>Mileage Type:   </Text><Text>{mileage_type}</Text>
                            </ListItem>
                        </List>

                    </ScrollView>

                </Content>
            </Container>

        )
    }

}

const mapStateToProps = (state) => {
    return {
        CarInfo: state.carInfo,
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         loadCar: (t) => dispatch( CarActions.loadCar(t) ),
//     };
// };

export default connect(mapStateToProps, null)(CarDetail)
