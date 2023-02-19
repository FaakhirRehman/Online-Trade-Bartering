import axios from "../helpers/axios";
import { authConstants, userConstants } from "./constants";

export const signup = (user) => {
    return async (dispatch) => {

        dispatch({ type: userConstants.USER_REGISTRATION_REQUEST });

        const res = await axios.post(`/admin/signup`, {
            ...user
        });

        if(res.status ===  200){
            const { message } = res.data;
            dispatch({
                type: userConstants.USER_REGISTRATION_SUCCESS,
                payload: {
                    message
                }
            })
        } else {
             dispatch({
                type: userConstants.USER_REGISTRATION_FAILED,
                payload: { error: res.data.error }
             })
        }

    }
}