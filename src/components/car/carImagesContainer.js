import React, { Component } from 'react'
import { Container, Header, Content, Footer, FooterTab, Button, Text, Icon } from 'native-base'
import ImagePicker from 'react-native-image-crop-picker'
import { Actions } from 'react-native-router-flux';
import ImageElement from './carImages'
import styles from './carStyles'


class CarImagesContainer extends Component {
   constructor(props) {
      super(props)
      this.state = {
         arrayImages: [],
         vinInfo: props.vinInfo
      }

      this.imagePicker = this.imagePicker.bind(this)
      this.selectFromCamera = this.selectFromCamera.bind(this)
      this.deleteImage = this.deleteImage.bind(this)
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
      const carInfo = this.state.vinInfo
      carInfo.images = this.state.arrayImages
      // console.log(carInfo)
      // Actions.createCar2({vinInfo: this.state.vinInfo})
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
      this.setState({
         arrayImages: this.state.arrayImages.filter(function(img){
            return img !== val
         })
      });
      // console.log(this.state.arrayImages.length)
      const buttonTitle = (this.state.arrayImages.length>1) ? 'Next' : ''

      Actions.refresh({ rightTicdtle: buttonTitle, onRight:()=>this.nextStep() })
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
