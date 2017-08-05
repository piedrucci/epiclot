import React from 'react';

import { View, TouchableOpacity, AsyncStorage, BackAndroid, Alert } from 'react-native';
import { Container, Icon, Button, Text } from 'native-base';

// RUTAS
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';

// STORE
import configureStore from './store';

// REDUX
import { Provider } from 'react-redux';

// COMPONENTES
import Login from './components/login/index';
import Dashboard from './components/dashboard/index';
import CarDetail from './components/car/detail';
import CreateCar from './components/car/create';
import CreateCar2 from './components/car/create2';
import SS from './components/car/ss';
// import DashboardBody from './components/dashboard/body';
// import UserInfo from './components/user/info';

// API
import api from './utilities/api';

// UTILIDADES
import { FormattedWrapper } from 'react-native-globalize';

const buttonCreateCar = ()=><Icon name='ios-add-outline' fontSize={38} onPress={ () => Actions.createCar() } />
const buttonSaveCar = () => <Icon name='ios-checkmark-circle-outline' fontSize={38} onPress={ () => {alert('save car')} } />

const buttonLogOut = () => <Icon name='ios-log-out-outline' fontSize={38} onPress={ () => {
    Alert.alert(
            'Epiclot',
            "Are you sure to logout app?",
            [
              {text: 'NO', onPress: () => {}},
              {text: 'Yes, logout', onPress: () => {
                  try{
                      AsyncStorage.removeItem( api.getSessionName() ).then( () => {
                          Actions.login({type:ActionConst.RESET});
                      } )
                  }catch(err){
                      alert(err)
                      console.error(err)
                  }
                }
              },
            ]
);
} } />

const store = configureStore();

const App = () => {
    return (
        <Provider store={store}>

            <FormattedWrapper locale="en" currency="USD" >

                <Router >
                    <Scene key='login' component={Login} hideNavBar={true} />

                    <Scene key='home' component={Dashboard} hideNavBar={false} title='Home'
                        type={ActionConst.RESET} renderRightButton ={buttonCreateCar} renderLeftButton ={buttonLogOut}  />

                     {/* MOSTRAR DETALLES DEL CARRO */}
                    <Scene key='carDetail' component={CarDetail} hideNavBar={false} title='Car Detail' />

                    {/* CREAR CARRO */}
                    <Scene key='createCar'  component={CreateCar} hideNavBar={false} title='Create'  />
                    {/* <Scene key='createCar2' component={CreateCar2} hideNavBar={false} title='Car Form' initial={true}  /> */}
                    <Scene key='createCar2' component={SS} hideNavBar={false} title='Car SS' initial={true}  />

                </Router>

            </FormattedWrapper>
        </Provider>
    )
}

export default App;
