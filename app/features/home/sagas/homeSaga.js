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
import * as loginAction from "../../login/actions";

import { HeaderAuth } from '../../../services/header';

let loginState = state => state.loginReducer;

export default function* homeGetProducts(state){

    // state home
    const getLoginState = yield select(loginState)
    const token = getLoginState.user.token

    try {
        yield put(homeAction.showLoading())
        console.log(token, "----TOKEN----")
        yield put(homeAction.getProductSuccess('products', null))
        yield put(homeAction.getProductSuccess('mediaTanam', null))
        yield put(homeAction.getProductSuccess('greenHouse', null))
        yield put(homeAction.getProductSuccess('bibit', null))
        yield put(homeAction.getAllProducts(null))
        const productList = yield call(apiService.GET,
            API.BASE_URL +
            API.ENDPOINT.GET_PRODUCT +
            `?page=${state.page}&size=10`,
            HeaderAuth(token)
        );

        if (productList.data.error < 1) {
            yield put(homeAction.hideLoading())
            const productData = productList.data.response.product
            const mediaTanam = productList.data.pMediaTanam.product
            const greenHouse = productList.data.pGreenHouse.product
            const bibit = productList.data.pBibit.product
            yield put(homeAction.getProductSuccess('products', productData))
            yield put(homeAction.getProductSuccess('mediaTanam', mediaTanam))
            yield put(homeAction.getProductSuccess('greenHouse', greenHouse))
            yield put(homeAction.getProductSuccess('bibit', bibit))
            yield put(homeAction.getAllProducts(productData))
        } else {
            yield put(homeAction.hideLoading())
            setTimeout(() => {
                Alert.alert('Keeponic', "Tidak Dapat Memuat Data Produk :)");
            }, 200);
            yield put(loginAction.logOut())
        }
    } catch (error) {
        console.log(error)
        yield put(homeAction.hideLoading())
    }
}