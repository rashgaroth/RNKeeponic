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
import * as loginAction from "../../login/actions";
import * as productDetailAction from "../../productDetail/actions";

import { HeaderAuth } from '../../../services/header';
import { ICategory, IHome, IData, IMarket, IWishList, IProductWishList, IProductDetail } from "../../interfaces";

let homeState = state => state.homeReducer;
let loginState = state => state.loginReducer;

export default function* homeGetProducts(state){

    // state home
    const getHomeState:IHome = yield select(homeState)
    const getLoginState = yield select(loginState)
    const token = getLoginState.user.token
    const userId = getLoginState.user.user_id

    try {
        yield put(homeAction.showLoading())
        // if(token){
        console.log(token, "----TOKEN----")
        const products = getHomeState.products;
        if (products) {
            const length = products.length;
            for (let i = length; i > 0; i--) {
                products.pop();
            }
        }

        const [productList, allProduct] = yield all([
            call(apiService.GET,
                API.BASE_URL +
                API.ENDPOINT.GET_PRODUCT +
                `?page=${state.page}&size=10`,
                HeaderAuth(token)
            ),
            call(apiService.GET,
                API.BASE_URL +
                API.ENDPOINT.GET_PRODUCT,
                HeaderAuth(token)
            ),
        ])
        if (productList.data.error < 1) {
            const productData = productList.data.response.product
            const mediaTanam = productList.data.pMediaTanam.product
            const greenHouse = productList.data.pGreenHouse.product
            const bibit = productList.data.pBibit.product
            yield put(homeAction.getProductSuccess('products', productData))
            yield put(homeAction.getProductSuccess('mediaTanam', mediaTanam))
            yield put(homeAction.getProductSuccess('greenHouse', greenHouse))
            yield put(homeAction.getProductSuccess('bibit', bibit))
            if (allProduct.data.error < 1) {
                const productAll = allProduct.data.response.product
                yield put(homeAction.getAllProducts(productAll))
                yield put(homeAction.hideLoading())
            } else {
                yield put(homeAction.hideLoading())
            }
        } else {
            yield put(homeAction.hideLoading())
            // yield put(loginAction.logOut())
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