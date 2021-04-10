/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import { all, takeEvery, put, select, call, fork } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import API from '../../../api/ApiConstants';
import * as apiService from "../../../services/index";

import { Alert } from 'react-native';
// import loginUser from 'app/api/methods/loginUser';
import * as loginActions from '../actions';
import { getToken, setToken } from "../../../services/asyncStorage";
import { trimString } from "../../../utils/stringUtils";

import { HeaderAuth, Header } from '../../../services/header';

let loginState = state => state.loginReducer;

// Our worker Saga that logins the user
export default function* loginAsync() {
  // init state from reducer
  const getLoginState = yield select(loginState);
  
  // init the param for api
  const emailTrimmed = trimString(getLoginState.emailForm);

  const param = {
    email: emailTrimmed,
    password: getLoginState.passwordForm,
  }

  try {
    if(param.email != null || param.email == ""){
      if(param.password != null || param.password == ""){
        const _response = yield call(apiService.POST, API.BASE_URL + API.ENDPOINT.LOGIN, param, Header());
        if(_response.data.status === 200){
          // set token for async storage
          yield setToken(_response.data.token)
          yield put(loginActions.clearForm())
          yield put(loginActions.onLoginResponse(_response.data.user))
          yield put(loginActions.disableLoading())
        }else{
          yield put(loginActions.loginFailed())
          yield put(loginActions.disableLoading())
          setTimeout(() => {
            Alert.alert('Keeponic Login', _response.data.message);
          }, 200);
        }
      }else{
        setTimeout(() => {
          Alert.alert('Keeponic Login', "Form Password harus terisi");
        }, 200);
      }
    }else{
      setTimeout(() => {
        Alert.alert('Keeponic Login', "Form Email harus terisi");
      }, 200);
    }
  } catch (error) {
    console.log("INI CATCH", error.message)
  }
}
