import { combineReducers } from 'redux';

import {carInfoReducer} from './carReducer';
import {prospectInfoReducer} from './prospectReducer';
import {appReducer} from './appReducer';

const rootReducer = combineReducers({
    carInfo: carInfoReducer,
    prospectInfo: prospectInfoReducer,
    appParams: appReducer,
})

export default rootReducer
