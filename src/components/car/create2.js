import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Text, View } from 'react-native';

import { Container, Header, Content, Icon, Left, Right, Button,
    Body, Title, Footer, FooterTab, List, ListItem, Thumbnail,
    Item, Input, Form, Label, Spinner, InputGroup, Picker } from 'native-base';

import { Actions } from 'react-native-router-flux';

import styles from './carStyles';
import api from '../../utilities/api';

import DatePicker from 'react-native-datepicker'
import moment from 'moment'

import VinDetail from './vinDetails';

// ELEMENTOS PARA LLENAR LOS PICKERS
import { mileageType, color, transmission, status } from './pickerOptions'

class SS extends Component {

   constructor(props) {
      super(props)
      this.state = {
         session: {},
         mileage: '',
         date:"2016-05-15",

         vin: this.props.validVin,
         mileage_type: mileageType[0].value,
         color: color[0].value,
         transmission: transmission[0].value,
         status: status[0].value,
         purchase_price: '',
         webprice: '',
         sale_price: '',
         whosale_price: '',

         isLoading: false,
      }

      this.saveCar = this.saveCar.bind(this)

   }

   componentDidMount() {
      const response = api.getSession()
      response.then( (data) => {
         this.setState({session: JSON.parse(data)})
      } )
   }

   saveCar() {
      this.setState({isLoading:true})

      const fd = new FormData()

      const jsonCarInfo = {
         newCar: true,
         vin: this.state.vin,

         user_id:this.state.session.user_id,
         id_user:this.state.session.user_id,
         delearship_id:this.state.session.dealership_id,

         mileage: this.state.mileage,
         mileage_type: this.state.mileage_type,
         color: this.state.color,
         transmission: this.state.transmission,
         status: this.state.status,
         purchase_price: this.state.purchase_price,
         expense_date: "2017-01-01",
         web_price: this.state.webprice,
         sale_price: this.state.sale_price,
         wholesale_price: this.state.whosale_price
      }

      for ( var key in jsonCarInfo ){
         var value = jsonCarInfo[key];
         fd.append(key, value)
      }

      fetch(api.getApi_Url() + 'cars',{
         method: 'post',
         headers: {
            'Content-Type': 'multipart/form-data',
         },
         body: fd
      }).then(response => {
         console.log("Car Saved")
         // console.log(response)
         Actions.home()
      }).catch(err => {
         console.log(err)
      })


   }


