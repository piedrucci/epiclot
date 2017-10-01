import {
   ADD_TYPE, SET_VINCODE, SET_LICENSECODE, GET_VINCODE, GET_LICENSECODE, SET_SESSION
} from '../actions/appActions';

const initialState = {
   addType: 'car',
   vin: '',
   license: '',
   session: {}
}

export const appReducer = ( state = initialState, action ) => {
   switch (action.type) {
      case ADD_TYPE:
         // return Object.assign( {}, action.t )
         console.log(action.t)
         return {...state, addType: action.t}

      case SET_SESSION:
         // console.log(action.s)
         // return Object.assign( {}, action.s )
         return {...state, session: action.s}

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
