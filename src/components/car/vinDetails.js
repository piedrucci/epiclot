import React, { Component } from 'react'

import { Container, List, ListItem, Button, Footer } from 'native-base'

import { Platform, ScrollView, Text } from 'react-native'

import { Actions } from 'react-native-router-flux'

const mTop = (Platform.OS === 'ios') ? 66 : 56;

import { FormattedNumber, FormattedCurrency } from 'react-native-globalize';

const styles = {
    label: {
        fontWeight: 'bold'
    },
    container: {
        marginTop: mTop
    }
}

class VinDetail extends Component {

   // constructor() {
   //    super()
   //    this.state = {
   //       visible: false
   //    }
   // }

   render({ det } = this.props) {
      const {
          vin, make, model, year, bodyv, transmission, engine_size,
          cylinder, fuel_type, valid_vin, msg
      } = det;

      return (

         <Container>
            <List style={{flex:1}}>
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
                  <Text style={styles.label}>Year:   </Text><Text>{year}</Text>
               </ListItem>
               <ListItem>
                  <Text style={styles.label}>BodyV:   </Text><Text>{bodyv}</Text>
               </ListItem>


               <ListItem itemDivider>
                  <Text>ENGINE</Text>
               </ListItem>
               <ListItem>
                  <Text style={styles.label}>Fuel Type:   </Text><Text>{fuel_type}</Text>
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
            </List>

            <Button rounded block
               onPress = { () => Actions.createCar2() }
               >
                  <Text style={{color:'white', fontWeight:'bold', padding:20}}>Siguiente</Text>
            </Button>



         </Container>

      );
   }

}

export default VinDetail
