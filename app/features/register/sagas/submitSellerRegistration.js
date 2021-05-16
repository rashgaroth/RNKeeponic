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
import { getToken, setToken, storeData, removeToken, removeAllItems } from "../../../services/asyncStorage";
import { trimString } from "../../../utils/stringUtils";

import { HeaderAuth, Header } from '../../../services/header';
import { navigate } from '../../../navigation/NavigationService';

let registerState = state => state.registerReducer;
// Our worker Saga that logins the user

export default function* submitRegistration(payload) {
    const state = yield select(registerState)
    try {
        yield put(registerActions.setLoader(true, "loadingPassword"))
        const { userData } = state;
        const emailTrimmer = trimString(userData.email)
        const param = {
            email: emailTrimmer,
            password: userData.password,
        }

        const _response = yield call(
            apiService.POST,
            API.BASE_URL + API.ENDPOINT.SELLER_REGISTER,
            param,
            Header());

        if (_response.status === 200) {
            console.log(_response, "Response ... ")
            const { data } = _response.data;
            console.log(data, "DATA");
            yield put(registerActions.onSubmitRegistrationSuccess(data))
            yield put(registerActions.setLoader(false, "loadingPassword"))
            // yield put(registerActions.setClearValue())
            yield put(registerActions.setError(`Registrasi Berhasil!`, "Oke", true, "success", false))
            setTimeout(() => {
                navigate("RegisterVerification")
            }, 200);
        } else {
            console.log("EMAIL: ", _response.data);
            const data = _response.data;
            yield put(registerActions.setLoader(false, "loadingPassword"));
        }
        yield put(registerActions.setLoader(false, "loadingPassword"))
    } catch (error) {
        yield put(registerActions.setLoader(false, "loadingPassword"))
        setTimeout(() => {
            Alert.alert('Keeponic Login', error.message);
        }, 200);
    }
}