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
export default function* registSagas() {
    const state = yield select(registerState)
    try {
        yield put(registerActions.setLoader(true, "loadingPassword"))
        yield put(registerActions.setLoader(true, "loadingNext"))
        console.log("---get address")
        const _response = yield call(
             apiService.GET,
             API.BASE_URL + API.ENDPOINT.REGISTER + "/getAddress", 
             Header());
             yield put(registerActions.setClearAddress())
        if(_response.status === 200){
            const { data } = _response.data;
            console.log(data.province);
            yield put(registerActions.getAddressSuccess(data.city, data.province, data.subdistrict))
            yield put(registerActions.setLoader(false, "loadingPassword"))
        }else{
            setTimeout(() => {
                Alert.alert('Keeponic Login', "Error Mengambil Data Alamat");
            }, 500);
        }
        yield put(registerActions.setLoader(false, "loadingPassword"))
        yield put(registerActions.setLoader(false, "loadingNext"))
    } catch (error) {
        yield put(registerActions.setLoader(false, "loadingPassword"))
        yield put(registerActions.setLoader(false, "loadingNext"))
        setTimeout(() => {
            Alert.alert('Keeponic Login', error.message);
        }, 200);
    }
}
