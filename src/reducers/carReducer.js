import {
   FILL_CAR_INFO,
   GET_CAR_INFO
} from '../actions/carActions';

const car = {
   newCar: true,
   vin: '',
   user_id: '',
   delearship_id: '',
   mileage: '',
   mileage_type: 'N/A',
   color: '',
   transmission: '',
   status: 'AVAILABLE',
   purchase_price: '',
   expense_date: '',
   web_price: '',
   sale_price: '',
   wholesale_price: ''
}


export const carInfoReducer = ( state = car, action ) => {
   switch (action.type) {
      case FILL_CAR_INFO:
         return Object.assign( {}, action.car )

      case GET_CAR_INFO:
         // return JSON.stringify(state)
         // return Object.assign( {}, state )
         return state;

      //   case CREATE_CAR:
      //       return [
      //           ...state, Object.assign( {}, action.car )
      //       ]

      default:
         return state;
   }
}
