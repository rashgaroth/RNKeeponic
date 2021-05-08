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

export function onSubmitRegistrationSuccess(data){
    return {
        type: types.SUBMIT_REGISTRATION_SUCCESS,
        data
    }
}

export function onSubmitRegistrationFailed(data){
    return {
        type: types.SUBMIT_REGISTRATION_FAILED,
        data
    }
}

export function setClearValue(){
    return {
        type: types.SET_CLEAR_VALUE
    }
}

export function setError(msg, buttonMsg, loader, field, isError){
    return {
        type: types.SET_ERROR,
        msg,
        buttonMsg,
        loader,
        field,
        isError
    }
}

export function setClearAddress(){
    return {
        type: types.SET_CLEAR_ADDRESS
    }
}

export function onSuccessVerification(data){
    return {
        type: types.ON_SUCCESS_VERIFICATION,
        data
    }
}

// export function submitAddress(){
//     return {
//         type: types.SUBMIT_ADDRESS
//     }
// }

export function submitAddressSuccess(data){
    return {
        type: types.SUBMIT_ADDRESS_SUCCESS,
        data
    }
}

export function onChangeSubdistrict(data){
    return {
        type: types.SET_SUBDISTRICT,
        data
    }
}

export function onChangePostalCode(data) {
    return {
        type: types.ON_CHANGE_POSTAL_CODE,
        data
    }
}

export function onChangeDetailAddress(data) {
    return {
        type: types.ON_CHANGE_DETAILS,
        data
    }
}

export function submitAddress(){
    return {
        type: types.SET_ADDRESS
    }
}