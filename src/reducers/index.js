import { combineReducers } from 'redux';

// import carListReducer from './carsList';
import carReducer from './carReducer';

const rootReducer = combineReducers({
    // carsListReducer,
    cars: carReducer
})

export default rootReducer
