import { Alert, AsyncStorage } from 'react-native';

// cEcTjhj1xXmYPmUXcKXxoM7G8gjh9YIDhYoirP5c
const endPoint = 'http://epiclot.com/dealer/accounts/';
const apiEndPoint = 'http://api.epiclot.com/epiclots/';
const apiCarsUrl = apiEndPoint + 'cars/';

const SESSION_NAME = 'session';

var api = {
   async sendPOST(endPointUrl, userInfo) {
      const response = await fetch( endPointUrl , {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              "email": userInfo.email,
              "password": userInfo.password,
              "subdomain":userInfo.subdomain
          })
      });
      return response;
   },

   getSessionName() {
      return SESSION_NAME;
   },

   async getCars(dealership_id) {
      // esto retorna un Promise.... usar  promesa.then()
      const response = await fetch( apiCarsUrl + dealership_id ).then( (res) => res.json() );
      return response;

   },

   async checkVIN(vin) {
      // esto retorna un Promise.... usar  promesa.then()
      const response = await fetch( apiEndPoint + 'vin/' + vin ).then( (res) => res.json() );
      return response;

   },

   getApi_Url() {
      return apiEndPoint;
   },

   // DEVUELVE LA RUTA PARA CARGAR UNA FOTO DESDE EL SERVIDOR
   getUrlPhotoHost(subdomain, photoName) {
      return endPoint + subdomain + '/photos/' + photoName;
      // return 'http://epiclot.com/dealer/accounts/titohotwheels/photos/'+entry.photo};
   },

   // DEVUELVE LA RUTA PARA CARGAR TODAS LAS FOTOS DE UN VIN
   getApiUrlPhotosByVIN(vin) {
      return apiEndPoint + 'photos/' + vin;
   },


   async storeToken(loginInfo) {
      try{
         await AsyncStorage.setItem(SESSION_NAME, JSON.stringify(loginInfo) );
         // alert(JSON.stringify(loginInfo));
      }catch(err){
         alert(err)
         console.log('STORE something went wrong: ' + err)
      }
   },


   async getToken() {
      try{
         let session = await AsyncStorage.getItem(SESSION_NAME);
         // alert(JSON.parse(session));
         // alert(session);
         return JSON.stringify(session);
      }catch(err){
         alert(err)
         console.log('GET TOKEN something went wrong: ' + err)
         return null;
      }
   },

   async removeToken() {
      try{
         await AsyncStorage.removeItem(SESSION_NAME);
         // this.getToken();
      }catch(err){
         alert(err)
         console.log('REMOVE something went wrong: ' + err)
      }
   }

}

module.exports = api
