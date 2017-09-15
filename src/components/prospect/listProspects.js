import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, AsyncStorage, RefreshControl, FlatList } from 'react-native';
import { Container, Content, Spinner, ListItem, Body, CheckBox, Left, Thumbnail } from 'native-base';
import FitImage from 'react-native-fit-image';
import { Actions } from 'react-native-router-flux';
import api from '../../utilities/api';
import { FormattedCurrency } from 'react-native-globalize';

const listOfProspects = []

class Prospect extends Component {

  constructor(props) {
      super(props);
      this.state = {
          error: false,
          prospects: [],
          loading: true,
          refreshing: false,
          dealership_id: null,
      }
      this.handleRefresh = this.handleRefresh.bind(this)
  }

  componentDidMount() {
      this.checkSession().done()
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
     this.findWord(nextProps.prospectFilter)
  }

// GET REQUEST PARA OBTENER LA LISTA COMPLETA DE PROSPECTOS DEL DEALER ACTUAL
  async fetchData(dealership_id) {
      try{
         const response = await api.getProspects(dealership_id)
         // if ( response.status === 500 )
         const json = await response.json()
         this.setState({
            loading: false,
            prospects: json,
            refreshing:false,
         })
         listOfProspects = json;
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
        const newData = listOfProspects.filter( (item) => {
           const itemData = item.firstname.toLowerCase();
           const itemData2 = item.lastname.toLowerCase();
           const textData  = word.trim().toLowerCase();
           return (itemData.indexOf(textData) > -1) || (itemData2.indexOf(textData) > -1)
        } );
        // console.log(newData);
        this.setState({prospects:newData});
     }catch(err) {
        alert(err)
     }
  }

  handleRefresh() {
   //   alert('refreshing...')
     this.setState({refreshing: true})
     this.fetchData(this.state.dealership_id).done()
 }

  render() {
      return (
         //  <Container>

              <Content>

                {
                   this.state.loading
                   ? <Spinner style={{marginTop:75}} />
                   :
                 <FlatList
                   data={this.state.prospects}
                   keyExtractor={item => item.sales_id}
                   refreshing={this.state.refreshing}
                   onRefresh={this.handleRefresh}
                   renderItem={({item}) =>
                   <ListItem avatar onPress={()=>Actions.prospectDetail({prospect:item})} >
                      <Left>
                        <Thumbnail source={require('./../../assets/img/noun_49517_cc.png')} />
                     </Left>
                     <Body>
                        <Text style={styles.itemTitle}>{item.firstname} {item.lastname}</Text>
                        {/* <Text note style={styles.itemDetail}>{item.address}</Text> */}
                        <Text note style={styles.itemDetail}>{item.city} {item.state}</Text>
                        {item.cellphone==='' ? null : <Text note style={{marginLeft: 10, }}>phone: {item.cellphone} </Text>}
                     </Body>
                  </ListItem>}
                />
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
export default (Prospect)
