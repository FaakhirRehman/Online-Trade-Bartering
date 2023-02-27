import { userConstants } from "../actions/constants"

const initState = {
    error: null,
    message: 'null',
    loading: false
}

export default (state = initState, action) => {
    switch(action.type){
        case userConstants.USER_REGISTRATION_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case userConstants.USER_REGISTRATION_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message
            }
            break;
        case userConstants.USER_REGISTRATION_FAILED:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
    }

    return state;
}
