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
import * as logger from "../../../utils/logging";

let homeState = state => state.homeReducer;
let loginState = state => state.loginReducer;

export default function* homeGetProducts(state){

    // state home
    const getHomeState = yield select(homeState)
    const getLoginState = yield select(loginState)
    const token = getLoginState.user.token

    try {
        yield put(homeAction.showLoading())
        // if(token){
            console.log(token, "----TOKEN----")
            const products = getHomeState.products;
            if(products){
                const length = products.length;
                for(let i = length; i>0; i--){
                    products.pop();
                }
            }

            const [productList, allProduct] = yield all([
                call(apiService.GET,
                    API.BASE_URL +
                    API.ENDPOINT.GET_PRODUCT +
                    `?page=${state.page}&size=5`,
                    HeaderAuth(token)
                ),
                call(apiService.GET,
                    API.BASE_URL +
                    API.ENDPOINT.GET_PRODUCT,
                    HeaderAuth(token)
                )
            ])

            if(productList.data.error < 1){
                const productData = productList.data.response.product
                yield put(homeAction.getProductSuccess(productData))
                if(allProduct.data.error < 1){
                    const productAll = allProduct.data.response.product
                    yield put(homeAction.getAllProducts(productAll))
                    yield put(homeAction.hideLoading())
                }else{
                    yield put(homeAction.hideLoading())
                }
            }else{
                yield put(homeAction.hideLoading())
                // yield put(loginAction.logOut())
                setTimeout(() => {
                    Alert.alert('Keeponic', "Tidak Dapat Memuat Data Produk :)");
                }, 200);
                yield put(loginAction.logOut())
            }
        // }else{
        //     yield put(homeAction.hideLoading())
        //     setTimeout(() => {
        //         Alert.alert('Keeponic', "Sesi anda sudah habis, silahkan Login kembali :)");
        //     }, 200);
        //     yield put(loginAction.logOut())
        // }
    } catch (error) {
        yield put(homeAction.hideLoading())
        console.log("INI CATCH", error.message)
    }

}