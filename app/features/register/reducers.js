/* Home Reducer
 * handles state in the home feature
 */
import createReducer from 'app/lib/createReducer';
import * as types from './types';

const initialState = {
    address: {
        province: [],
        city: [],
        subdistrict: []
    },
    userData: {
        email: "",
        password: "",
        confirmationPassword: "",
        phone: "",
        name: "",
        detailAddress: "",
        postalCode: "",
        verification: "",
        subdistrict: 0
    },
    registrantData: {
        id: null,
        is_email_validated: "",
        name: "",
        email: "",
        username: "",
        password: "",
        phone: "",
        status: null,
        created_date: "",
        created_by: "",
        updated_date: null,
        updated_by: null
    },
    loginResponse: {
        auth_data: null,
        auth_profile_id: null, 
        auth_provider: null, 
        avatar: "",
        email: "", 
        id: null, 
        is_admin: null, 
        is_email_validated: null, 
        is_phone_validated: "", 
        name: "", 
        password: "", 
        phone: "", 
        status: null, 
        username: "" 
    },
    loading: false,
    loadingPassword: false,
    loadingEmail: false,
    loadingNext: false,
    errorType: "",
    errorMsg : {
        msg: "",
        buttonMsg: "",
        visible: false,
        field: "",
        error: false
    }
};

export const registerReducer = createReducer(initialState, {
    [types.GET_ADDRESS](state, action) {
        return {
            ...state,
            address: {
                ...state.address,
                province: [],
                city: [],
                subdistrict: []
            }
        };
    },
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
    [types.SUBMIT_REGISTRATION_FAILED](state, action) {
        return {
            ...state,
            errorType: action.data,
            errorMsg: {
                ...state.errorMsg,
                msg: `email ${action.data} telah terdaftar`,
                visible: false,
                error: true,
            }
        };
    },
    [types.SUBMIT_REGISTRATION_SUCCESS](state, action) {
        return {
            ...state,
            registrantData: {
                ...state.registrantData,
                id: action.data.id,
                is_email_validated: action.data.is_email_validated,
                name: action.data.name,
                email: action.data.email,
                username: action.data.username,
                password: action.data.password,
                phone: action.data.phone,
                status: action.data.status,
                created_date: action.data.created_date,
                created_by: action.data.created_by,
                updated_date: action.data.updated_date,
                updated_by: action.data.updated_by,
            },
        };
    },
    [types.SET_CLEAR_VALUE](state, action) {
        return {
            ...state,
            address: {
                ...state.address,
                province: [],
                city: [],
                subdistrict: []
            },
            userData: {
                ...state.userData,
                email: "",
                password: "",
                confirmationPassword: "",
                phone: "",
                name: "",
                detailAddress: "",
                postalCode: "",
                verification: "",
                subdistrict: 0
            },
            registrantData: {
                ...state.registrantData,
                id: null,
                is_email_validated: "",
                name: "",
                email: "",
                username: "",
                password: "",
                phone: "",
                status: null,
                created_date: "",
                created_by: "",
                updated_date: null,
                updated_by: null
            },
            loginResponse: {
                ...state.loginResponse,
                auth_data: null,
                auth_profile_id: null,
                auth_provider: null,
                avatar: "",
                email: "",
                id: null,
                is_admin: null,
                is_email_validated: null,
                is_phone_validated: "",
                name: "",
                password: "",
                phone: "",
                status: null,
                username: ""
            },
            errorType: "",
            errorMsg: {
                ...state.errorMsg,
                msg: "",
                buttonMsg: "",
                visible: false,
                field: "",
                error: false
            },
            loading: false,
            loadingPassword: false,
            loadingEmail: false,
        };
    },
    [types.SET_ERROR](state, action) {
        return {
            ...state,
            errorMsg: {
                ...state.errorMsg,
                msg: action.msg,
                buttonMsg: action.buttonMsg,
                visible: action.loader,
                field: action.field,
                error: action.isError,
            }
        };
    },
    [types.SET_ERROR](state, action) {
        return {
            ...state,
            address: {
                ...state.address,
                province: [],
                city: [],
                subdistrict: []
            },
        };
    },
    [types.ON_SUCCESS_VERIFICATION](state, action) {
        return {
            ...state,
            loginResponse: {
                ...state.loginResponse,
                auth_data: action.data.auth_data,
                auth_profile_id: action.data.auth_profile_id,
                auth_provider: action.data.auth_provider,
                avatar: action.data.avatar,
                email: action.data.email,
                id: action.data.id,
                is_admin: action.data.is_admin,
                is_email_validated: action.data.is_email_validated,
                is_phone_validated: action.data.is_phone_validated,
                name: action.data.name,
                password: action.data.password,
                phone: action.data.phone,
                status: action.data.status,
                username: action.data.username
            },
        };
    },
    [types.SET_SUBDISTRICT](state, action) {
        return {
            ...state,
            userData: {
                ...state.userData,
                subdistrict: action.data
            }
        };
    },
    [types.ON_CHANGE_POSTAL_CODE](state, action) {
        return {
            ...state,
            userData: {
                ...state.userData,
                postalCode: action.data
            }
        };
    },
    [types.ON_CHANGE_DETAILS](state, action) {
        return {
            ...state,
            userData: {
                ...state.userData,
                detailAddress: action.data
            }
        };
    },
});
