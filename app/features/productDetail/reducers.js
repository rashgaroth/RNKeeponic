/* Home Reducer
 * handles state in the home feature
 */
import createReducer from 'app/lib/createReducer';
import * as types from "./types";

const initialState = {
    loading: false,
    product: null,
    market_id: null,
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
    [types.GET_DETAIL_SUCCESS](state, action) {
        return {
            ...state,
            product: action.data,
        };
    },
    [types.CLEAR_PRODUCT](state, action) {
        return {
            ...state,
            product: null,
            market_id: null
        };
    },
});
