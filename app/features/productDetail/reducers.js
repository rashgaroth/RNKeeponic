/* Home Reducer
 * handles state in the home feature
 */
import createReducer from 'app/lib/createReducer';
import * as types from "./types";

const initialState = {
    loading: false,
    market_id: null,
    avatar: null,
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
});
