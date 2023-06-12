import * as Constants from '../../constants/actions/SignUp';

/** 
 * @name INITIAL_STATE
 * @constant 
 * @description
 * @type {Object}
 * @default
*/
const INITIAL_STATE = {
    saveRegister: '',
    loginDetails: {},
    phoneCodeDetails: {},
    products: {},
    getProducts: [],
    getCategories: []
};

/**
 * **DO NOT** Manipulate the state directly, always apply to a new object first!!
 * 
 * @name reducer
 * @function
 * @description Handles reduction of data across components
 * @param {Object} state Current state of the data
 * @param {Object} action Information passed from the corresponding actions file
 */
const reducer = (state = INITIAL_STATE, action) => {
    // if (action.payload && action.payload.err) return { ...state, err: action.payload.err };
    switch (action.type) {
        case Constants.SAVE_REGISTER:
            return { ...state, saveRegister: action.payload.message };
        case Constants.USER_LOGIN:
            return { ...state, loginDetails: action.payload.loginDetails };
        case Constants.PHONE_CODE:
            return { ...state, phoneCodeDetails: action.payload.phoneCodeDetails };
        case Constants.GET_PRODUCTS:
            return { ...state, products: action.payload.getProducts.products, getCategories: action.payload.getProducts, getProducts: action.payload.getProducts.products, getCategories: action.payload.getProducts.categories };
        default:
            return state;
    }
}

export default reducer;