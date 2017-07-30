import React, { Component } from  'react';
import { Text, View, Image, Dimensions } from 'react-native';

import api from '../../utilities/api';

import Carousel from 'react-native-snap-carousel';

import FitImage from 'react-native-fit-image';

const { width, height } = Dimensions.get('window');

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

export default class PhotoSwiper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vin: this.props.vin,
            photos: [],
        }
    }

    componentDidMount() {
        this.getPhotos(this.state.vin);
    }

    async getPhotos(vin) {
        try{
            this.setState({loading:true});
            const response = await fetch(api.getApiUrlPhotosByVIN(vin))
            const json = await response.json()
            this.setState({photos: json});
        }catch(err){
            this.setState({loading: false});
            alert(err);
        }
    }

    render() {

        const slides = this.state.photos.map((entry, index) => {
            return (
                <View key={`entry.photo-${index}`} style={styles.container}>
                    <FitImage style={{width:width,height:180}} source={{uri:api.getUrlPhotoHost(entry.subdomain, entry.photo)}} />
                    {/* <Text style={styles.title}>{ entry.photo }</Text> */}
                </View>
            );
        });

        return (
            <Carousel
                ref={(carousel) => { this._carousel = carousel; }}
                sliderWidth={width}
                itemWidth={width}
                autoplay={true}
            >
                { slides }
            </Carousel>
        )
    }
}
