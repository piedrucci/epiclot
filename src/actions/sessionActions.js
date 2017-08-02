
export const SET_SESSION_INFO = 'set_session_info'


export const setSession = (info) => {
    return {
        type: SET_SESSION_INFO,
        info
    }
}
