import {
   ADD_TYPE
} from '../actions/appActions';

const params = {
   addType: 'car'
}

export const appReducer = ( state = params, action ) => {
   switch (action.type) {
      case ADD_TYPE:
         return Object.assign( {}, action.t )

      //   case CREATE_CAR:
      //       return [
      //           ...state, Object.assign( {}, action.car )
      //       ]

      default:
         return state;
   }
}
