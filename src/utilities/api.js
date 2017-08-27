import { Alert, AsyncStorage } from 'react-native';

// cEcTjhj1xXmYPmUXcKXxoM7G8gjh9YIDhYoirP5c
const endPoint = 'http://epiclot.com/dealer/accounts/';
const apiEndPoint = 'http://api.epiclot.com/epiclots/';
const apiCarsUrl = apiEndPoint + 'cars/';
const apiProspectsUrl = apiEndPoint + 'prospectslist/';

const SESSION_NAME = 'session';

var api = {

   // ENVIA UN POST REQUEST GENERICO ... (SOLO PASARLE EL ENDPOINT Y EL PAYLOAD)
   sendPOST(endPointUrl, payload) {
      const response = fetch( endPointUrl , {
          method: 'post',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
      });
      return response;
   },

   getSessionName() {
      return SESSION_NAME;
   },

   // OBTIENE LA LISTA DE CARROS esto retorna un Promise.... usar con async-await
   getCars(dealership_id) {
      const response = fetch( apiCarsUrl + dealership_id )
      return response;
   },

   // OBTIENE LA LISTA DE PROSPECTOS esto retorna un Promise.... usar con async-await
   getProspects(dealership_id) {
      // esto retorna un Promise.... usar  promesa.then()
      const response = fetch( apiProspectsUrl + dealership_id );
      return response;

   },

   // CONSULTA EL VIN EN EL dealership_id
   checkVIN(vin, dealership_id) {
      const response = fetch( apiEndPoint + 'vin/' + vin + '/' + dealership_id + '/' )
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


   saveSession(loginInfo) {
      try{
         const res = AsyncStorage.setItem(SESSION_NAME, JSON.stringify(loginInfo) ).then((sdf)=>console.log(sdf))
         // console.log(`AsyncStorage: ${res}`)
         // const resJSON = (res!==null) ? res.json() : null
         return res
      }catch(err){
         alert(err)
         console.log('(saveSession) something went wrong: ' + err)
      }
   },


   async removeToken() {
      try{
         await AsyncStorage.removeItem(SESSION_NAME);
      }catch(err){
         alert(err)
         console.log('REMOVE something went wrong: ' + err)
      }
   }

}

module.exports = api
