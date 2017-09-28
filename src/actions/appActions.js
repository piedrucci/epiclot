
export const ADD_TYPE = 'add_type';
export const SET_VINCODE = 'set_vincode';
export const GET_VINCODE = 'get_vincode';
export const SET_LICENSECODE = 'set_licensecode';
export const GET_LICENSECODE = 'get_licensecode';

export const addType = (t) => {
    return {
        type: ADD_TYPE,
        t
    }
}

export const setVIN = (t) => {
    return {
        type: SET_VINCODE,
        t
    }
}

export const setLicense = (t) => {
    return {
        type: SET_LICENSECODE,
        t
    }
}


export const getVIN = () => {
    return {
        type: GET_VINCODE,
    }
}

export const getLicense = () => {
    return {
        type: GET_LICENSECODE,
    }
}
