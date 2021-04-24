import * as types from "./types";

export const showLoading = () => {
    return {
        type: types.SHOW_LOADING,
    }
}

export const hideLoading = () => {
    return {
        type: types.HIDE_LOADING
    }
}

export const getDetailProduct = (payload) => {
    return {
        type: types.GET_DETAIL_PRODUCT,
        payload
    }
}

export const onSuccessGetDetail = (data) => {
    return {
        type: types.GET_DETAIL_SUCCESS,
        data
    }
}

export const clearProduct = () => {
    return {
        type: types.CLEAR_PRODUCT
    }
}