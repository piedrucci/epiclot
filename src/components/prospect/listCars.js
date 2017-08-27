import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, AsyncStorage, RefreshControl, FlatList } from 'react-native';
import { Container, Content, Spinner, ListItem, Body, CheckBox } from 'native-base';
import FitImage from 'react-native-fit-image';
import { Actions } from 'react-native-router-flux';
import api from '../../utilities/api';
import { FormattedCurrency } from 'react-native-globalize';

const listOfCars = []

// ===========================================
// import { connect } from 'react-redux';
// import * as appActions from '../../actions/appActions';
// ================================================

class Cars extends Component {

  constructor(props) {
      super(props);
      this.state = {
          error: false,
          cars: [],
          loading: true,
          refreshing: false,
          dealership_id: null,
      }
      this.handleRefresh = this.handleRefresh.bind(this)
  }

  componentDidMount() {
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
  }

  componentWillReceiveProps(nextProps) {
     this.findWord(nextProps.carFilter)
  }

// GET REQUEST PARA OBTENER LA LISTA COMPLETA DE CARROS DEL DEALER ACTUAL
  async fetchData(dealership_id) {
      try{
         const response = await api.getCars(dealership_id);
         const json = await response.json()
         this.setState({
            loading: false,
            cars: json,
            refreshing:false,
         })
         listOfCars = json;
      }catch(err){
         this.setState({
            loading: false,
            error: true,
            refreshing:false,
         });
         alert(err);
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

  handleRefresh() {
     this.setState({refreshing: true})
     this.fetchData(this.state.dealership_id).done()
 }

 render() {
    return (

      <Content>

         {
            this.state.loading
            ? <Spinner style={{marginTop:75}} />
            :
            <FlatList
               data={this.state.cars}
               keyExtractor={item => item.vin}
               refreshing={this.state.refreshing}
               onRefresh={this.handleRefresh}
               renderItem={({item}) =>
               <ListItem button onPress={()=>Actions.carDetail({car:item})} >
                  <FitImage style={styles.thumbnailCarImage} source={{uri: 'http://epiclot.com/dealer/accounts/'+item.subdomain+'/photos/'+item.photo}} />
                  <Body>
                     <Text style={styles.itemTitle}>{item.make} {item.model}</Text>

                     <Text note style={styles.itemDetail}>{item.year}</Text>
                     <Text note style={styles.itemDetail}>{item.condition}</Text>
                     <Text note style={styles.itemDetail}><FormattedCurrency value={parseFloat(item.webprice)} /></Text>
                  </Body>
               </ListItem>}
            />
         }

      </Content>
   );
}
}

const styles = StyleSheet.create({
  thumbnailCarImage: {
     borderRadius:10,
     width:90,
     height: 60
  },
  itemTitle:{
     fontWeight: 'bold',
     marginLeft: 10
  },
  itemDetail: {
     marginLeft: 10,
  },
});


// const mapStateToProps = (state) => {
//     return {
//         appGlobalParams: state.appParams,
//     }
// }
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         addTypeAction: (t) => dispatch(appActions.addType(t)),
//     };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Cars)
export default (Cars)
