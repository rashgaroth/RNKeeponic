import * as types from "./types";

export const setData = (data, field) => {
    return {
        type: types.SET_DATA_SHIPMENT,
        data,
        field
    }
}

export const setAddressLists = (data) => {
    return {
        type: types.SET_ADDRESS_LIST,
        data
    }
}

export const setPaymentUrl = (data) => {
    return {
        type: types.SET_PAYMENT_URL,
        data
    }
}

export const getWishlist = () => {
    return {
        type: types.GET_WISHLIST
    }
}

export const setLoading = (isLoading) => {
    return {
        type: types.SET_LOADING,
        isLoading
    }
}

export const setEmpty = (isEmpty) => {
    return {
        type: types.SET_EMPTY,
        isEmpty
    }
}

export const setWishlistData = (field, data) => {
    return {
        type: types.STORE_WISHLIST,
        field,
        data
    }
}

export const updateProduct = (productId) => {
    return {
        type: types.UPDATE_STATUS_WISHLIST,
        productId
    }
}