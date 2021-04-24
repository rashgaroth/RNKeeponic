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
import * as homeAction from '../actions';
import * as loginAction from "../../login/actions";
import { getToken, setToken, storeData, getStore } from "../../../services/asyncStorage";
import { trimString } from "../../../utils/stringUtils";

import { HeaderAuth, Header } from '../../../services/header';
import { navigate } from "../../../navigation/NavigationService";

let loginState = state => state.homeReducer;

export default function* homeGetProducts(state){

    // state home
    const getHomeState = yield select(loginState)
    const token = yield getToken()

    try {
        yield put(homeAction.showLoading())
        if(token){
            console.log(token, "----TOKEN----")
            const products = getHomeState.products;
            if(products.length){
                const length = products.length;
                for(let i = length; i>0; i--){
                    products.pop();
                }
            }

            const _response = yield call(apiService.GET,
                API.BASE_URL +
                API.ENDPOINT.GET_PRODUCT +
                `?user_id=${state.userId}&page=0&size=5`,
                HeaderAuth(token)
            )

            if(_response.data.error < 1){
                const productData = _response.data.response.product
                yield put(homeAction.getProductSuccess(productData))
                yield put(homeAction.hideLoading())
            }else{
                yield put(homeAction.hideLoading())
                // yield put(loginAction.logOut())
                console.log(_response);
                setTimeout(() => {
                    Alert.alert('Keeponic', "Sesi Sudah Habis, Silahkan Login Kembali :)");
                }, 200);
            }

        }else{
            yield put(homeAction.hideLoading())
            setTimeout(() => {
                Alert.alert('Keeponic', "Sesi anda sudah habis, silahkan Login kembali :)");
            }, 200);
        }
    } catch (error) {
        yield put(homeAction.hideLoading())
        console.log("INI CATCH", error.message)
    }

}