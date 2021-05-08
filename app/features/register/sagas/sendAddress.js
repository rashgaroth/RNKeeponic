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
import * as registerActions from '../actions';
import * as loginActions from '../../login/actions';
import { trimString } from "../../../utils/stringUtils";

import { HeaderAuth, Header } from '../../../services/header';
import { navigate } from '../../../navigation/NavigationService';

let registerState = state => state.registerReducer;
let loginState = state => state.loginReducer;

// Our worker Saga that logins the user
export default function* loginFromRegister() {
    // init state from reducer
    yield put(registerActions.setLoader(true, "loadingNext"))
    const state = yield select(registerState);
    const getLoginState = yield select(loginState);
    const emailTrimmed = trimString(getLoginState.emailForm);

    const paramLogin = {
        email: emailTrimmed,
        password: getLoginState.passwordForm,
    }
    const param = {
        subdistrict: state.userData.subdistrict,
        user_id: state.loginResponse.id,
        postal_code: state.userData.postalCode,
        detail: state.userData.detailAddress
    }
    try {
        // const _response = yield call(apiService.POST, 
        //     API.BASE_URL + API.ENDPOINT.REGISTER + "/address", 
        //     param, 
        //     Header());

        const [ sendAddress, login ] = yield all([
            call(apiService.POST,
                API.BASE_URL + API.ENDPOINT.REGISTER + "/address",
                param,
                Header()),
            call(apiService.POST, API.BASE_URL + API.ENDPOINT.LOGIN, paramLogin, Header()),
        ])

        if (sendAddress.status === 200) {
            // set token for async storage
            console.log(sendAddress.data, "REESSPONSE ----- ")
            if (login.status === 200) {
                yield put(loginActions.clearForm())
                yield put(loginActions.setToken(login.data.token))
                yield put(loginActions.onLoginResponse(login.data.user))
                yield put(registerActions.setClearValue())
                yield put(registerActions.setClearAddress())
                navigate("Home")
                yield put(registerActions.setLoader(false, "loadingNext"))
            } else {
                yield put(loginActions.loginFailed())
                setTimeout(() => {
                    Alert.alert('Keeponic Login', login.data.message);
                }, 200);
            }
        } else {
            yield put(registerActions.setLoader(false, "loadingNext"))
            setTimeout(() => {
                Alert.alert('Keeponic Login', "Registrasi Error");
            }, 200);
        }

        setTimeout(() => {
            console.log(sendAddress.data, "param for address")
        }, 5000)
    } catch (error) {
        yield put(registerActions.setLoader(false, "loadingNext"))
        setTimeout(() => {
            Alert.alert('Keeponic Login', error.message);
        }, 200);
    }
}
