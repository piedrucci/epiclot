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


import { connect } from 'react-redux';
import * as sessionActions from '../../actions/sessionActions';


// Keep a reference to ensure there is only one event listener
// subscribed with BackAndroid
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
            loginMsg: '',
            rememberMe: false,
        }
    }

    componentDidMount() {
      // BackHandler.addEventListener('backPress');
      if (Platform.OS == "android" && listener == null) {
         listener = BackAndroid.addEventListener("hardwareBackPress", () => {
            return backButtonPressFunction()
         })
      }

      // A U T O    L O G I N
      AsyncStorage.getItem( api.getSessionName() ).then( (value) => {
         if ( value !== null ) {
            setTimeout(() => {Actions.home()}, 2000)
         }else {
            this.setState({showSplash:false});
         }
      }) ;

   }

// LOGUEA AL USUARIO (ASYNC)
   async loginUser() {
        try{
            // this.props.createCar({id:1, name:'kia picanto'});

            // this.props.setSession({dealership_id:11});

            this.setState({loading:true, invalidUser:false});
            const response = await fetch(api.getApi_Url()+'auth/sign_in', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "email":this.state.email,
                    "password": this.state.password,
                    "subdomain":this.state.subdomain
                })
            });

            const json = await response.json()

            this.setState({loading:false})
            this.setState({invalidUser: (json.api_key===null) ? true : false });
            this.setState({loginMsg: ( this.state.invalidUser ) ? 'Incorrect credentials' : 'Bienvenido!'});

            if ( response.status >= 200 && response.status < 300 ) {
               const info = {
                  "api_key": json.api_key,
                  "user_id": json.user_id,
                  "dealership_id": json.dealership_id,
                  "user": json.user,
                  "user_domain": json.user_domain,
                  "name": json.name
               };
               // alert('session guardada');

               if ( !this.state.invalidUser ) {
                  // AsyncStorage.setItem( api.getSessionName(), JSON.stringify(info) ).then( () => {
                  //    this.props.setSession(info);
                  //    console.log(this.props);
                  // } )
                  api.saveSession(info)
                  Actions.home()
               }

            }else {
               alert('no entro');
               api.removeToken();
            }

        }catch(err){
            api.removeToken();
            this.setState({
                loading: false,
                error: true
            });
            alert(err);
        }
    }

    // carRow() {
    //     const {cars} = this.props;
    //     return carsData = cars.map( (car, k) => {
    //         return <Text key={k}>{car.name}</Text>
    //     } )
    // }

    render() {
      // console.log(this.props);
        return (

          <Container style={styles.container}>

            <Content>

              <Text style={styles.title}>Epiclot App</Text>

              {this.state.showSplash ? <Splash visible={this.state.showSplash} /> :
              <Form style={{justifyContent:'center'}}>

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

                  {/* <Item>
                      <Switch
                        onValueChange={(value) => this.setState({rememberMe: value})}
                        style={{marginBottom: 10}}
                        value={this.state.rememberMe} />
                  </Item> */}

                  {/* <Item rounded> */}
                      <Button
                          disabled={this.state.loading}
                          style={styles.buttonPrincipal}
                          iconRight block
                          onPress={() => this.loginUser()}
                          >
                              <Text style={{color:'white'}}>Login </Text>
                              {this.state.loading ? <Icon name='ios-more-outline' /> : <Icon name='ios-log-in-outline' />}

                          </Button>
                  {/* </Item> */}

                  {this.state.loading ? <Spinner /> : <Text/>}

              </Form>
           }

              {/*  */}

              {/* <Splash visible={this.state.showSplash} /> */}

              {/* {this.carRow()} */}

              {/* <Image alignSelf='center' resizeMode='contain' style={styles.logo_image} source={require('../../assets/img/epiclot.png')} /> */}


            </Content>

            <Footer>
              {this.state.invalidUser ? <Text style={styles.loginMsg}>{this.state.loginMsg}</Text> : <Text/>}
            </Footer>

          </Container>

        );
    }
}

// Login.propTypes = {
//     dispatch: PropTypes.func.isRequired
// };

const mapStateToProps = (state) => {
    return {
        cars: state.cars,
        session: state.session,
    }
}

// const mapDispatchToProps = (dispatch) => {
//   return { carActions, sessionActions }
// }

export default connect(mapStateToProps, sessionActions)(Login)
