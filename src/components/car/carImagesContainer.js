import React, { Component } from 'react'
import {AsyncStorage} from 'react-native'
import { Container, Header, Content, Footer, FooterTab, Button, Text, Icon } from 'native-base'
import ImagePicker from 'react-native-image-crop-picker'
import { Actions } from 'react-native-router-flux';
import ImageElement from './carImages'
import api from '../../utilities/api'
import styles from './carStyles'
import Camera from 'react-native-camera';
import ImageResizer from 'react-native-image-resizer'



// ===========================================
import { connect } from 'react-redux';
import * as CarActions from '../../actions/carActions';
// ================================================


class CarImagesContainer extends Component {
   constructor(props) {
      super(props)
      this.state = {
         arrayImages: props.CarInfo.images || [],
         deletedImages: [],
      }
      //   this.selectFromCamera = this.selectFromCamera.bind(this)
      this.imagePicker = this.imagePicker.bind(this)
      this.deleteImage = this.deleteImage.bind(this)
      this.showCamera = this.showCamera.bind(this)
   }

   async componentDidMount() {
      // console.log(this.props.CarInfo.car)
      this.renderSceneRightButton()
   }


   async imagePicker() {
      try{
         const images = await ImagePicker.openPicker({multiple:false})
         // console.log(images)
        //  images.map( (image, index)=>this.setState({arrayImages:[...this.state.arrayImages, image.path ]}) )

        ImageResizer.createResizedImage(images.path, 600, 400, 'JPEG', 70).then(async(image) => {
          // response.uri is the URI of the new image that can now be displayed, uploaded...
          // response.path is the path of the new image
          // response.name is the name of the new image with the extension
          // response.size is the size of the new image
         //  console.log(image.size)
           this.props.addImage(images.path)
           await this.setState({ arrayImages: this.props.CarInfo.images })
           this.renderSceneRightButton()
        }).catch((err) => {
           console.log(err)
           this.renderSceneRightButton()
          // Oops, something went wrong. Check that the filename is correct and
          // inspect err to get more details.
        });


      }catch(err) {
         this.errorHandle(err)
      }
   }

//    async selectFromCamera() {
//       try{
//          const image = await ImagePicker.openCamera({})
//          this.setState({arrayImages:[...this.state.arrayImages, image.path ]})
//          this.renderSceneRightButton()
//       }catch(err) {
//          this.errorHandle(err)
//       }
//    }


   errorHandle(err) {
      // console.log('There has been a problem with your fetch operation: ' + err.message);
      console.log(`EXCEPTION ON IMAGE PICKER ${err}`);
   }


   showCamera () {
      //  Actions.cameraApp({vinInfo: this.state.vinInfo, newCar: this.state.newCar})
       Actions.cameraApp()
   }


   nextStep() {
      // const carInfo = {
      //    newCar: this.state.newCar,
      //    vin: this.state.vinInfo,
      //    images: this.state.arrayImages,
      //    deleted: this.state.deletedImages,
      // }
      // console.log(carInfo)
      // Actions.formCar({vinInfo: carInfo})
      Actions.formCar()
   }

   renderSceneRightButton() {
      // console.log(`HAY ${this.props.CarInfo.images.length} IMAGENES`)
      let buttonTitle = ''
      if (this.props.CarInfo.images.length>0){
         buttonTitle = 'Next'
      }

      // if (this.state.arrayImages.length>0){
      if (buttonTitle.length>0){
         // const buttonNextCarImages = ()=><Icon name='ios-arrow-dropright' onPress={ () => this.nextStep() } />
         // Actions.refresh({renderRightButton: buttonNextCarImages})
         Actions.refresh({ rightTitle: buttonTitle, onRight:()=>this.nextStep() })
      }
      // console.log("=====IMAGENES ACTUALES====")
      // console.log(this.props.CarInfo.images)
      // console.log("=====IMAGENES BORRADAS====")
      // console.log(this.props.CarInfo.deletedImages)
   }

   async deleteImage(val) {
      // agregar al array de ImagenesBorradas la imagen que esta borrando para informarle al backend
      let arrInfo = val.split('/')
      if (arrInfo[0] === "http:"){
         // lo agrega al array de imagenes borradas en el store
         await this.props.removeUpldImage(val)
         await this.setState({ deletedImages: this.props.CarInfo.deletedImages })
      }

      await this.props.removeImage(val)
      await this.setState({ arrayImages: this.props.CarInfo.images })

      // const buttonTitle = (this.state.arrayImages.length>0) ? 'Next' : ''
      // Actions.refresh({ rightTitle: buttonTitle, onRight:()=>this.nextStep() })

      this.renderSceneRightButton()

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
                    //  onPress = {this.selectFromCamera}
                     onPress = {this.showCamera}
                     >
                     <Icon name='ios-camera' />
                  </Button>
               </FooterTab>
            </Footer>

         </Container>
      )
   }
}


const mapStateToProps = (state) => {
    return {
        CarInfo: state.carInfo,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addImage: (pathImage) => dispatch(CarActions.addCarImage(pathImage)),
        removeImage: (imageName) => dispatch(CarActions.removeCarImage(imageName)),
        removeUpldImage: (imageName) => dispatch(CarActions.removeUploadedCarImage(imageName)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarImagesContainer)
