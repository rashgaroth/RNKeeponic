/* Home Reducer
 * handles state in the home feature
 */
import createReducer from 'app/lib/createReducer';
import * as types from './types';

const initialState = {
    address: {
        province: null,
        city: null,
        subdistrict: null
    },
    userData: {
        email: "",
        password: "",
        confirmationPassword: "",
        phone: "",
        name: "",
        detailAddress: "",
        postalCode: "",
        verification: ""
    },
    loading: false,
    loadingPassword: false
};

export const registerReducer = createReducer(initialState, {
    [types.GET_ADDRESS_SUCCESS](state, action) {
        return {
            ...state,
            address: {
                ...state.address,
                province: action.prov,
                city: action.city,
                subdistrict: action.subdist
            }
        };
    },
    [types.ON_CHANGE_EMAIL](state, action) {
        return {
            ...state,
            userData: {
                ...state.userData,
                email: action.text
            }
        };
    },
    [types.ON_CHANGE_PASSWORD](state, action) {
        return {
            ...state,
            userData: {
                ...state.userData,
                password: action.text
            }
        };
    },
    [types.ON_CHANGE_CONFIRMATION](state, action) {
        return {
            ...state,
            userData: {
                ...state.userData,
                confirmationPassword: action.text
            }
        };
    },
    [types.ON_CHANGE_PHONE_NUMBER](state, action) {
        return {
            ...state,
            userData: {
                ...state.userData,
                phone: action.text
            }
        };
    },
    [types.ON_CHANGE_DETAILS](state, action) {
        return {
            ...state,
            userData: {
                ...state.userData,
                detailAddress: action.text
            }
        };
    },
    [types.ON_CHANGE_POSTAL_CODE](state, action) {
        return {
            ...state,
            userData: {
                ...state.userData,
                postalCode: action.text
            }
        };
    },
    [types.ON_CHANGE_NAME](state, action) {
        return {
            ...state,
            userData: {
                ...state.userData,
                name: action.text
            }
        };
    },
    [types.ON_CHANGE_VERIFICATION](state, action) {
        return {
            ...state,
            userData: {
                ...state.userData,
                verification: action.text
            }
        };
    },
    [types.SET_LOADING](state, action) {
        return {
            ...state,
            [action.loader]: action.data
        };
    },
});
