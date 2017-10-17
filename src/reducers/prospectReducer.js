
import * as PROSPECT_ACTIONS  from '../actions/prospectActions';

const initialState = {
      newProspect:true,
      prospect: {},
}


export const prospectInfoReducer = ( state = initialState, action ) => {
   switch (action.type) {

      case PROSPECT_ACTIONS.GET_PROSPECT_INFO:
         // return JSON.stringify(state)
         // return Object.assign( {}, state )
         return state;


      case PROSPECT_ACTIONS.LOAD_PROSPECT_DATA:
            return {
               ...state,
               prospect: action.payload
            }

      case PROSPECT_ACTIONS.INITIALIZE_PROSPECT:
            return {
               newProspect: action.payload.newProspect,
               prospect: {license: action.payload.prospect.license}
            }

      case PROSPECT_ACTIONS.SET_LICENSE:
            return {
                  ...state,
                  prospect: {
                        ...state.prospect, license: action.license,
                  }
            }

      default:
         return state;
   }
}
