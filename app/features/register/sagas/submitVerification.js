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

let registerState = state => state.registerReducer;
// Our worker Saga that logins the user
export default function* submitRegistration() {
    const state = yield select(registerState)
    try {
        const _response = yield call(
            apiService.GET,
            API.BASE_URL + API.ENDPOINT.REGISTER + "/getAddress",
            Header());
        if (_response.status === 200) {
            const { data } = _response.data;
            yield put(registerActions.getAddressSuccess(data.city, data.province, data.subdistrict))
        }
        setTimeout(() => {
            console.log(state.address)
        }, 5000);
    } catch (error) {
        setTimeout(() => {
            Alert.alert('Keeponic Login', error.message);
        }, 200);
    }
}
