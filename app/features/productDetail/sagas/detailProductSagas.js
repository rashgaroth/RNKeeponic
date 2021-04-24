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
import * as detailProductAction from '../actions';

import { HeaderAuth, Header } from '../../../services/header';
import { getToken } from '../../../services/asyncStorage';

let detailState = state => state.detailProductReducer;

// Our worker Saga that logins the user
export default function* getProductDetail(state) {
    yield put( detailProductAction.showLoading() )
    const stateDetail = yield select(detailState);
    const token = yield getToken();
    const product_id = state.payload.product_id;
    const user_id = state.payload.user_id;
    const url = API.BASE_URL +
        API.ENDPOINT.GET_PRODUCT_DETAIL +
        `?user_id=${user_id}&id_product=${product_id}`
    console.log(product_id, "WELCOME SAGA!_product");
    console.log(user_id, "WELCOME SAGA!_user");
    if(token){
        try {

            if(stateDetail){
                yield put(detailProductAction.clearProduct())
            }

            const _response = yield call(
                apiService.GET,
                url,
                HeaderAuth(token))
            if (_response.status === 200) {
                yield put(detailProductAction.hideLoading());
                yield put(detailProductAction.onSuccessGetDetail(_response.data.data))
                console.log("Sukses get produk");
                setTimeout(() => {
                    console.log(stateDetail);
                }, 1000);
            }
        } catch (error) {
            console.log(error, "ERRORNYA")
            setTimeout(() => {
                Alert.alert('Keeponic', "Error saat menerima data");
            }, 200);
        }
    }else{
        setTimeout(() => {
            Alert.alert('Keeponic', "Token Tidak Tersedia");
        }, 200);
    }

}
