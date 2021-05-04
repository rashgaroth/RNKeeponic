/* Home Reducer
 * handles state in the home feature
 */
import createReducer from 'app/lib/createReducer';
import * as types from "./types";

const initialState = {
    loading: false,
    market_id: null,
    avatar: null,
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
        updated_date: null
    },
    mProducts: {
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
    }
};

export const detailProductReducer = createReducer(initialState, {
    [types.GET_DETAIL_PRODUCT](state, action) {
        return {
            ...state,
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
    // [types.GET_DETAIL_SUCCESS](state, action) {
    //     return {
    //         ...state,
    //         product: action.data,
    //     };
    // },
    [types.CLEAR_PRODUCT](state, action) {
        return {
            ...state,
            avatar: null,
            mProducts: {
                ...state.mProducts,
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
                updated_date: null
            },
        };
    },
    [types.SET_PRODUCT_ON_REDUCER](state, action) {
        return {
            ...state,
            mProducts: {
                ...state.mProducts,
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
});
