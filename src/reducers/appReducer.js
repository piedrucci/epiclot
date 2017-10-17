import {
   ADD_TYPE, SET_VINCODE, SET_LICENSECODE, GET_VINCODE, GET_LICENSECODE, SET_SESSION
} from '../actions/appActions';

const initialState = {
   activeModule: 'car',
   vin: '',
   license: '',
   session: {}
}

export const appReducer = ( state = initialState, action ) => {
   switch (action.type) {
      case ADD_TYPE:
         // return Object.assign( {}, action.t )
         return {...state, activeModule: action.payload}

      case SET_SESSION:
         // console.log(action.s)
         // return Object.assign( {}, action.s )
         return {...state, session: action.payload}

      case SET_VINCODE:
         // return Object.assign( {}, action.payload )
         return {...state, vin: action.payload }

      case SET_LICENSECODE:
         return Object.assign( {}, action.payload )

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
