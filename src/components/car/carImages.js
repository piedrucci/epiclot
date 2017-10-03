import React, { Component } from 'react';
import { View, Image, Dimensions, StyleSheet, Text, TouchableHighlight } from 'react-native'


const window = Dimensions.get('window')
const imageWidth = window.width / 2
const containerMarginTop = (window.height / 2) / 2

class ImageElement extends Component {
   constructor(props) {
      super(props)
      this.state = {
         images: props.images
      }
   }

   componentDidMount() {
   }

   componentWillReceiveProps(nextProps) {
      this.setState({images:nextProps.images})
   }

   showImages() {

   }

   deleteImage(val) {
      this.setState({
         images: this.state.images.filter(function(img){
            return img !== val
         })
      });
      this.props.removeImage(val)
   }

   render() {
      const items = this.state.images.length

      const elements = this.state.images.map( (image, index) =>
         // <Image
         //    key={index}
         //    style={styles.imageStyle}
         //    source={{uri: image}}
         // />
         < Image source = {{uri: image}}
            key={index}
            style={styles.imageStyle}
            ref = {component => this._imageDelete = component} >
            < TouchableHighlight underlayColor = "#ffa456"
               onPress = {this.deleteImage.bind(this, image)}
               style = {{ backgroundColor: '#fff'}} >
               < Text style = {styles.deleteImage} > x < /Text>
            </TouchableHighlight >
         < /Image>
      )

      return (
         <View style={(items>0)?styles.imageContainer:styles.emptyImageContainer}>
            {(items>0) ?elements:
               <View style={styles.emptyImageContainer}>
                  <Image
                     style={{width:128, height:128}}
                     source={require('./../../assets/img/if_icon-images_211678.png')}
                  />
                  <Text>No images added ...</Text>
               </View>
            }
      </View>
      )
   }
}

const styles = StyleSheet.create({
   imageContainer: {
      flex:1,
      flexDirection: 'row',
      flexWrap: 'wrap',
   },
   emptyImageContainer: {
      flex:1,
      // flexDirection: 'column',
      alignItems: 'center',
      marginTop:containerMarginTop,
   },
   imageStyle: {
      width: imageWidth-10,
      height: imageWidth-10,
      margin: 5
   },
});

export default ImageElement
