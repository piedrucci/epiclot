import React, { Component } from 'react'
import {AsyncStorage} from 'react-native'
import { Container, Header, Content, Footer, FooterTab, Button, Text, Icon } from 'native-base'
import ImagePicker from 'react-native-image-crop-picker'
import { Actions } from 'react-native-router-flux';
import ImageElement from './carImages'
import api from '../../utilities/api'
import styles from './carStyles'


class CarImagesContainer extends Component {
   constructor(props) {
      super(props)
      this.state = {
         arrayImages: [],
         vinInfo: props.vinInfo,
         newCar: props.newCar,
         dealership_id: null,
         nameImages: [],
         imagesDeleted: []
      }
      this.imagePicker = this.imagePicker.bind(this)
      this.selectFromCamera = this.selectFromCamera.bind(this)
      this.deleteImage = this.deleteImage.bind(this)
   }

   componentDidMount() {
      if (this.state.newCar===false) {
         this.checkSession().done()
         this.getPhotos(this.state.vinInfo.vin)
      }
   }

   async checkSession() {
      const response = await AsyncStorage.getItem(api.getSessionName())
      const json = JSON.parse(response)
      if ( null !== json ) {
         this.setState({dealership_id:json.dealership_id})
      } else if ( null === json ) {
         alert('Empty data');
      }
   }


   // carga las rutas de las fotos asociadas al vin...
    async getPhotos(vin) {
        try{
            const response = await fetch(api.getApiUrlPhotosByVIN(vin)+'/'+this.state.dealership_id)
            const json = await response.json()
            if (json.length>0){
               json.map(
                  (image, index)=>
                  this.setState({
                     arrayImages:[...this.state.arrayImages, api.getUrlPhotoHost(image.subdomain, image.photo) ],
                     nameImages:[...this.state.nameImages, image.photo],
                  })
               )
               this.renderSceneRightButton()
            }
        }catch(err){
            alert(err);
        }
    }

   async imagePicker() {
      try{
         const images = await ImagePicker.openPicker({multiple:true})
         // console.log(images)
         images.map( (image, index)=>this.setState({arrayImages:[...this.state.arrayImages, image.path ]}) )
         this.renderSceneRightButton()
      }catch(err) {
         this.errorHandle(err)
      }
   }

   async selectFromCamera() {
      try{
         const image = await ImagePicker.openCamera({})
         // console.log(image)
         this.setState({arrayImages:[...this.state.arrayImages, image.path ]})
         this.renderSceneRightButton()
      }catch(err) {
         this.errorHandle(err)
      }
   }

   errorHandle(err) {
      console.log('There has been a problem with your fetch operation: ' + err.message);
   }

   nextStep() {
      const carInfo = {
         newCar: this.state.newCar,
         vin: this.state.vinInfo,
         images: this.state.arrayImages,
         deleted: this.state.imagesDeleted,
      }
      // console.log(carInfo)
      Actions.formCar({vinInfo: carInfo})
   }

   renderSceneRightButton() {
      if (this.state.arrayImages.length>0){
         // const buttonNextCarImages = ()=><Icon name='ios-arrow-dropright' onPress={ () => this.nextStep() } />
         // Actions.refresh({renderRightButton: buttonNextCarImages})
         Actions.refresh({ rightTitle: 'Next', onRight:()=>this.nextStep() })
      }
   }

   deleteImage(val) {
      // console.log(`borrando ${val}`)

      // agregar al array la imagen que esta borrando para informarle al backend
      let arrInfo = val.split('/')
      if (arrInfo[0] === "http:"){
         this.setState({imagesDeleted:[...this.state.imagesDeleted, arrInfo[arrInfo.length-1] ]})
      }

      this.setState({
         arrayImages: this.state.arrayImages.filter(function(img){
            return img !== val
         })
      });
      // console.log(this.state.arrayImages.length)
      const buttonTitle = (this.state.arrayImages.length>1) ? 'Next' : ''

      Actions.refresh({ rightTitle: buttonTitle, onRight:()=>this.nextStep() })
   }



   render() {
      return (
         <Container style={[styles.container],{marginTop:64}}>
            <Content>
               <ImageElement images={this.state.arrayImages} removeImage={this.deleteImage} />
            </Content>

            <Footer>
               <FooterTab>
                  <Button
                     onPress = {this.imagePicker}
                     >
                     <Icon name='ios-images' />
                  </Button>
                  <Button
                     onPress = {this.selectFromCamera}
                     >
                     <Icon name='ios-camera' />
                  </Button>
               </FooterTab>
            </Footer>

         </Container>
      )
   }
}

export default CarImagesContainer
