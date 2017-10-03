import React, { Component } from 'react'
import { Image, AsyncStorage, BackHandler, Platform, Dimensions } from 'react-native';
import { Container, Content, Header, Form, Item, Input,
   Button, Text, Footer, FooterTab, Icon, Spinner } from 'native-base'
import api from '../../utilities/api'
import { Actions } from 'react-native-router-flux'
import Splash from '../splash'
import styles from './loginStyles'

// Keep a reference to ensure there is only one event listener subscribed with BackHandler
let listener = null

// ===========================================
import { connect } from 'react-redux';
import * as appActions from '../../actions/appActions';
// ================================================

class Login extends Component {
   constructor(){
      super()
      this.state = {
         subdomain: '',
         email: '',
         password: '',
         // subdomain: 'carsofswfl',
         // email: 'info@carsofswfl.com',
         // password: '123456',
         loading: false,
         showSplash: true,

         invalidUser: false,
         loginMsg: ''
      }
      this.loginUser = this.loginUser.bind(this)
   }

   componentDidMount() {
      // AsyncStorage.removeItem(api.getSessionName())
     this.setState({loading:true});

     // BackHandler.addEventListener('backPress');
     if (Platform.OS == "android" && listener == null) {
        listener = BackHandler.addEventListener("hardwareBackPress", () => {
          //  return backButtonPressFunction()
           return false
        })
     }

     this.checkSession()
  }


  // // A U T O    L O G I N
  async checkSession() {
     try{
        const sessionData = await AsyncStorage.getItem( api.getSessionName() )
        if ( sessionData !== null ) {
           //   await api.removeToken()
           await this.props.StoreSession(JSON.parse(sessionData))
           setTimeout(() => {Actions.home2()}, 1500)
        }else {
           this.setState({
             loading:false,
             showSplash:false
          });
       }
    }catch(err){
          console.log(err)
       }
  }


   // LOGUEA AL USUARIO (ASYNC)
   async loginUser() {

      this.setState({invalidUser: true})
      if ( this.state.subdomain.trim() === '' ){
         // this.setState({loginMsg: 'Enter the Subdomain'})
         alert('Enter the Subdomain')
      }else if ( this.state.email === '' ){
         // this.setState({loginMsg: 'Enter the email'})
         alert('Enter the email')
      }else if ( this.state.password === '' ){
         // this.setState({loginMsg: 'Enter the password'})
         alert('Enter the password')
      }else{
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

            this.setState({
               invalidUser: (json.api_key===null),
               loginMsg: (json.api_key===null) ? 'Incorrect credentials' : 'Bienvenido!'
            })

            if ( response.status >= 200 && response.status < 300 ) {
               this.setState({showSplash:true})
               const info = {
                  api_key: json.api_key,
                  user_id: json.user_id,
                  dealership_id: json.dealership_id,
                  user: json.user,
                  user_domain: json.user_domain,
                  name: json.name
               };

               if ( !this.state.invalidUser ) {
                  await api.saveSession(info)
                  await this.props.StoreSession(info)
                  // await console.log(this.props.GlobalParams)
                  setTimeout(() => {
                     this.setState({loading:false})
                     Actions.home2()
                  }, 1500)
               }

            }else {
               alert(this.state.loginMsg)
               this.setState({loading:false})
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

   }

   componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress')
  }

   render() {
      return (
         <Container style={styles.container}>

            <Content>
               <Text style={styles.title}>Sign in to Epiclot</Text>
               {/* <Image style={{width:80, height:80, alignSelf:'center'}} source={require('./../../assets/img/logofinal.png')} /> */}
               {/* <Image style={{width:100, height:100, alignSelf:'center'}} source={require('./../../assets/epiclot-09.png')} /> */}
               <Image style={{width:100, height:100, alignSelf:'center'}} source={{uri: 'https://epiclot.com/img/app_logo.png'}} />
            {/* </Content>
            <Content> */}
               {/* {
                 this.state.loading ? null :
                 <Text style={styles.subtitle}>Enter your subdomain, email and password to access your Epiclot account</Text>
              } */}

              {
                 this.state.showSplash ?
                 <Splash visible={this.state.showSplash} /> :
               <Form>
                  <Item>
                     <Icon name='ios-car-outline' />
                     <Input
                        style={styles.formInput}
                        maxLength = {45}
                        keyboardType='default'
                        returnKeyType='next'
                        placeholder='Sub Domain'
                        value={this.state.subdomain}
                        onChangeText={ (text) => this.setState( {subdomain:text} ) }
                        // onSubmitEditing = { () => this.emailInput.focus() }
                     />
                  </Item>
                  <Item>
                     <Icon name='ios-mail-outline' />
                     <Input
                        style={styles.formInput}
                        maxLength = {45}
                        keyboardType='email-address'
                        returnKeyType='next'
                        placeholder='Email'
                        autoCorrect={false}
                        autoCapitalize='none'
                        onChangeText={ (text) => this.setState( {email:text} ) }
                        value={this.state.email}
                        // ref={ (input) => this.emailInput = input }
                     />
                  </Item>
                  <Item>
                     <Icon name='ios-unlock-outline' />
                     <Input maxLength = {45} returnKeyType='go' secureTextEntry={true}
                        style={styles.formInput}
                        placeholder='Password'
                        value={this.state.password}
                        onChangeText={ (text) => this.setState(  {password:text} ) }
                     />
                  </Item>
                  <Button
                     iconRight block
                     disabled={this.state.loading}
                     style={styles.loginButton}
                     onPress={this.loginUser}
                     >
                     <Text style={{color:'white'}}>Login </Text>
                     {this.state.loading ? <Icon name='ios-more-outline' /> : <Icon name='ios-log-in-outline' />}
                 </Button>
                 {this.state.loading ? <Spinner /> : null}
               </Form>
            }
            </Content>

            {/* <Footer style={styles.footerContainer}>
            {
               this.state.invalidUser && this.state.loginMsg ?
                  <Text style={styles.footerMessage}>{this.state.loginMsg}</Text>
               : null
            }
            </Footer> */}
         </Container>

      )
   }
}

const mapStateToProps = (state) => {
    return {
        GlobalParams: state.appParams,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        StoreSession: (s) => dispatch(appActions.setSession(s)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)
