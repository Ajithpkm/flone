import axios from 'axios';
import * as API from '../../constants/api/SignUp';

export const SignUpApi = {

    async saveRegisterDetails(payload) {
        try {
            const response = await axios.post(API.SAVE_REGISTER, payload);
            return [true, response?.data?.message];
        } catch (error) {
            return [false, error.response.data.message];
        }
    },

    async loginDetails(payload) {
        try {
            const response = await axios.post(API.USER_LOGIN, payload);
            return [true, response?.data];
        } catch (error) {
            return [false, error.response.data.message];
        }
    },

    async getPhoneCodeDetails() {
        try {
            const response = await axios.get(API.PHONE_CODE);
            return [true, response?.data];
        } catch (error) {
            return [false, error.response.data.message];
        }
    }

}