/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import { all, takeEvery, put, select, call, fork } from 'redux-saga/effects';

import API from '../../../api/ApiConstants';
import * as apiService from "../../../services/index";

import { Alert } from 'react-native';
// import loginUser from 'app/api/methods/loginUser';
import * as homeAction from '../actions';
import { getToken } from "../../../services/asyncStorage";

import { HeaderApiKey } from '../../../services/header';
// import { navigate } from "../../../navigation/NavigationService";
import { sha256 } from 'react-native-sha256';

let homeState = state => state.homeReducer;
let loginState = state => state.loginReducer;

export default function* homeGetProfile(state) {

    // state home
    const getHomeState = yield select(homeState)
    const getLoginState = yield select(loginState)
    const token = getLoginState.user.token

    try {
        yield put(homeAction.showLoading())
        console.log(getLoginState.isUserRegistered)
        if(getLoginState.isUserRegistered){
            if (token) {
                let sha;
                const apiKey = `${state.userId}%${token}%${state.key}`;

                sha256(apiKey).then((data) => {
                    sha = data
                }).catch((err) => {
                    setTimeout(() => {
                        Alert.alert('Keeponic', err);
                    }, 200);
                })

                const _response = yield call(apiService.GET,
                    API.BASE_URL +
                    API.ENDPOINT.GET_PROFILE +
                    `/${state.userId}`,
                    HeaderApiKey(token, sha)
                )

                if (_response.data.error < 1) {
                    const address = _response.data.userAddress;
                    console.log(address[0] + ":", "address")
                    const userAddress = {
                        subdistrict: address[0],
                        city: address[1],
                        province: address[2]
                    }
                    yield put(homeAction.getUserProfileSuccess(_response.data.data, userAddress))
                    setTimeout(() => {
                        console.log(getHomeState.userAddress, ": Address");
                    }, 5000);
                } else {
                    yield put(homeAction.hideLoading())
                    // yield put(loginAction.logOut())
                    console.log(_response);
                    setTimeout(() => {
                        Alert.alert('Keeponic', "Tidak dapat memuat data profile");
                    }, 200);
                }

            } else {
                yield put(homeAction.hideLoading())
                setTimeout(() => {
                    Alert.alert('Keeponic', "Tidak dapat mengambil data profile");
                }, 200);
            }
        }else{
            yield put(homeAction.hideLoading())
        }
    } catch (error) {
        yield put(homeAction.hideLoading())
        console.log("INI CATCH", error.message)
    }
}