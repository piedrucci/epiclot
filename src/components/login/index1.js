import React, { Component } from 'react';
import { Image, AsyncStorage, BackHandler, BackAndroid, Platform } from 'react-native';
import PropTypes from 'prop-types';

import { Text, Switch } from 'react-native';

import { Container, Content, Form, Item, Input, Label,
   Icon, Button, Footer, Spinner } from 'native-base';

import { Actions } from 'react-native-router-flux';

// S T Y L E S
import styles from './loginStyles';

// COMPONENTES
import Splash from '../splash';

import api from '../../utilities/api';



// Keep a reference to ensure there is only one event listener subscribed with BackAndroid
let listener = null

// Default behavior: returning false exits the app.
let backButtonPressFunction = () => false

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            subdomain: 'carsofswfl',
            email: 'info@carsofswfl.com',
            password: '123456',
            loading: false,
            showSplash: true,

            invalidUser: false,
            loginMsg: ''
        }
    }

    componentDidMount() {
      this.setState({loading:true});
      // BackHandler.addEventListener('backPress');
      if (Platform.OS == "android" && listener == null) {
         listener = BackAndroid.addEventListener("hardwareBackPress", () => {
            return backButtonPressFunction()
         })
      }

      this.checkSession()

   }

// // A U T O    L O G I N
   async checkSession() {
      const sessionData = await AsyncStorage.getItem( api.getSessionName() )
      if ( sessionData !== null ) {
         await api.removeToken()
         console.log('actions home');
         // setTimeout(() => {Actions.home()}, 2000)
      }else {
         this.setState({
            loading:false,
            showSplash:false
         });

      }
   }

// LOGUEA AL USUARIO (ASYNC)
   async loginUser() {
      try{
         this.setState({loading:true, invalidUser:false})

         const credentials = {
            "email":this.state.email,
            "password": this.state.password,
            "subdomain":this.state.subdomain
         }

         // SE ENVIA LA PETICION A LA API ...
         const response = await api.sendPOST(`${api.getApi_Url()}auth/sign_in`, credentials)
         const json = await response.json()
         console.log(json)

         this.setState({
            loading:false,
            invalidUser: (json.api_key===null),
            loginMsg: (json.api_key===null) ? 'Incorrect credentials' : 'Bienvenido!'
         })

         if ( response.status >= 200 && response.status < 300 ) {
            const info = {
               "api_key": json.api_key,
               "user_id": json.user_id,
               "dealership_id": json.dealership_id,
               "user": json.user,
               "user_domain": json.user_domain,
               "name": json.name
            };

            if ( !this.state.invalidUser ) {
               await api.saveSession(info)
               // Actions.home()
               // setTimeout(() => {Actions.home()}, 2000)
            }

         }else {
            // alert('no entro');
            await api.removeToken();
         }
      }catch(err){
         await api.removeToken();
         this.setState({
            loading: false,
            error: true
         });
         alert(err);
      }
   }


    render() {
      // console.log(this.props);
        return (

          <Container style={styles.container}>

            <Content>

              <Text style={styles.title}>Sign in to Epiclot</Text>

              {
                 this.state.loading ? null :
                 <Text style={{textAlign:'center', margin:20}}>Enter your subdomain, email and password to access your Epiclot account</Text>
              }

              {
                 this.state.showSplash ?
                 <Splash visible={this.state.showSplash} /> :

              <Form style={{justifyContent:'center', alignItems:'center'}}>

                  <Item >
                      {/* <Label>Username</Label> */}
                      <Icon name='ios-car-outline' />
                      <Input
                          maxLength = {45}
                          keyboardType='default'
                          style={styles.input_default}
                          returnKeyType='next'
                          placeholder='Sub Domain'
                          onChangeText={ (text) => this.setState( {subdomain:text} ) }
                          // onSubmitEditing = { () => this.emailInput.focus() }
                          value={this.state.subdomain}
                      />
                  </Item>

                  <Item >
                      <Icon name='ios-mail-outline' />
                      <Input
                          style={styles.input_default}
                          maxLength = {45}
                          keyboardType='email-address'
                          returnKeyType='next'
                          placeholder='Email'
                          autoCorrect={false}
                          autoCapitalize='none'
                          onChangeText={ (text) => this.setState( {email:text} ) }
                          // ref={ (input) => this.emailInput = input }
                          value={this.state.email}
                      />
                  </Item>

                  {/* <Item floatingLabel last> */}
                  {/* <Item style={styles.input_container} regular> */}
                  <Item >
                      <Icon name='ios-unlock-outline' />
                      <Input maxLength = {45} returnKeyType='go' secureTextEntry={true}
                          style={styles.input_default}
                          placeholder='Password'
                          onChangeText={ (text) => this.setState( {password:text} ) }
                          value={this.state.password}
                      />
                  </Item>


                  {/* <Item rounded> */}
                  <Button
                     iconRight block
                     disabled={this.state.loading}
                     style={styles.loginButton}
                     onPress={() => this.loginUser()}
                     >
                     <Text style={{color:'white'}}>Login </Text>
                     {this.state.loading ? <Icon name='ios-more-outline' /> : <Icon name='ios-log-in-outline' />}
                 </Button>

                  {this.state.loading ? <Spinner /> : null}

              </Form>
           }



            </Content>

            <Footer>
              {/* {this.state.invalidUser ? <Text style={styles.loginMsg}>{this.state.loginMsg}</Text> : <Text/>} */}
              <Text>Ojoooo!</Text>
            </Footer>

          </Container>

        );
    }
}

export default Login
