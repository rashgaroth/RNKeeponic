import * as types from './types';

export function requestHome(name, userId) {
    return {
        type: types.HOME_REQUEST,
        name,
        userId
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