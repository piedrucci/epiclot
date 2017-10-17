
import * as CAR_ACTIONS  from '../actions/carActions';

const initialState = {
      newCar:true,
      car: {},
      images: [],
      deletedImages: []
}


export const carInfoReducer = ( state = initialState, action ) => {
   switch (action.type) {

      case CAR_ACTIONS.GET_CAR_INFO:
         // return JSON.stringify(state)
         // return Object.assign( {}, state )
         return state;

      //   case CREATE_CAR:
      //       return [
      //           ...state, Object.assign( {}, action.car )
      //       ]

      case CAR_ACTIONS.ADD_CAR_IMAGE:
            // console.log(`ESTA LLEGANDO AL REDUCER ${action.pathImage}`)
            return {
                  ...state,
                  images: [...state.images, action.pathImage]
            }

      case CAR_ACTIONS.REMOVE_CAR_IMAGE:
            return {
                  ...state,
                  images: state.images.filter(item => action.imageName !== item)
            }

      case CAR_ACTIONS.REMOVE_UPLD_CAR_IMAGE:
            return {
                  ...state,
                  deletedImages: [...state.deletedImages, action.imageName]
            }


      case CAR_ACTIONS.SET_CAR_IMAGES:
            return {
                  ...state,
                  images: action.imageList
            }


      case CAR_ACTIONS.LOAD_CAR_DATA:
            // return Object.assign( {}, action.car )
            return {
               ...state,
               car: action.car
            }

      case CAR_ACTIONS.INITIALIZE_CAR:
            return {
               newCar:action.payload.newCar,
               car: {vin: action.payload.car.vin, details: action.payload.car.details},
               images:[],
               deletedImages: []
            }

      case CAR_ACTIONS.SET_VIN:
            return {
                  ...state,
                  car: {
                        ...state.car, vin: action.payload,
                  }
            }

      default:
         return state;
   }
}
