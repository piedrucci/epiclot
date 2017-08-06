
export const FILL_CAR_INFO = 'fill_car_data';
export const GET_CAR_INFO = 'get_car_info';


export const fillCarInfo = (car) => {
    return {
        type: FILL_CAR_INFO,
        car
    }
}

export const getCarInfo = () => {
    return {
        type: GET_CAR_INFO,
    }
}

// export const newCarInfo = () => {
//     return {
//         type: NEW_CAR_INFO,
//         payload: carId
//     }
// }
