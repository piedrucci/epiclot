import React, { Component } from  'react';
import { Text, View, Image, Dimensions, AsyncStorage } from 'react-native';
import api from '../../utilities/api';
import Carousel from 'react-native-snap-carousel';
import FitImage from 'react-native-fit-image';
const { width, height } = Dimensions.get('window');
const heightSwiper = Math.ceil( (35 * height) / 100 )

const entryBorderRadius = 8;

const styles = {
    container: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius
    },
    image: {
        flex: 1,
        width,
        // resizeMode: 'contain',
        height:180
    }
}

// ===========================================
import { connect } from 'react-redux';
import * as CarActions from '../../actions/carActions';
// ================================================

class PhotoSwiper extends Component {
    constructor(props) {
        super(props);
        this.state = {
           session: {},
            vin: props.vin,
            photos: [],
        }
    }


    componentDidMount() {
      api.checkSession().then(
         (res)=>{
            if ( null !== res ) {
               this.setState({session:res})
               this.getPhotos(this.state.vin)
            } else if ( null === res ) {
               this.setState({loading:false});
               alert('Empty data');
            }
         }
      )
    }


   // carga las rutas de las fotos asociadas al vin...
    async getPhotos(vin) {
        try{
            this.setState({loading:true})
            const response = await fetch(api.getApiUrlPhotosByVIN(vin)+'/'+this.state.session.dealership_id)
            const json = await response.json()

            let arrayImages = await json.map((entry) => {
                let pathImg = api.getUrlPhotoHost(entry.subdomain, entry.photo)
                return(pathImg)
            })
            this.props.setCarImages(arrayImages)

            await this.setState({photos: arrayImages});
        }catch(err){
            this.setState({loading: false});
            alert(`EXCEPTION IN GETPHOTOS ${err}`);
        }
    }

    render() {

        // const slides = this.state.photos.map((entry, index) => {
        //     return (
        //         <View key={`entry.photo-${index}`} style={styles.container}>
        //             <FitImage style={{width:width,height:180}} source={{uri:api.getUrlPhotoHost(entry.subdomain, entry.photo)}} />
        //         </View>
        //     );
        // });
// { slides }
        return (
            <Carousel
                ref={(carousel) => { this._carousel = carousel; }}
                sliderWidth={width}
                itemWidth={width}
                autoplay={true}
            >
            {

            this.state.photos.map((entry, index) => {
                // let pathImage = api.getUrlPhotoHost(entry.subdomain, entry.photo)
                // this.props.addImage(pathImage)
                // console.log(pathImage)
                return (
                    <View key={`photo-${index}`} style={styles.container}>
                        <FitImage style={{width:width,height:heightSwiper}} source={{uri:entry}} />
                    </View>
                );
            })}
            </Carousel>
        )
    }
}

// const mapStateToProps = (state) => {
//     return {
//         CarInfo: state.carInfo,
//     }
// }

const mapDispatchToProps = (dispatch) => {
    return {
        setCarImages: (t) => dispatch( CarActions.setCarImages(t) ),
    };
};

export default connect(null, mapDispatchToProps)(PhotoSwiper)
