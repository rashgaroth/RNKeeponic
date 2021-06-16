/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import { put, select, call } from 'redux-saga/effects';

import API from '../../../api/ApiConstants';
import * as apiService from "../../../services/index";

import { Alert } from 'react-native';
// import loginUser from 'app/api/methods/loginUser';
import * as homeAction from '../actions';

import { HeaderAuth } from '../../../services/header';
// import { navigate } from "../../../navigation/NavigationService";

let loginState = state => state.loginReducer;

export default function* homeGetProfile(state) {
    // state home
    const getLoginState = yield select(loginState)
    const token = getLoginState.user.token

    try {
            if (token) {
                const _response = yield call(apiService.GET,
                    API.BASE_URL +
                    API.ENDPOINT.GET_PROFILE +
                    `/${state.userId}`,
                    HeaderAuth(token)
                )

                if (_response.data.error < 1) {
                    yield put(homeAction.hideLoading())
                    const address = _response.data.userAddress;
                    console.log(address[0] + ":", "address")
                    const userAddress = {
                        subdistrict: address[0],
                        city: address[1],
                        province: address[2]
                    }
                    if(address[0]){
                        yield put(homeAction.setIsUserAddress(true))
                    }else{
                        yield put(homeAction.setIsUserAddress(false))
                    }
                    yield put(homeAction.getUserProfileSuccess(_response.data.data, userAddress))
                } else {
                    console.log(_response);
                    yield put(homeAction.hideLoading())
                    setTimeout(() => {
                        Alert.alert('Keeponic', "Tidak dapat memuat data profile");
                    }, 200);
                }
        }else{
            yield put(homeAction.hideLoading())
        }
    } catch (error) {
        yield put(homeAction.hideLoading())
    }
}