    render() {
      moment.locale('en');
      // const currentDate = moment(new Date()).format("YYYY-MM-DD")
      const currentDate = moment().format("YYYY-MM-DD").toString()
      console.log(`------> ${currentDate}`)
        return(
         //   , flex:1, alignItems:'center', justifyContent:'center'
            <Container style={{marginTop:60 }}>

                <Content>

                   {this.state.isLoading ? <Spinner /> : null }

                    <Form >

                       <Item success={true}>
                          {/* <Label>Mileage1</Label> */}
                          <Icon name='ios-information-circle' />
                          <Input
                             maxLength = {12}
                             keyboardType='numeric'
                             returnKeyType='next'
                              placeholder='Mileage'
                           //   onChangeText={ (text) => this.setState( {mileage:text} ) }
                             // onSubmitEditing = { () => this.emailInput.focus() }
                           //   value={this.state.mileage}
                          />
                       </Item>

                       <View style={[styles.viewMargins, styles.viewContainer]}>
                          <Text>Mileage Type</Text>
                          <Picker
                             style={{marginTop:-15}}
                             iosHeader="Mileage Type"
                             mode="dialog"
                             selectedValue={this.state.mileage_type}
                             onValueChange={(value)=>this.setState({mileage_type: value})}
                          >
                             {mileageType.map( (item, i) => <Picker.Item key={i} label={item.label} value={item.value} /> )}
                          </Picker>
                       </View>

                       <View style={[styles.viewMargins, styles.viewContainer]}>
                          <Text>Color</Text>
                          <Picker
                             style={{marginTop:-15}}
                             iosHeader="Select Color"
                             mode="dialog"
                             selectedValue={this.state.color}
                             onValueChange={(value)=>this.setState({color: value})}
                          >
                             {color.map( (item, i) => <Picker.Item key={i} label={item.label} value={item.value} /> )}
                          </Picker>
                       </View>

                       <View style={[styles.viewMargins, styles.viewContainer]}>
                          <Text>Transmission</Text>
                          <Picker
                             style={{marginTop:-15}}
                             iosHeader="Select Transmission"
                             mode="dialog"
                             selectedValue={this.state.transmission}
                             onValueChange={(value)=>this.setState({transmission: value})}
                          >
                             {transmission.map( (item, i) => <Picker.Item key={i} label={item.label} value={item.value} /> )}
                          </Picker>
                       </View>

                       <View style={[styles.viewMargins, styles.viewContainer]}>
                          <Text>Status</Text>
                          <Picker
                             style={{marginTop:-15}}
                             iosHeader="Select Status"
                             mode="dialog"
                             selectedValue={this.state.status}
                             onValueChange={(value)=>this.setState({status: value})}
                          >
                             {status.map( (item, i) => <Picker.Item key={i} label={item.label} value={item.value} /> )}
                          </Picker>
                       </View>

                       <Item >
                          <Icon name='ios-cash-outline' />
                          <Input
                             maxLength = {12}
                             keyboardType='numeric'
                             //   style={{width:300}}
                             returnKeyType='next'
                             placeholder='Purchase Price'
                             onChangeText={ (text) => this.setState( {purchase_price:text} ) }
                             // onSubmitEditing = { () => this.emailInput.focus() }
                             value={this.state.purchase_price}
                          />
                       </Item>

                       <Item >
                          <Icon name='ios-cash-outline' />
                          <Input
                             maxLength = {12}
                             keyboardType='numeric'
                             //   style={{width:300}}
                             returnKeyType='next'
                             placeholder='Web Price'
                             onChangeText={ (text) => this.setState( {webprice:text} ) }
                             // onSubmitEditing = { () => this.emailInput.focus() }
                             value={this.state.webprice}
                          />
                       </Item>

                       <Item >
                          <Icon name='ios-cash-outline' />
                          <Input
                             maxLength = {12}
                             keyboardType='numeric'
                             //   style={{width:300}}
                             returnKeyType='next'
                             placeholder='Sale Price'
                             onChangeText={ (text) => this.setState( {sale_price:text} ) }
                             // onSubmitEditing = { () => this.emailInput.focus() }
                             value={this.state.sale_price}
                          />
                       </Item>

                       <Item >
                          <Icon name='ios-cash-outline' />
                          <Input
                             maxLength = {12}
                             keyboardType='numeric'
                             //   style={{width:300}}
                             returnKeyType='next'
                             placeholder='Whosale Price'
                             onChangeText={ (text) => this.setState( {whosale_price:text} ) }
                             // onSubmitEditing = { () => this.emailInput.focus() }
                             value={this.state.whosale_price}
                          />
                       </Item>

                       <DatePicker
                          style={styles.dPicker}
                          date={this.state.date}
                          mode="date"
                          placeholder="select date"
                          format="YYYY-MM-DD"
                          minDate ="2016-05-01"
                          maxDate ={currentDate}
                        //   maxDate ={Moment.format('YYYY-MM-DD')}
                          confirmBtnText="Confirm"
                          cancelBtnText="Cancel"
                          customStyles={{
                             dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                             },
                             dateInput: {
                                marginLeft: 36
                             }
                             // ... You can check the source to find the other keys.
                          }}
                          onDateChange={(date) => {this.setState({date: date})}}
                       />

                    </Form>

                    <Text style={{height:30}}/>


                </Content>


                <Footer>
                   <Button primary
                      style={styles.buttonNext}
                     onPress = {this.saveCar}
                     >
                        <Text style={styles.titleButtonNext}>Save</Text>
                        <Icon style={styles.titleButtonNext} name='ios-checkmark-outline' />
                  </Button>
               </Footer>

            </Container>

        )
    }

}

const mapStateToProps = (state) => {
    return {
      //   cars: state.cars,
        session: state.session,
    }
}

// const mapDispatchToProps = (dispatch) => {
//   return { carActions, sessionActions }
// }

// export default connect(mapStateToProps, sessionActions)(SS)
export default (SS)
