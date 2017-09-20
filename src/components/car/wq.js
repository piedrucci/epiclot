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

         vin: this.props.vinInfo.vin.vin,
         newCar: this.props.vinInfo.newCar,
         mileage_type: (this.props.vinInfo.newCar)?mileageType[0].value:this.props.vinInfo.vin.mileage_type.toLowerCase(),
         color: (this.props.vinInfo.newCar)?color[0].value:this.props.vinInfo.vin.color.toLowerCase(),
         transmission:  (this.props.vinInfo.newCar)?transmission[0].value:this.props.vinInfo.vin.transmission.toLowerCase(),
         status: (this.props.vinInfo.newCar)?status[0].value:this.props.vinInfo.vin.status.toLowerCase(),
         images: props.vinInfo.images,
         imagesDeleted: props.vinInfo.deleted,

         mileage: (this.props.vinInfo.newCar)?'':this.props.vinInfo.vin.mileage,
         webprice: (this.props.vinInfo.newCar)?'':this.props.vinInfo.vin.webprice,
         purchase_price: '',
         sale_price: (this.props.vinInfo.newCar)?'':this.props.vinInfo.vin.sale_price,
         wholesale_price: (this.props.vinInfo.newCar)?'':this.props.vinInfo.vin.whosale_price,
         expense_date: ''
      }
      this.saveCar = this.saveCar.bind(this)
   }

   componentDidMount() {
      this.checkSession().done()
      Actions.refresh({ rightTitle: 'Save', onRight:()=>this.saveCar() })

      // si esta editando carro
      if (!this.props.vinInfo.newCar){
         this.checkImages()
         // console.log("=== imagenes excluidas ===");
         // console.log(this.props.vinInfo.deleted)
      }
   }

// metodo para incluir en el formData solo las imagenes nuevas que agrego el usuario
// esto solo aplica cuando esta editando carro.
   checkImages = async() => {
      let images = []
      await this.props.vinInfo.images.map( (image, index) => {
         let arrInfo = image.split('/')
         if ( arrInfo[0] !== "http:" ) {
            images.push(image)
         }
         return null
      } )
      this.setState({images: images})
      // console.log("=== imagenes nuevas ===");
      // console.log(this.state.images);
   }

   async checkSession() {
      const session = await AsyncStorage.getItem(api.getSessionName())
      this.setState({session: JSON.parse(session)})
   }

   async saveCar() {

      if (this.state.mileage==='') {
         alert('Enter the mileage')
      }else if (this.state.mileage_type==='') {
         alert('Enter the mileage type')
      }else if (this.state.color==='') {
         alert('Enter the color')
      }else if (this.state.transmission==='') {
         alert('Enter the transmission')
      }else if (this.state.status==='') {
         alert('Enter the status')
      }else if (this.state.webprice==='') {
         alert('Enter the web price')
      }else if (this.state.sale_price==='') {
         alert('Enter the sale price')
      }else if (this.state.expense_date==='' && this.state.newCar) {
         alert('Enter the expense date')
      }else{

         this.setState({isLoading:true})

         const fd = new FormData()

         const arrDate = this.state.expense_date.split("-")
         const jsonCarInfo = {
            newCar: this.state.newCar,
            vin: this.state.vin,

            user_id:this.state.session.user_id,
            id_user:this.state.session.user_id,
            delearship_id:this.state.session.dealership_id,
            subdomain:this.state.session.user_domain,

            mileage: this.state.mileage,
            mileage_type: this.state.mileage_type,
            color: this.state.color,
            transmission: this.state.transmission,
            status: this.state.status,
            purchase_price: this.state.purchase_price,
            // expense_date: "2017-01-01",
            expense_date: arrDate[2]+'-'+arrDate[0]+'-'+arrDate[1],
            web_price: this.state.webprice,
            sale_price: this.state.sale_price,
            wholesale_price: this.state.wholesale_price,
            imagesDeleted: this.state.imagesDeleted.join()
         }

         if ( this.state.newCar === false ) {
            delete jsonCarInfo.expense_date
            delete jsonCarInfo.wholesale_price
         }

         if (this.state.imagesDeleted.length === 0){
            delete jsonCarInfo.imagesDeleted
         }

         // AGREGA AL CADA VALOR DEL JSON AL FORMDATA
         for ( var key in jsonCarInfo ){
            var value = jsonCarInfo[key];
            fd.append(key, value)
         }

         let photo = {};

         // console.log(this.state.images);

         // agregar todas las imagenes al formData
         console.log(this.state.images);
         this.state.images.map( (image, index) => {
            photo = {
                  uri: image,
                  type: 'image/jpeg',
                  name: `${jsonCarInfo.vin}_${index}.jpg`,
               }
            fd.append(`image_${index}`, photo)
         } )
      // console.log(fd)

      try{
         // enviar el POST con toda la info(incluyendo imagenes) ....
         const response = await fetch(api.getApi_Url() + 'cars',{
            method: 'post',
            headers: {
               'Content-Type': 'multipart/form-data',
            },
            body: fd
         })

         // console.log(req)

         // status 200 para determinar si la peticion tuvo exito!.
         if (response.status === 200 ) {
            console.log("Car Saved, statusCode: "+response.status)
            Actions.home2({refreshData: true})
         }
         console.log(`status code: ${response.status}`)

      }catch(err) {
         console.log(err)
         alert(err)
      }finally{
         Actions.home2()
      }

   }

}

   render() {
      moment.locale('en');
      // const currentDate = moment(new Date()).format("YYYY-MM-DD")
      const currentDate = moment().format("MM-DD-YYYY").toString()
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
                          value={this.state.mileage}
                       />
                    </Item>

                    <View style={[styles.viewMargins, styles.viewContainer]}>
                       <Text>Mileage Type</Text>
                       <Picker
                          style={{marginTop:-15}}
                          iosHeader="Mileage Type"
                          mode="dialog"
                          selectedValue={this.state.mileage_type.toLowerCase()}
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
                          selectedValue={this.state.color.toLowerCase()}
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
                          selectedValue={this.state.transmission.toLowerCase()}
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
                          selectedValue={this.state.status.toLowerCase()}
                          onValueChange={(value)=>this.setState({status: value})}
                       >
                          {status.map( (item, i) => <Picker.Item key={i} label={item.label} value={item.value} /> )}
                       </Picker>
                    </View>

                    {this.state.newCar?

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
                    :null}

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

                    {this.state.newCar?
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
                 :null}


                  {this.state.newCar?
                    <Item >
                       <Icon name='ios-cash-outline' />
                       <Input
                          maxLength = {12}
                          keyboardType='numeric'
                          //   style={{width:300}}
                          returnKeyType='next'
                          placeholder='Whosale Price'
                          onChangeText={ (text) => this.setState( {wholesale_price:text} ) }
                          // onSubmitEditing = { () => this.emailInput.focus() }
                          value={this.state.whosale_price}
                       />
                    </Item>
                 :null}

                 {this.state.newCar?
                    <DatePicker
                       style={styles.dPicker}
                       date={this.state.expense_date}
                       mode="date"
                       placeholder="Expense Date"
                       format="MM-DD-YYYY"
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
                       onDateChange={(date) => {this.setState({expense_date: date})}}
                    />
                    :null}

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
