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
import { getToken, setToken, storeData, removeToken, removeAllItems } from "../../../services/asyncStorage";
import { trimString } from "../../../utils/stringUtils";

import { HeaderAuth, Header } from '../../../services/header';
import { navigate } from '../../../navigation/NavigationService';

let loginState = state => state.loginReducer;

// Our worker Saga that logins the user
export default function* loginGoogle(state) {
    // init state from reducer
    yield put(loginActions.enableLoader())
    const getLoginState = yield select(loginState);
    console.log(state)
    const param = {
        tokenId: state.data
    };
    console.log(param, "PARAMSS")
    if(param){
        try {
            const googleResponse = yield call(apiService.POST, API.BASE_URL + API.ENDPOINT.GOOGLE_LOGIN, param, Header());
            if(googleResponse.status === 200){
                const { user } = googleResponse.data
                yield setToken(googleResponse.data.token)
                yield storeData("email", user.email)
                yield storeData("is_email_validated", user.is_email_validated)
                yield storeData("name", user.name)
                yield storeData("user_id", user.user_id)

                // getStore("user_id").then((value) => (
                //   console.log(value, "-----------VALUE---------------")
                // )).catch((e) => console.log(e))

                yield put(loginActions.clearForm())
                yield put(loginActions.setToken(googleResponse.data.token))
                yield put(loginActions.onLoginResponse(googleResponse.data.user))
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
