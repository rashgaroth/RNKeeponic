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
import { getToken, setToken, storeData, getStore } from "../../../services/asyncStorage";
import { trimString } from "../../../utils/stringUtils";

import { HeaderAuth, Header } from '../../../services/header';

let loginState = state => state.homeReducer;

export default function* homeGetProducts(state){

    // state home
    const getHomeState = yield select(loginState)
    const token = yield getToken()

    try {
        yield put(homeAction.showLoading())
        if(token){
            console.log(token, "----TOKEN----")
            const _response = yield call(apiService.GET,
                API.BASE_URL +
                API.ENDPOINT.GET_PRODUCT + 
                `?user_id=${state.userId}&page=0&size=10`,
                HeaderAuth(token)
            )

            if(_response.data.error < 1){
                yield put(homeAction.hideLoading())
                const productData = _response.data.response.product
                var product = []

                for(let i in productData){
                    product.push(productData[i])
                }
                if(product){
                    yield put(homeAction.getProductSuccess(product))
                }
            }else{
                yield put(homeAction.hideLoading())
                setTimeout(() => {
                    Alert.alert('Keeponic', "Tidak bisa meload data");
                }, 200);
                console.log(_response.data, "----response")
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