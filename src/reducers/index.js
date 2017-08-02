import { combineReducers } from 'redux';

// import carListReducer from './carsList';
import carReducer from './carReducer';
import sessionReducer from './sessionReducer';

const rootReducer = combineReducers({
    // carsListReducer,
    cars: carReducer,
    session: sessionReducer,
})

export default rootReducer
