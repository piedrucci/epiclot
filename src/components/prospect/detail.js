import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, Text, ScrollView, Platform } from 'react-native';

import FitImage from 'react-native-fit-image';

import { Container, Header, Content, Icon, Left, Right, Button,
    Body, Title, Footer, FooterTab, List, ListItem, Thumbnail,
    Item, Input, Form, Label, Spinner, InputGroup } from 'native-base';

import { Actions } from 'react-native-router-flux';

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


class ProspectDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            prospect: this.props.prospect,
            loading: false
        }
        this.editInfo = this.editInfo.bind(this)
    }

    componentDidMount() {
      Actions.refresh({
         // title: 'Add Prospect',
         rightTitle: 'Edit',
         onRight:()=>this.editInfo()
      })
    }

    editInfo = () => {
      Actions.createObject({prospect: this.state.prospect, isNew: false})
   }

    render({ prospect } = this.props) {
        const {
            firstname, lastname, address, zipcode, city, state, cellphone, emailaddress,
            sex, birthday, license, licensestate,
            license_issued, license_expiration, license_height} = prospect;

        return(

            // <Container style={{marginTop:mTop}}>
            <Container style={styles.container}>

                <Content>

                    <Text style={{fontWeight:'bold', textAlign:'center', fontSize:24}}>{firstname} {lastname}</Text>

                    <ScrollView>
                        <List style={{marginTop: 15}}>

                          <ListItem itemDivider>
                              <Text>Contact</Text>
                          </ListItem>

                            <ListItem>
                                <Text style={styles.label}>Address:   </Text><Text>{address}</Text>
                            </ListItem>
                            <ListItem >
                                <Text style={styles.label}>Zipcode:   </Text><Text>{zipcode}</Text>
                            </ListItem>
                            <ListItem>
                                <Text style={styles.label}>City:   </Text><Text>{city}</Text>
                            </ListItem>
                            <ListItem>
                                <Text style={styles.label}>State:   </Text><Text>{state}</Text>
                            </ListItem>
                            <ListItem>
                                <Text style={styles.label}>Cell Phone:   </Text><Text>{cellphone}</Text>
                            </ListItem>
                            <ListItem>
                                <Text style={styles.label}>Email:   </Text><Text>{emailaddress}</Text>
                            </ListItem>
                            {/* <ListItem>
                                <Text style={styles.label}>Sex:   </Text><Text>{sex}</Text>
                            </ListItem> */}

                            <ListItem itemDivider>
                                <Text>license</Text>
                            </ListItem>
                            <ListItem>
                                <Text style={styles.label}>Birth Day:   </Text><Text>{birthday}</Text>
                            </ListItem>
                            <ListItem>
                                <Text style={styles.label}>License Number:   </Text><Text>{license}</Text>
                            </ListItem>
                            <ListItem>
                                <Text style={styles.label}>L.State:   </Text><Text>{licensestate}</Text>
                            </ListItem>
                            <ListItem>
                                <Text style={styles.label}>Issued:   </Text><Text>{license_issued}</Text>
                            </ListItem>
                            <ListItem>
                                <Text style={styles.label}>Expiration:   </Text><Text>{license_expiration}</Text>
                            </ListItem>
                            {/* <ListItem>
                                <Text style={styles.label}>Height:   </Text><Text>{license_height}</Text>
                            </ListItem> */}
                        </List>

                    </ScrollView>

                </Content>
            </Container>

        )
    }

}

// const mapStateToProps = (state) => {
//     return {
//         appGlobalParams: state.appParams,
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         loadCar: (t) => dispatch( CarActions.loadCar(t) ),
//     };
// };

// export default connect(null, mapDispatchToProps)(Cars)
export default ProspectDetail