/*
 * Reducer actions related with login
 */
import * as types from './types';

export function requestLogin() {
  return {
    type: types.LOGIN_REQUEST,
  };
}

export function loginFailed() {
  return {
    type: types.LOGIN_FAILED,
  };
}

export function onLoginResponse(response) {
  return {
    type: types.LOGIN_RESPONSE,
    response,
  };
}

export function enableLoader() {
  return {
    type: types.LOGIN_ENABLE_LOADER,
  };
}

export function disableLoader() {
  return {
    type: types.LOGIN_DISABLE_LOADER,
  };
}

export function logOut() {
  return {
    type: types.LOG_OUT,
  };
}

export function setUsername(text){
  return {
    type: types.SET_USERNAME,
    text
  };
}

export function setPassword(text) {
  return {
    type: types.SET_PASSWORD,
    text
  };
}

export function clearForm(){
  return {
    type: types.CLEAR_FORM
  }
}

export function disableLoading(){
  return {
    type: types.DISABLE_LOADING
  }
}

export function loginFromRegister(){
  return {
    type: types.LOGIN_FROM_REGISTER
  }
}

export function setToken(data){
  return{
    type: types.SET_TOKEN,
    data
  }
}

export function loginGoogleAuth(data){
  return {
    type: types.LOGIN_GOOGLE_AUTH,
    data
  }
}

export function onSuccessGoogleAuth(data){
  return {
    type: types.LOGIN_GOOGLE_AUTH_SUCCESS,
    data
  }
}

export function setPhoneUpdated(data){
  return {
    type: types.SET_USER_PHONE_UPDATED,
    data
  }
}