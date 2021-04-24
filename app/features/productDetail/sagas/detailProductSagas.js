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
import { noImage } from "../constants";

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
            yield put(detailProductAction.clearProduct())

            const _response = yield call(
                apiService.GET,
                url,
                HeaderAuth(token))
            if (_response.status === 200) {
                yield put(detailProductAction.hideLoading());
                // yield put(detailProductAction.onSuccessGetDetail(_response.data.data))
                const payload = _response.data.data;
                let avatar = payload.avatar;
                let second_avatar = payload.second_avatar;
                let third_avatar = payload.third_avatar;
                let fourth_avatar = payload.fourth_avatar;

                if(second_avatar === ""){
                    second_avatar = noImage
                }
                if(third_avatar === ""){
                    third_avatar = noImage
                }
                if(fourth_avatar === ""){
                    fourth_avatar = noImage
                }

                const image = []
                image.push(avatar, second_avatar, third_avatar, fourth_avatar);

                yield put(detailProductAction.setProductOnReducer(payload, image))
                console.log("Sukses get produk");
                setTimeout(() => {
                    console.log(payload, "payload --- ");
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
