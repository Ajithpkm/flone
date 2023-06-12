import * as Constants from '../../constants/actions/SignUp';
import {SignUpApi} from './SignUpApi';

export const saveRegister = (payload) => {
    return async dispatch => {
        const [success, message] = await SignUpApi.saveRegisterDetails(payload);
        return dispatch({
            type: Constants.SAVE_REGISTER,
            payload: { success, message }
        })
    }
}

export const userLogin = (payload) => {
    return async dispatch => {
        const [success, loginDetails] = await SignUpApi.loginDetails(payload);
        return dispatch({
            type: Constants.USER_LOGIN,
            payload: { success, loginDetails }
        })
    }
}

export const getPhoneCodeDetails = (payload) => {
    return async dispatch => {
        const [success, phoneCodeDetails] = await SignUpApi.getPhoneCodeDetails(payload);
        return dispatch({
            type: Constants.PHONE_CODE,
            payload: { success, phoneCodeDetails }
        })
    }
}
