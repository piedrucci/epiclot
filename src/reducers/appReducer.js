import {
   ADD_TYPE, SET_VINCODE, SET_LICENSECODE, GET_VINCODE, GET_LICENSECODE
} from '../actions/appActions';

const params = {
   addType: 'car',
   vin: '',
   license: ''
}

export const appReducer = ( state = params, action ) => {
   switch (action.type) {
      case ADD_TYPE:
         return Object.assign( {}, action.t )

      case SET_VINCODE:
         return Object.assign( {}, action.t )

      case SET_LICENSECODE:
         return Object.assign( {}, action.t )

      case GET_VINCODE:
         return state;

      case GET_LICENSECODE:
         return state;

      //   case CREATE_CAR:
      //       return [
      //           ...state, Object.assign( {}, action.car )
      //       ]

      default:
         return state;
   }
}
