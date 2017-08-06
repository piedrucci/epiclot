import { combineReducers } from 'redux';

import {carInfoReducer} from './carReducer';
import sessionReducer from './sessionReducer';

const rootReducer = combineReducers({
    carInfo: carInfoReducer,

    session: sessionReducer,
})

export default rootReducer
