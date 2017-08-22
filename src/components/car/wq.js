import React, { Component } from 'react'
import { View, Text, AsyncStorage } from 'react-native'
import { Container, Content, Spinner, Icon, Input, Item, Picker, Form, Footer, Button } from 'native-base'
import styles from './carStyles';
import DatePicker from 'react-native-datepicker'
import { Actions } from 'react-native-router-flux';
import api from '../../utilities/api';
import moment from 'moment'


// ELEMENTOS PARA LLENAR LOS PICKERS
import { mileageType, color, transmission, status } from './pickerOptions'

class FormCar extends Component{
   constructor(props) {
      super(props)
      this.state = {
         isLoading: false,

         vin: this.props.vinInfo.vin,
         mileage_type: mileageType[0].value,
         color: color[0].value,
         transmission: transmission[0].value,
         status: status[0].value,
         images: props.vinInfo.images,

         mileage: '',
         purchase_price: '',
         webprice: '',
         sale_price: '',
         whosale_price: '',
      }
      this.saveCar = this.saveCar.bind(this)
   }

   componentDidMount() {
      this.checkSession().done()
      Actions.refresh({ rightTitle: 'Save', onRight:()=>this.saveCar() })
   }

   async checkSession() {
      const session = await AsyncStorage.getItem(api.getSessionName())
      this.setState({session: JSON.parse(session)})
   }

   async saveCar() {
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

      // AGREGA AL CADA VALOR DEL JSON AL FORMDATA
      for ( var key in jsonCarInfo ){
         var value = jsonCarInfo[key];
         fd.append(key, value)
      }

      let photo = {};

      this.state.images.map( (image, index) => {
         // photo = {
         //     uri: image,
         //     type: 'image/jpeg',
         //     name: jsonCarInfo.vin + '_' + index,
         // }
         // fd.append('image_'+index, photo)
         // // return null
            fd.append(index,{ uri: image,type: 'image/jpeg', name: index.toString() + 'appPhoto.jpg'})
         }
       )
      //  console.log(fd)

      const response = await fetch(api.getApi_Url() + 'cars',{
      // fetch(api.getApi_Url() + 'cars',{
         method: 'post',
         headers: {
            'Content-Type': 'multipart/form-data',
         },
         body: fd
      })

      if (response.status === 200 ) {
         console.log("Car Saved, statusCode: "+response.status)
         Actions.home2()
      }

   }

   render() {
      moment.locale('en');
      // const currentDate = moment(new Date()).format("YYYY-MM-DD")
      const currentDate = moment().format("YYYY-MM-DD").toString()
      // console.log(`------> ${currentDate}`)
      return (
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
                          onChangeText={ (text) => this.setState( {mileage:text} ) }
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


             {/* <Footer>
                <Button primary
                   style={styles.buttonNext}
                  onPress = {this.saveCar}
                  >
                     <Text style={styles.titleButtonNext}>Save</Text>
                     <Icon style={styles.titleButtonNext} name='ios-checkmark-outline' />
               </Button>
            </Footer> */}

         </Container>
      )
   }
}

export default FormCar
