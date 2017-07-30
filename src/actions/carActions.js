
export const GET_CARS = 'get_cars';
export const SELECTED_CAR = 'selected_car';
export const CREATE_CAR = 'create_car';


export const createCar = (car) => {
    return {
        type: CREATE_CAR,
        car
    }
}

export const getCars = (arrayCars) => {
    return {
        type: GET_CARS,
        cars: arrayCars
    }
}

export const selectedCar = (carId) => {
    return {
        type: SELECTED_CAR,
        payload: carId
    }
}


// export const incrementCount = () => ({
//   type: 'INCREMENT'
// })
