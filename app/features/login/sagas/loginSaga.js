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
import { getToken, setToken, storeData, getStore } from "../../../services/asyncStorage";
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
          const user = _response.data.user;
          console.log(_response.data.token)
          yield setToken(_response.data.token)
          yield storeData("email", user.email)
          yield storeData("is_email_validated", user.is_email_validated)
          yield storeData("name", user.name)
          yield storeData("user_id", user.user_id)

          // getStore("user_id").then((value) => (
          //   console.log(value, "-----------VALUE---------------")
          // )).catch((e) => console.log(e))

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
    yield put(loginActions.disableLoading())
    setTimeout(() => {
      Alert.alert('Keeponic Login', error.message);
    }, 200);
  }
}
