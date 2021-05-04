/* Home Reducer
 * handles state in the home feature
 */
import createReducer from 'app/lib/createReducer';
import * as types from "./types";

const initialState = {
    isLoading: false,
    spinnerLoading: false,
    isSkeleton: false,
    isError: false,
    userProfile: {
        name: "",
        email: "",
        username: "",
        is_email_validated: null,
        phone: "",
        is_phone_validated: null,
        avatar: null,
        auth_provider: null,
        auth_profile_id: null,
        auth_data: null,
        is_admin: null,
        status: null,
    },
    userAddress:{
        subdistrict: "",
        city: "",
        prov: ""
    },
    user: {
        username: "",
        email: "",
    },
    address: {
        province: "",
        subdistricts: "",
        city: "",
        detail: ""
    },
    dummyProducts: {
        flatListWideView: [
            {
                id: 1,
                name: "Hidroponik berharga mehoong sekali...",
                image: "https://images.pexels.com/photos/7267618/pexels-photo-7267618.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                text: "ini menyenangkan, banyak anak .."
            },
            {
                id: 2,
                name: "Product2",
                image: "https://images.pexels.com/photos/1418893/pexels-photo-1418893.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                text: "ini menyenangkan, banyak anak .."
            },
            {
                id: 3,
                name: "Product3",
                image: "https://images.pexels.com/photos/7301521/pexels-photo-7301521.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                text: "ini menyenangkan, banyak anak .."
            },
        ]
    },
    products: null,
    allProducts: null
};

export const homeReducer = createReducer(initialState, {
    [types.SHOW_LOADING](state){
        return {
            ...state,
            isLoading: true
        }
    },
    [types.HIDE_LOADING](state) {
        return {
            ...state,
            isLoading: false
        }
    },
    [types.HOME_GET_PRODUCTS](state, action) {
        return {
            ...state,
            products : action.products
        }
    },
    [types.GET_ALL_PRODUCTS](state, action) {
        return {
            ...state,
            allProducts: action.data
        }
    },
    [types.HOME_TOKEN_EXPIRED](state) {
        return {
            ...state,
            isError: true
        }
    },
    [types.GET_PROFILE_SUCCESS](state, action) {
        return {
            ...state,
            userProfile: {
                ...state.userProfile,
                name: action.data.name,
                email: action.data.email,
                username: action.data.username,
                is_email_validated: action.data.is_email_validated,
                phone: action.data.phone,
                is_phone_validated: action.data.is_phone_validated,
                avatar: action.data.avatar,
                auth_provider: action.data.auth_provider,
                auth_profile_id: action.data.auth_profile_id,
                auth_data: action.data.auth_data,
                is_admin: action.data.is_admin,
                status: action.data.status,
            },
        }
    },
});
