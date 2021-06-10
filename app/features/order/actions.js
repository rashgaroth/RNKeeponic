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

export const getOrderedList = (status, status_between) => {
    return {
        type: types.GET_ORDERED_LIST,
        status,
        status_between
    }
}

export const setLoadingModal = (data) => {
    return {
        type: types.SET_LOADING_MODAL,
        data
    }
}

export const getTracking = (shipmentCode) => {
    return {
        type: types.GET_TRACKING,
        shipmentCode
    }
}

export const getTrackingSuccess = (data) => {
    return {
        type: types.GET_TRACKING_SUCCESS,
        data,
    }
}

export const passTrackingHistory = (data) => {
    return {
        type: types.PASSING_HISTORY,
        data,
    }
}

export const deleteSendedItems = (data, index) => {
    return {
        type: types.DELTE_SENDED_ITEMS,
        data,
        index
    }
}

export const postRating = (rating, invoice) => {
    return {
        type: types.POST_RATINGS,
        rating,
        invoice
    }
}