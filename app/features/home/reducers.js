/* Home Reducer
 * handles state in the home feature
 */
import createReducer from 'app/lib/createReducer';
import * as types from "./types";
import { IHome } from "../interfaces";

const initialState = {
    isLoading: true,
    spinnerLoading: false,
    isSkeleton: false,
    isError: false,
    isSeller: false,
    isUserAddress: false,
    scrollY: 0,
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
    mediaTanam: null,
    greenHouse: null,
    bibit: null,
    allProducts: null,
    category: {
        loadingCategory: false,
        page: 0,
        size: 10,
        hot: [],
        mediaTanam: [],
        bibit: [],
        greenHouse: [],
        allCategoryProducts: [],
    }
};

export const homeReducer = createReducer(initialState, {
    [types.SHOW_LOADING](state){
        return {
            ...state,
            isLoading: true
        }
    },
    // category success
    [types.SET_PAGINATION](state, action) {
        return {
            ...state,
            category: {
                ...state.category,
                [action.field] : action.data
            }
        }
    },
    [types.CLEAN_UP_CATEGORY](state) {
        return {
            ...state,
            category: {
                ...state.category,
                hot: [],
                mediaTanam: [],
                bibit: [],
                greenHouse: [],
                allCategoryProducts: [],
            }
        }
    },
    [types.ON_SUCCESS_GET_HOT_CATEGORY](state, action) {
        return {
            ...state,
            category: {
                ...state.category,
                hot: action.data
            }
        }
    },
    [types.ON_SUCCESS_GET_MEDIA_TANAM](state, action) {
        return {
            ...state,
            category: {
                ...state.category,
                mediaTanam: action.data
            }
        }
    },
    [types.ON_SUCCESS_GET_BIBIT](state, action) {
        return {
            ...state,
            category: {
                ...state.category,
                bibit: action.data
            }
        }
    },
    [types.ON_SUCCESS_GET_GREEN_HOUSE](state, action) {
        return {
            ...state,
            category: {
                ...state.category,
                greenHouse: action.data
            }
        }
    },
    [types.ON_SUCCESS_GET_ALL_PRODUCTS](state, action) {
        return {
            ...state,
            category: {
                ...state.category,
                allCategoryProducts: [...state.category.allCategoryProducts, action.data]
            }
        }
    },
    // on success ended
    [types.CATEGORY_GET_HOT_PRODUCTS](state, action) {
        return {
            ...state,
            category: {
                ...state.category,
                hot: [],
            }
        }
    },
    [types.CATEGORY_GET_MEDIA_TANAM](state, action) {
        return {
            ...state,
            category: {
                ...state.category,
                mediaTanam: [],
            }
        }
    },
    [types.CATEGORY_GET_BIBIT](state, action) {
        return {
            ...state,
            category: {
                ...state.category,
                bibit: [],
            }
        }
    },
    [types.CATEGORY_GET_GREEN_HOUSE](state, action) {
        return {
            ...state,
            category: {
                ...state.category,
                greenHouse: [],
            }
        }
    },
    [types.CATEGORY_GET_ALL_PRODUCTS](state, action) {
        return {
            ...state,
        }
    },
    // category
    [types.HOME_REQUEST](state){
        return {
            ...state,
            products: null,
            mediaTanam: null,
            greenHouse: null,
            bibit: null,
            allProducts: null
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
            [action.field] : action.products
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
    [types.SET_IS_USER_ADDRESS](state, action) {
        return {
            ...state,
            isUserAddress: action.data
        }
    },
    [types.SET_SELLER](state) {
        return {
            ...state,
            isSeller: true
        }
    },
    [types.SET_ADDRESS](state, action) {
        return {
            ...state,
            userAddress: {
                ...state.userAddress,
                [action.field]: action.data,
            },
        }
    },
    [types.SET_SELLER_FALSE](state){
        return{
            ...state,
            isSeller: false
        }
    },
    [types.SET_SCROLL_Y](state, action) {
        return {
            ...state,
            scrollY: action.data
        }
    },
    [types.CLEAR_USER](state, action) {
        return {
            ...state,
            userProfile: {
                ...state.userProfile,
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
            userAddress: {
                ...state.userAddress,
                subdistrict: "",
                city: "",
                prov: ""
            }
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
            userAddress: {
                ...state.userAddress,
                subdistrict: action.address.subdistrict,
                city: action.address.city,
                prov: action.address.province
            }
        }
    },

});
