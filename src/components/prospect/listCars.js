import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, AsyncStorage, RefreshControl, FlatList,
   Image, Platform, Alert, AlertIOS, Dimensions, View } from 'react-native';
import { Container, Content, Spinner, ListItem, Body, CheckBox } from 'native-base';
import FitImage from 'react-native-fit-image';
import { Actions } from 'react-native-router-flux';
import api from '../../utilities/api';
import { FormattedCurrency } from 'react-native-globalize';

const listOfCars = []

const window = Dimensions.get('window')
const imageWidth = window.width
const imageMarginTop = (window.height / 2) / 2

// ===========================================
import { connect } from 'react-redux';
import * as CarActions from '../../actions/carActions';
// ================================================

class Cars extends Component {

  constructor(props) {
      super(props);
      this.state = {
          error: false,
          cars: props.data || [],
          loading: false,
          dealership_id: null,
          refreshData: props.refreshData
      }
      this.handleRefresh = this.handleRefresh.bind(this)
      this.showDetail = this.showDetail.bind(this)
  }

  componentDidMount() {
   //   this.refreshData()
  }

  componentWillReceiveProps(nextProps) {
   this.setState({loading:false})
   if (typeof nextProps.data !== 'undefined'){
      this.setState({cars: nextProps.data})
   }
   //   para filtrar una busqueda
   //   this.findWord(nextProps.carFilter)
   // this.refreshData()
  }

  refreshData = () => {
     try{
       let _info = '';

       _info = AsyncStorage.getItem(api.getSessionName())
       .then( (value) => { return JSON.parse(value) || null; } )
       .then( (JSON_Value) => {
          // console.log(JSON_Value);
          if ( null !== JSON_Value ) {
             this.setState({dealership_id:JSON_Value.dealership_id})
             this.fetchData(JSON_Value.dealership_id).done()
          } else if ( null === JSON_Value ) {
             this.setState({loading:false});
             alert('Empty data');
          }
      } )
     }catch(err){
        alert(`Coñoooo\n${err}\nrefreshData listCar`)
       alert(err)
       console.log(err)
     }
 }

// GET REQUEST PARA OBTENER LA LISTA COMPLETA DE CARROS DEL DEALER ACTUAL
  async fetchData(dealership_id) {
      try{
         // console.log('actualizando lista de carros');
         const response = await api.getCars(dealership_id);
         const json = await response.json()
         let showResults = (typeof json.success === 'undefined')

         if (showResults){
            this.setState({
               loading: false,
               cars: json,
               refreshing:false,
            })
            listOfCars = json;
         }else{
            this.setState({
               loading: false,
               refreshing:false,
            })
            // alert(json.message)
            console.log(json.message)
         }
      }catch(err){
         alert(`${err}\nfetchData listCar`)
         this.setState({
            loading: false,
            error: true,
            refreshing:false,
         });

         // Actions.refresh({ rightTitle: '+', onRight:()=> false })

      }
  }

  findWord(word) {
     try{
        const newData = listOfCars.filter( (item) => {
           const itemData = item.make.toLowerCase();
           const itemData2 = item.model.toLowerCase();
           const textData  = word.trim().toLowerCase();
           return (itemData.indexOf(textData) > -1) || (itemData2.indexOf(textData) > -1)
        } );
        // console.log(newData);
        this.setState({cars:newData});
     }catch(err) {
        alert(err)
     }
  }

  handleRefresh = async() => {
   //   this.setState({refreshing: true})
     await this.fetchData(this.state.dealership_id)
 }

 showDetail = (item) => {
   //  let carData = item
   //  carData.
    this.props.initializeCar({newCar:false, car:{vin:'', details:''}})
    this.props.loadCar(item)
    Actions.carDetail()
 }

 render() {
    return (

      <Content>
         {
            this.state.loading
            ? <Spinner style={{marginTop:75}} />
            :

            this.state.cars.length>0?
            <FlatList
               data={this.state.cars}
               keyExtractor={item => item.vin}
               renderItem={({item}) =>
               <ListItem button onPress={()=> this.showDetail(item) } >
                  <FitImage style={styles.thumbnailCarImage} source={{uri: 'http://epiclot.com/dealer/accounts/'+item.subdomain+'/photos/'+item.photo}} />
                  <Body>
                     <Text style={styles.itemTitle}>{item.make} {item.model}</Text>

                     <Text note style={styles.itemDetail}>{item.year}</Text>
                     <Text note style={styles.itemDetail}>{item.condition}</Text>
                     <Text note style={styles.itemDetail}><FormattedCurrency value={parseFloat(item.webprice)} /></Text>
                  </Body>
               </ListItem>}
            />
             :
            <View style={styles.emptyImageContainer}>
               <Image
                  style={{width: imageWidth-20, height: imageWidth-20, marginTop: imageMarginTop/2}}
                  source={{uri: 'http://epiclot.com/img/app_logo2.jpg'}}
               />
               {/* <Image
                  style={{width: imageWidth-20, height: imageWidth-20, marginTop: imageMarginTop/2}}
                  source={require('../../assets/img/epiclot_waterMark.png')}
               /> */}
            </View>
         }


      </Content>
   );
}
}

const styles = StyleSheet.create({
  thumbnailCarImage: {
     width:90,
     height: 60,
   // flex: 1,
   //  width: null,
   //  height: null,
   //  resizeMode: 'contain',
    borderRadius:10,
  },
  itemTitle:{
     fontWeight: 'bold',
     marginLeft: 10
  },
  itemDetail: {
     marginLeft: 10,
  },
  emptyImageContainer: {
     flex:1,
     // flexDirection: 'column',
     alignItems: 'center',
   //   marginTop:containerMarginTop,
  },
  imageStyle: {
     width: imageWidth-10,
     height: imageWidth-10,
     margin: 5
  },
});


const mapStateToProps = (state) => {
    return {
        GlobalParams: state.appParams,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadCar: (t) => dispatch( CarActions.loadCar(t) ),
        initializeCar: (vin) => dispatch(CarActions.initializeCar(vin)),
    };
};

export default connect(null, mapDispatchToProps)(Cars)
