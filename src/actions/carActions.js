
export const LOAD_CAR_DATA    = 'load_car_data'
export const GET_CAR_INFO     = 'get_car_info'
export const ADD_CAR_IMAGE    = 'add_car_image'
export const REMOVE_CAR_IMAGE = 'remove_car_image'
export const SET_CAR_IMAGES   = 'set_car_images'
export const SET_LIST_DELETED_IMAGES   = 'set_list_deleted_images'
export const INITIALIZE_CAR   = 'initialize_car'
export const SET_VIN          = 'set_vin'
export const REMOVE_UPLD_CAR_IMAGE = 'remove_upld_car_image'


export const loadCar = (car) => {
    return {
        type: LOAD_CAR_DATA,
        car
    }
}

export const getCarInfo = () => {
    return {
        type: GET_CAR_INFO,
    }
}

export const addCarImage = (pathImage) => {
    return {
        type: ADD_CAR_IMAGE,
        pathImage
    }
}

export const removeCarImage = (imageName) => {
    return {
        type: REMOVE_CAR_IMAGE,
        imageName
    }
}

export const removeUploadedCarImage = (imageName) => {
    return {
        type: REMOVE_UPLD_CAR_IMAGE,
        imageName
    }
}

export const setCarImages = (imageList) => {
    return {
        type: SET_CAR_IMAGES,
        imageList
    }
}


export const initializeCar = (payload) => {
    return {
        type: INITIALIZE_CAR,
        payload
    }
}

export const setVIN = (payload) => {
    return {
        type: SET_VIN,
        payload
    }
}


// export const newCarInfo = () => {
//     return {
//         type: NEW_CAR_INFO,
//         payload: carId
//     }
// }
