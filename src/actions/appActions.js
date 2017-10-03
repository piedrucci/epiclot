
export const ADD_TYPE = 'add_type';
export const SET_VINCODE = 'set_vincode';
export const GET_VINCODE = 'get_vincode';
export const SET_LICENSECODE = 'set_licensecode';
export const GET_LICENSECODE = 'get_licensecode';
export const SET_SESSION = 'set_session'

export const activateModule = (payload) => {
    return {
        type: ADD_TYPE,
        payload
    }
}

export const setSession = (payload) => {
    return {
        type: SET_SESSION,
        payload
    }
}

export const setVIN = (payload) => {
    return {
        type: SET_VINCODE,
        payload
    }
}

export const setLicense = (payload) => {
    return {
        type: SET_LICENSECODE,
        payload
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
