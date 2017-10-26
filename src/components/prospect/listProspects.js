import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, AsyncStorage, Dimensions,
   RefreshControl, FlatList, View, Image } from 'react-native';
import { Container, Content, Spinner, ListItem, Body, CheckBox, Left, Thumbnail } from 'native-base';
import FitImage from 'react-native-fit-image';
import { Actions } from 'react-native-router-flux';
import api from '../../utilities/api';
import { FormattedCurrency } from 'react-native-globalize';

const listOfProspects = []

const window = Dimensions.get('window')
const imageWidth = window.width
const imageMarginTop = (window.height / 2) / 2

// ===========================================
import { connect } from 'react-redux';
import * as ProspectActions from '../../actions/prospectActions';
// ================================================

class Prospect extends Component {

  constructor(props) {
      super(props);
      this.state = {
          error: false,
          prospects: props.data || [],
          loading: true,
          refreshData: props.refreshData
      }
      this.handleRefresh = this.handleRefresh.bind(this)
      this.showDetail = this.showDetail.bind(this)
  }

  componentDidMount() {
     //this.props.initializeProspect({newProspect:true, prospect:{license:''}})
  }


  async checkSession() {
     const response = await AsyncStorage.getItem(api.getSessionName())
     const json = JSON.parse(response)
      if ( null !== json ) {
         this.setState({dealership_id:json.dealership_id})
          this.fetchData(json.dealership_id)
      } else if ( null === json ) {
          this.setState({loading:false});
          alert('Empty data');
      }
 }

  componentWillReceiveProps(nextProps) {
   //   this.findWord(nextProps.prospectFilter)
      this.checkSession()
  }

// GET REQUEST PARA OBTENER LA LISTA COMPLETA DE PROSPECTOS DEL DEALER ACTUAL
  async fetchData(dealership_id) {
      try{
         const response = await api.getProspects(dealership_id)
         // if ( response.status === 500 )
         const json = await response.json()

         let showResults = (typeof json.success === 'undefined')

         if (showResults){
            this.setState({
               loading: false,
               prospects: json,
               refreshing:false,
            })
            listOfProspects = json;
         }else{
            this.setState({
               loading: false,
               refreshing:false,
            })
            // alert(json.message)
            console.log(json.message)
         }

      }catch(err){
         this.setState({
            loading: false,
            error: true,
            refreshing:false,
         });
         alert(`Oops! \n${err}`);
      }
  }

  findWord(word) {
     try{
        const newData = listOfProspects.filter( (item) => {
           const itemData = item.firstname.toLowerCase();
           const itemData2 = item.lastname.toLowerCase();
           const textData  = word.trim().toLowerCase();
           return (itemData.indexOf(textData) > -1) || (itemData2.indexOf(textData) > -1)
        } );
        // console.log(newData);
        this.setState({prospects:newData});
     }catch(err) {
      //   alert(err)
      console.log(err)
     }
  }

  handleRefresh = () => {
   //   alert('refreshing...')
     this.setState({refreshing: true})
     this.fetchData(this.state.dealership_id).done()
 }


  showDetail = (item) => {
    //  let carData = item
    //  carData.
     this.props.initializeProspect({newProspect:false, prospect:{license:''}})
     this.props.loadProspect(item)
     Actions.prospectDetail()
  }

  render() {
    this.props.initializeProspect({newProspect:true, prospect:{license:''}})
      return (
         //  <Container>

              <Content>

                {
                   this.state.loading
                   ? <Spinner style={{marginTop:75}} />
                   :

                   this.state.prospects.length>0?
                 <FlatList
                   data={this.state.prospects}
                   keyExtractor={item => item.sales_id}
                   refreshing={this.state.refreshing}
                   onRefresh={this.handleRefresh}
                   renderItem={({item}) =>
                   <ListItem avatar onPress={()=> this.showDetail(item) } >
                      <Left>
                        <Thumbnail source={require('./../../assets/img/noun_49517_cc.png')} />
                     </Left>
                     <Body>
                        <Text style={styles.itemTitle}>{item.firstname} {item.lastname}</Text>
                        {/* <Text note style={styles.itemDetail}>{item.address}</Text> */}
                        {item.city==='' ? null : <Text note style={styles.itemDetail}>{item.city} {item.state}</Text>}
                        {item.cellphone==='' ? null : <Text note style={{marginLeft: 10, }}>phone: {item.cellphone} </Text>}
                     </Body>
                  </ListItem>}
                />
                :
                <View style={styles.emptyImageContainer}>
                  <Image
                     style={{width: imageWidth-20, height: imageWidth-20, marginTop: imageMarginTop/2}}
                     source={{uri: 'https://epiclot.com/img/prospects_list.png'}}
                  />
                  {/* <Image
                     style={{width: imageWidth-20, height: imageWidth-20, marginTop: imageMarginTop/2}}
                     source={require('../../assets/img/epiclot_waterMark.png')}
                  /> */}
               </View>
               }

              </Content>
         //  </Container>

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
  emptyImageContainer: {
     flex:1,
     alignItems: 'center',
  },
});



// const mapStateToProps = (state) => {
//     return {
//         GlobalParams: state.appParams,
//     }
// }

const mapDispatchToProps = (dispatch) => {
    return {
        loadProspect: (t) => dispatch( ProspectActions.loadProspect(t) ),
        initializeProspect: (info) => dispatch(ProspectActions.initializeProspect(info)),
    };
};

export default connect(null, mapDispatchToProps)(Prospect)
