import React, { Component } from 'react'
import { View, Text, AsyncStorage } from 'react-native'
import { Container, Content, Spinner, Icon, Input, Item, Picker, Form, Footer, Button } from 'native-base'
import styles from './carStyles';
import DatePicker from 'react-native-datepicker'
import { Actions } from 'react-native-router-flux';
import api from '../../utilities/api';
import moment from 'moment'

// ===========================================
import { connect } from 'react-redux';
import * as CarActions from '../../actions/carActions';
import * as appActions from '../../actions/appActions';
// ================================================

// ELEMENTOS PARA LLENAR LOS PICKERS
import { mileageType, color, transmission, status } from './pickerOptions'

class FormCar extends Component{
   constructor(props) {
      super(props)
      this.state = {
        isLoading: false,
        session: {},
        car: props.CarInfo,

        vin: this.props.CarInfo.car.vin,
        newCar: (this.props.CarInfo.newCar) || false,

        mileage: (props.CarInfo.car.mileage)?props.CarInfo.car.mileage:'',
        mileage_type: (props.CarInfo.car.mileage_type)?props.CarInfo.car.mileage_type:mileageType[0].value,
        color: (props.CarInfo.car.color)?props.CarInfo.car.color.toLowerCase():color[0].value,
        transmission: (props.CarInfo.car.transmission)?props.CarInfo.car.transmission.toLowerCase():transmission[0].value,
        status: (props.CarInfo.car.status)?props.CarInfo.car.status.toLowerCase():status[0].value,
        webprice: (props.CarInfo.car.webprice)?props.CarInfo.car.webprice:'',
        purchase_price: (props.CarInfo.car.purchase_price)?props.CarInfo.car.purchase_price:'',
        sale_price: (props.CarInfo.car.sale_price)?props.CarInfo.car.sale_price:'',
        wholesale_price: (props.CarInfo.car.wholesale_price)?props.CarInfo.car.wholesale_price:'',
        expense_date: (props.CarInfo.car.expense_date)?props.CarInfo.car.expense_date:'',
        images: props.CarInfo.images,
        imagesDeleted: props.CarInfo.deletedImages,
      }

      this.saveCar = this.saveCar.bind(this)

   }

   async componentDidMount() {
      this.prepareDeletedImageNames()
      if (typeof this.props.GlobalParams.session !== 'undefined'){
         // this.setState({ session: JSON.parse(this.props.GlobalParams.session) })
         this.setState({ session: this.props.GlobalParams.session })
         // console.log(this.props.GlobalParams.session)
      }else if (typeof this.props.GlobalParams.session === 'undefined'){

         console.log('WARNING --- SESSION INFO EMPTY ')
         const session = await AsyncStorage.getItem(api.getSessionName())
         // console.log(JSON.parse(session));
         await this.setState({session:JSON.parse(session)})
         this.props.StoreSession(session)
         // console.log(this.props)

      }
      Actions.refresh({ rightTitle: 'Done', onRight:()=>this.saveCar() })
   }



// metodo para incluir en el formData solo las imagenes nuevas que agrego el usuario (esto solo aplica cuando esta editando carro).
   prepareDeletedImageNames = async() => {
      let images = []
      this.props.CarInfo.deletedImages.map( (image, index) => {
         let arrInfo = image.split('/')
         images.push(arrInfo[arrInfo.length-1])
         return null
      } )
      await this.setState({imagesDeleted: images})
      // console.log(this.state.imagesDeleted);
      // this.props.SetListImgDeleted(images)
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
          Actions.refresh({ rightTitle: '', onRight:()=>this.saveCar() })
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
            expense_date: arrDate[2]+'-'+arrDate[0]+'-'+arrDate[1],
            web_price: this.state.webprice,
            sale_price: this.state.sale_price,
            details: this.props.CarInfo.car.details,
            wholesale_price: this.state.wholesale_price,
            imagesDeleted: this.state.imagesDeleted
         }

         if (typeof this.state.imagesDeleted !== 'undefined' && this.state.imagesDeleted.length>0 ){
            jsonCarInfo.imagesDeleted = this.state.imagesDeleted.join()
         }else if (typeof this.state.imagesDeleted === 'undefined' || this.state.imagesDeleted.length < 1){
            delete jsonCarInfo.imagesDeleted
         }

         if ( this.state.newCar === false ) {
            delete jsonCarInfo.expense_date
            // delete jsonCarInfo.wholesale_price
         }


         // AGREGA AL CADA VALOR DEL JSON AL FORMDATA
         for ( var key in jsonCarInfo ){
            var value = jsonCarInfo[key];
            fd.append(key, value)
         }

         let photo = {};

         // agregar todas las imagenes al formData
         let arrPath = []
         this.state.images.map( (image, index) => {

            // asegurarse de que no envar las que ya estan subidas...(omitirlas)
            arrPath = image.split(':')
            if (arrPath[0] !== 'http') {
               photo = {
                  uri: image,
                  type: 'image/jpeg',
                  name: `${jsonCarInfo.vin}_${index}.jpg`,
               }
               fd.append(`image_${index}`, photo)
            }
         } )

         // console.log(fd)

         // enviar el POST con toda la info(incluyendo imagenes) ....
         try{
            Actions.refresh({ rightTitle: '', onRight:()=>this.saveCar() })
            // const response = await fetch(api.getApi_Url() + 'cars',{
            //    method: 'post',
            //    headers: {
            //       'Content-Type': 'multipart/form-data',
            //    },
            //    body: fd
            // })
            // console.log(response);

            const response = fetch(api.getApi_Url() + 'cars',{
               method: 'post',
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
               body: fd
            }).then(response => {
                
                Actions.refresh({ rightTitle: 'Done', onRight:()=>this.saveCar() })
                return (response)
             }).then( json => {
               //  console.log(json)
                Actions.refresh({ rightTitle: 'Done', onRight:()=>this.saveCar() })
                Actions.home2({refreshData: true})
              }).catch(err => {
                console.log(err)
                Actions.refresh({ rightTitle: 'Done', onRight:()=>this.saveCar() })
                Actions.home2()
              })

            // status 200 para determinar si la peticion tuvo exito!.
            // if (response.status === 200 ) {
            //    console.log("Car Saved, statusCode: "+response.status)
            //    Actions.home2({refreshData: true})
            // }
            // console.log(`status code: ${response.status}`)

         }catch(err) {
            console.log(err)
            // alert(err)
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
                          maxLength = {6}
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
                          maxLength = {6}
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
                          maxLength = {6}
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
                          maxLength = {6}
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
                       minDate ="1950-01-01"
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


const mapStateToProps = (state) => {
    return {
        CarInfo: state.carInfo,
        GlobalParams: state.appParams,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        StoreSession: (s) => dispatch(appActions.setSession(s)),
        SetListImgDeleted: (s) => dispatch(CarActions.setListImagesDeleted(s)),
        initializeCar: (vin) => dispatch(CarActions.initializeCar(vin)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormCar)
