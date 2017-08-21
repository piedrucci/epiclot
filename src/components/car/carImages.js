import React, { Component } from 'react';
import { View, Image, Dimensions, StyleSheet, Text } from 'react-native'


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

   render() {
      const items = this.state.images.length

      const elements = this.state.images.map( (image, index) =>
         <Image
            key={index}
            style={styles.imageStyle}
            source={{uri: image}}
         />
      )

      return (
         <View style={styles.imageContainer}>
            {(items>0) ?elements:
               <View style={{marginTop:containerMarginTop}}>
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
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
   },
   imageStyle: {
      width: imageWidth,
      height: imageWidth,
      margin: 5
   },
});

export default ImageElement
