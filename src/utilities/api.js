import { Alert, AsyncStorage } from 'react-native';

// cEcTjhj1xXmYPmUXcKXxoM7G8gjh9YIDhYoirP5c
const endPoint = 'http://epiclot.com/dealer/accounts/';
const apiEndPoint = 'http://api.epiclot.com/epiclots/';
const apiCarsUrl = apiEndPoint + 'cars/';
const apiProspectsUrl = apiEndPoint + 'prospectslist/';

const SESSION_NAME = 'session';

var api = {
   async sendPOST(endPointUrl, userInfo) {
      const response = await fetch( endPointUrl , {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(userInfo)
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

   async getProspects(dealership_id) {
      // esto retorna un Promise.... usar  promesa.then()
      const response = await fetch( apiProspectsUrl + dealership_id ).then( (res) => res.json() );
      return response;

   },

   async checkVIN(vin, dealership_id) {
      // esto retorna un Promise.... usar  promesa.then()
      // alert( apiEndPoint + 'vin/' + vin + '/' + dealership_id )
      const response = await fetch( apiEndPoint + 'vin/' + vin + '/' + dealership_id + '/' ).then( (res) => res.json() );
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


   async saveSession(loginInfo) {
      try{
         const response = await AsyncStorage.setItem(SESSION_NAME, JSON.stringify(loginInfo) )
         // const json = await response.json()
         console.log(response)
         // alert(JSON.stringify(loginInfo));
      }catch(err){
         alert(err)
         console.log('(saveSession) something went wrong: ' + err)
      }
      // AsyncStorage.setItem( api.getSessionName(), JSON.stringify(info) ).then( () => {
      //    this.props.setSession(info);
      //    Actions.home()
      //    console.log(this.props);
      // } )
   },


   getSession() {
      try{
         let session = AsyncStorage.getItem(SESSION_NAME)
         // console.log(JSON.parse(session))
         return session;
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
