import * as types from "./types";

export const showLoading = () => {
    return {
        type: types.SHOW_LOADING,
    }
}

export const setLoading = (loader) => {
    return {
        type: types.SET_LOADING,
        loader
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

export const setProductOnReducer = (data, image) => {
    return {
        type: types.SET_PRODUCT_ON_REDUCER,
        data,
        image
    }
}

export const setMarketOnReducer = (data) => {
    return {
        type: types.SET_MARKET_ON_REDUCER,
        data
    }
}

export const setCategory = (data) => {
    return {
        type: types.SET_CATEGORY,
        data
    }
}

export const setWishlistData = (data) => {
    return{
        type: types.SET_WISHLIST_DATA,
        data
    }
}

// ---------------------------- new Action for wishlist ---------------------- //
export const onAddWishlist = (data, productData) => {
    return{
        type: types.ON_ADD_WISHLIST,
        data,
        productData,
    }
}

export const getProductLoves = (data) => {
    return{
        type: types.GET_PRODUCT_LOVE,
        data
    }
}