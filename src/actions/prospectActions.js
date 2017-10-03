
export const LOAD_PROSPECT_DATA    = 'load_prospect_data'
export const GET_PROSPECT_INFO     = 'get_prospect_info'
export const INITIALIZE_PROSPECT   = 'initialize_prospect'
export const SET_LICENSE          = 'set_license'


export const loadProspect = (payload) => {
    return {
        type: LOAD_PROSPECT_DATA,
        payload
    }
}

export const getProspectInfo = () => {
    return {
        type: GET_PROSPECT_INFO,
    }
}

export const initializeProspect = (payload) => {
    return {
        type: INITIALIZE_PROSPECT,
        payload
    }
}

export const setLICENSE = (license) => {
    return {
        type: SET_LICENSE,
        license
    }
}
