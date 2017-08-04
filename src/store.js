import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/index';
// import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

// definimos el estado inicial
// const initialState = {
//     cars: [],
// };

const configureStore = (initialState) => {
    try{
        return createStore(
            rootReducer,
            initialState,
            // applyMiddleware(reduxImmutableStateInvariant())
            // applyMiddleware(thunk)
        );
    }catch(err){
        alert ('configureStore: '+err)
    }
}

export default configureStore;
