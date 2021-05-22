import * as types from './types';

export function requestHome(name, userId, page) {
    return {
        type: types.HOME_REQUEST,
        name,
        userId,
        page
    };
}

export function showLoading(){
    return {
        type: types.SHOW_LOADING
    };
}

export function hideLoading(){
    return {
        type: types.HIDE_LOADING
    };
}

export function getProductSuccess(products){
    return{
        type: types.HOME_GET_PRODUCTS,
        products
    }
}

export function homeTokenNotFound(){
    return{
        type: types.HOME_TOKEN_EXPIRED,
    }
}

export function spinnerLoadingShow(){
    return{
        type: types.SPINNER_LOADING
    }
}

export function hideSpinnerLoadingShow() {
    return {
        type: types.HIDE_SPINNER_LOADING
    }
}

export function getUserProfile(key, userId) {
    return {
        type: types.GET_USER_PROFILE,
        key,
        userId,
    }
}

export function getUserProfileSuccess(data, address) {
    return {
        type: types.GET_PROFILE_SUCCESS,
        data,
        address
    }
}

export function getAllProducts(data) {
    return {
        type: types.GET_ALL_PRODUCTS,
        data
    }
}

export function setSeller() {
    return {
        type: types.SET_SELLER
    }
}

export function setSellerFalse() {
    return {
        type: types.SET_SELLER_FALSE
    }
}