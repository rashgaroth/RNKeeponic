/* Home Reducer
 * handles state in the home feature
 */
import createReducer from 'app/lib/createReducer';
import * as types from "./types";
import { IProductDetail } from "../interfaces";

const initialState:IProductDetail = {
    loading: true,
    market_id: null,
    avatar: null,
    category: {
        id: null,
        name: "",
        status: null,
    },
    mMarket: {
        id: null,
        owner_sec_user_id: null,
        market_name: "",
        description: "",
        avatar: "",
        banner: null,
        followers: null,
        status: null,
        created_date: "",
        updated_date: null,
        address: {
            owner_market_subdistrict: null,
            owner_market_subdistrict_name: "",
            owner_market_city: null,
            owner_market_city_name: ""
        }
    },
    mProducts: {
        id: null,
        name: "",
        t_category_id : null,
        description: "",
        price: null,
        avatar: "",
        second_avatar: "",
        third_avatar: "",
        fourth_avatar: "",
        stock: null,
        weight: null,
        status: null,
        rating: null,
        is_sold: null,
        created_date: "",
        updated_date: "",
        m_product_model : null
    },
    productInWishList: [],
    productWishlistData: null,
    isFavorite: 0,
    addToWishlist: false,
};

export const detailProductReducer = createReducer(initialState, {
    [types.GET_DETAIL_PRODUCT](state, action) {
        return {
            ...state,
            loading: true,
            // mProducts: {
            //     ...state.mProducts,
            //     id: null,
            //     name: "",
            //     t_category_id: null,
            //     description: "",
            //     price: null,
            //     avatar: "",
            //     second_avatar: "",
            //     third_avatar: "",
            //     fourth_avatar: "",
            //     stock: null,
            //     weight: null,
            //     status: null,
            //     rating: null,
            //     is_sold: null,
            //     created_date: "",
            //     updated_date: "",
            //     m_product_model: null
            // },
        };
    },
    [types.SHOW_LOADING](state, action) {
        return {
            ...state,
            loading: true,
        };
    },
    [types.HIDE_LOADING](state, action) {
        return {
            ...state,
            loading: false,
        };
    },
    [types.SET_WISHLIST_CART_DETAILS](state, action) {
        return {
            ...state,
            addToWishlist: action.data,
        };
    },
    [types.CLEAR_PRODUCT](state, action) {
        return {
            ...state,
            avatar: null,
            loading: true,
            mProducts: {
                ...state.mProducts,
                id: null,
                name: "",
                t_category_id: null,
                description: "",
                price: null,
                avatar: "",
                second_avatar: "",
                third_avatar: "",
                fourth_avatar: "",
                stock: null,
                weight: null,
                status: null,
                rating: null,
                is_sold: null,
                created_date: "",
                updated_date: "",
                m_product_model: null
            },
            mMarket: {
                ...state.mMarket,
                id: null,
                owner_sec_user_id: null,
                market_name: "",
                description: "",
                avatar: "",
                banner: null,
                followers: null,
                status: null,
                created_date: "",
                updated_date: null,
                address: {
                    ...state.mMarket.address,
                    owner_market_subdistrict: null,
                    owner_market_subdistrict_name: "",
                    owner_market_city: null,
                    owner_market_city_name: ""
                }
            },
        };
    },
    [types.SET_PRODUCT_ON_REDUCER](state, action) {
        return {
            ...state,
            mProducts: {
                ...state.mProducts,
                id: action.data.id,
                name: action.data.name,
                t_category_id: action.data.t_category_id,
                description: action.data.description,
                price: action.data.price,
                avatar: action.data.avatar,
                second_avatar: action.data.second_avatar,
                third_avatar: action.data.third_avatar,
                fourth_avatar: action.data.fourth_avatar,
                stock: action.data.stock,
                weight: action.data.weight,
                status: action.data.status,
                rating: action.data.rating,
                is_sold: action.data.is_sold,
                created_date: action.data.created_date,
                updated_date: action.data.updated_date,
                m_product_model: action.data.m_product_model
            },
            avatar: action.image
        };
    },
    [types.SET_MARKET_ON_REDUCER](state, action) {
        return {
            ...state,
            mMarket: {
                ...state.mMarket,
                id: action.data.id,
                owner_sec_user_id: action.data.owner_sec_user_id,
                market_name: action.data.market_name,
                description: action.data.description,
                avatar: action.data.avatar,
                banner: action.data.banner,
                followers: action.data.followers,
                status: action.data.status,
                created_date: action.data.created_date,
                updated_date: action.data.updated_date
            },
        };
    },
    [types.SET_LOADING](state, action) {
        return {
            ...state,
            loading: action.loader,
            avatar: null
        };
    },
    [types.SET_MARKET_ADDRESS](state, action){
        return {
            ...state,
            mMarket: {
                ...state.mMarket,
                address: {
                    ...state.mMarket.address,
                    owner_market_subdistrict: action.data.owner_market_subdistrict,
                    owner_market_subdistrict_name: action.data.owner_market_subdistrict_name,
                    owner_market_city: action.data.owner_market_city,
                    owner_market_city_name: action.data.owner_market_city_name
                }
            }
        }
    },
    [types.SET_CATEGORY](state, action) {
        return {
            ...state,
            category: {
                ...state.category,
                id: action.data.id,
                name: action.data.name,
                status: action.data.status,
            }
        };
    },
    [types.SET_WISHLIST_DATA](state, action) {
        return {
            ...state,
            productWishlistData: action.data
        };
    },
    // new reducer for wishlist
    [types.ON_ADD_WISHLIST](state, action) {
        return {
            ...state,
            productInWishList: [...state.productInWishList, action.data]
        };
    },
    [types.GET_PRODUCT_LOVE](state, action) {
        return {
            ...state,
            isFavorite: action.data
        };
    },
    [types.SET_PRODUCT_DETAILS](state, action){
        return {
            ...state,
            mProducts: {
                id: action.id,
                name: action.name,
                t_category_id: action.t_category_id,
                description: action.description,
                price: action.price,
                avatar: action.avatar,
                second_avatar: action.second_avatar,
                third_avatar: action.thrid_avatar,
                fourth_avatar: action.fourth_avatar,
                stock: action.stock,
                weight: action.weight,
                status: action.status,
                rating: action.rating,
                is_sold: action.is_sold,
                created_date: action.created_date,
                updated_date: action.updated_date,
                m_product_model: action.m_product_model
            },
        }
    }
});
