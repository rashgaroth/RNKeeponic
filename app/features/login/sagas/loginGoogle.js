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
import * as loginActions from '../actions';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { HeaderAuth, Header } from '../../../services/header';

let loginState = state => state.loginReducer;

async function storeLoggedIn(data){
    try {
        await AsyncStorage.setItem('@userLoggedIn', data);
    } catch (error) {
        console.log('AsyncStorage error during token store:', error);
    }
}

// Our worker Saga that logins the user
export default function* loginGoogle(state) {
    // init state from reducer
    yield put(loginActions.enableLoader())
    const getLoginState = yield select(loginState);
    console.log(state)
    const param = {
        tokenId: state.data
    };
    if(param){
        try {
            const googleResponse = yield call(apiService.POST, API.BASE_URL + API.ENDPOINT.GOOGLE_LOGIN, param, Header());
            if(googleResponse.status === 200){
                console.log(googleResponse, "DATA RESPON")
                // yield AsyncStorage.setItem("@isLoggedIn", "true")
                // yield AsyncStorage.setItem("@token", googleResponse.data.token)
                // yield AsyncStorage.setItem("@userLoggedIn", "true")
                yield call(storeLoggedIn, "true")
                yield put(loginActions.clearForm())
                yield put(loginActions.setToken(googleResponse.data.token))
                yield put(loginActions.onSuccessGoogleAuth(googleResponse.data.user))
                yield put(loginActions.disableLoading())
            }else{
                yield put(loginActions.loginFailed())
                yield put(loginActions.disableLoading())
                setTimeout(() => {
                    Alert.alert('Keeponic Login', "Terjadi Kesalahan");
                }, 200);
            }
        } catch (error) {
            yield put(loginActions.disableLoading())
            setTimeout(() => {
                Alert.alert('Keeponic Login', error.message);
            }, 200);
        }
    }else{
        yield put(loginActions.disableLoading())
        setTimeout(() => {
            Alert.alert('Keeponic Login', "Tidak dapat melakukan login dengan Google");
        }, 200);
    }
}
