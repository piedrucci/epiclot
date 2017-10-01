import { combineReducers } from 'redux';

import {carInfoReducer} from './carReducer';
import {appReducer} from './appReducer';

const rootReducer = combineReducers({
    carInfo: carInfoReducer,
    appParams: appReducer,
})

export default rootReducer
