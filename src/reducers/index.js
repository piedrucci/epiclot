import { combineReducers } from 'redux';

import {carInfoReducer} from './carReducer';
import sessionReducer from './sessionReducer';
import {appReducer} from './appReducer';

const rootReducer = combineReducers({
    carInfo: carInfoReducer,

    session: sessionReducer,
    appParams: appReducer,
})

export default rootReducer
