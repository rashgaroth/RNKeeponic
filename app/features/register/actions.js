import * as types from "./types";

export function getAddress(){
    return {
        type: types.GET_ADDRESS
    }
}

export function getAddressSuccess(city, prov, subdist){
    return {
        type: types.GET_ADDRESS_SUCCESS,
        city,
        prov,
        subdist
    }
}

export function onChangeEmail(text){
    return{
        type: types.ON_CHANGE_EMAIL,
        text
    }
}

export function onChangePassword(text) {
    return {
        type: types.ON_CHANGE_PASSWORD,
        text
    }
}

export function onChangeConfirmationPassword(text) {
    return {
        type: types.ON_CHANGE_CONFIRMATION,
        text
    }
}

export function onChangePhone(text) {
    return {
        type: types.ON_CHANGE_PHONE_NUMBER,
        text
    }
}

export function onChangeName(text) {
    return {
        type: types.ON_CHANGE_NAME,
        text
    }
}

export function onChangeDetail(text) {
    return {
        type: types.ON_CHANGE_DETAILS,
        text
    }
}

export function onChangePostalCode(text) {
    return {
        type: types.ON_CHANGE_POSTAL_CODE,
        text
    }
}

export function submitRegistration(data) {
    return {
        type: types.SUBMIT_REGISTRATION,
        data
    }
}

export function onChangeVerification(text) {
    return {
        type: types.ON_CHANGE_VERIFICATION,
        text
    }
}

export function setLoader(data, loader) {
    return {
        type: types.SET_LOADING,
        data,
        loader
    }
}

export function submitVerification(data) {
    return {
        type: types.SUBMIT_VERIFICATION,
        data
    }
}