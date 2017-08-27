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
import CameraComp from './components/car/camScanner';
import Dashboard2 from './components/prospect/index';
import CreateProspect from './components/prospect/create';
import ProspectDetail from './components/prospect/detail';
import CreateObject from './components/dashboard/createObject';
import CarImagesContainer from './components/car/carImagesContainer';
import FormCar from './components/car/wq.js';
//import Cars from './components/prospect/listCars';

// import DashboardBody from './components/dashboard/body';
// import UserInfo from './components/user/info';

// API
import api from './utilities/api';

// UTILIDADES
import { FormattedWrapper } from 'react-native-globalize';

const buttonCreateCar = ()=><Icon name='ios-add-outline' fontSize={38} onPress={ () => Actions.createObject() } />
const buttonNextCarImages = ()=><Icon name='ios-arrow-dropright' onPress={ () => Actions.createCar() } />
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
                    <Scene key='login' component={Login} hideNavBar={true} initial={true}/>

                    <Scene key='home' component={Dashboard} hideNavBar={false} title='Home'
                        type={ActionConst.RESET} renderRightButton ={buttonCreateCar} renderLeftButton ={buttonLogOut}  />

                    {/* MOSTRAR DETALLES DEL CARRO */}
                    <Scene key='carDetail' component={CarDetail} hideNavBar={false} title='Car Detail' />

                    {/* CREAR CARRO */}
                    <Scene key='createCar'  component={CreateCar} hideNavBar={false} title='New Car'
                     />
                    <Scene key='createCar2' component={CreateCar2} hideNavBar={false} title='New Car' />
                    <Scene key='cameraScanner' component={CameraComp} hideNavBar={true} title='Scan Vin' />
                    <Scene key='formCar' component={FormCar} hideNavBar={false} title='Car Info' />
                    <Scene key='carImages' component={CarImagesContainer} hideNavBar={false} title='Add Images' />

                    {/* NEW HOME WITCH TAB BAR AND FLOAT BUTTON */}
                    <Scene key='home2' component={Dashboard2} hideNavBar={false} title='Home'
                    type={ActionConst.RESET} renderRightButton ={buttonCreateCar}  renderLeftButton ={buttonLogOut}  />

                    {/* CREAR PROSPECT */}
                    <Scene key='createProspect'  component={CreateProspect} hideNavBar={false} title='New Prospect'  />

                    {/* MOSTRAR DETALLES DEL PROSPECT */}
                    <Scene key='prospectDetail' component={ProspectDetail} hideNavBar={false} title='Prospect Detail' />

                    <Scene key='createObject'  component={CreateObject} hideNavBar={false} title='Add New'  />

                </Router>

            </FormattedWrapper>
        </Provider>
    )
}

export default App;
