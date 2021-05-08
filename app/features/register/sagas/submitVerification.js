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

import { Header } from '../../../services/header';
import { navigate } from '../../../navigation/NavigationService';

let registerState = state => state.registerReducer;
// Our worker Saga that logins the user
export default function* submitRegistration(stateSagas) {
    const state = yield select(registerState)
    yield put(registerActions.setLoader(true, "loading"))
    try {
        const param = {
            registrant_id: state.registrantData.id,
            code:stateSagas.data
        }
        const _response = yield call(
            apiService.POST,
            API.BASE_URL + API.ENDPOINT.REGISTER + "/confirm",
            param,
            Header());
        if (_response.status === 200) {
            const { data } = _response.data;
            setTimeout(() => {
                console.log(param, "PARAM")
                console.log(_response.data, "PARAM")
            }, 5000);
            yield put(registerActions.onSuccessVerification(data))
            yield put(registerActions.setLoader(false, "loading"))
            navigate("RegisterNext")
        }else {
            setTimeout(() => {
                console.log(param, "PARAM")
                console.log(_response.data, "PARAM")
            }, 5000);
            yield put(registerActions.setLoader(false, "loading"))
            if(_response.data.msg.includes("code")){
                Alert.alert('Keeponic', `Kode Verifikasi Salah`);
            }
        }
    } catch (error) {
        console.log(error)
        yield put(registerActions.setLoader(false, "loading"))
    }
}
