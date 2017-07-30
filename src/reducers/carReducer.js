import { SELECTED_CAR, CREATE_CAR } from '../actions/carActions';

const data  =
    [
        {
            "id": "1",
            "name": "roberth"
        },
        {
            "id": "2",
            "name": "luis"
        },
    ]

const carReducer = ( state = [], action ) => {
    switch (action.type) {
        case CREATE_CAR:
            return [
                ...state, Object.assign( {}, action.car )
            ]

        default:
            return state;
    }
}

export default carReducer;
