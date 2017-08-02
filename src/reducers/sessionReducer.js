import { SET_SESSION_INFO } from '../actions/sessionActions';

const info = {
   "api_key": '',
   "user_id": '',
   "dealership_id": '',
   "user": '',
   "user_domain": '',
   "name": ''
};

const sessionReducer = ( state = null, action ) => {
   switch (action.type) {

      case SET_SESSION_INFO:
         return Object.assign( {}, action.info )

      default:
         return state;
   }
}

export default sessionReducer;
