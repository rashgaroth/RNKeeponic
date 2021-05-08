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
import * as detailProductAction from '../actions';

import { HeaderAuth } from '../../../services/header';

let loginReducer = state => state.loginReducer;

// Our worker Saga that logins the user
export default function* getProductDetail(state) {
    yield put(detailProductAction.clearProduct())
    const loginState = yield select(loginReducer);
    const token = loginState.user.token
    if(token){
        try {
            const product_id = state.payload.product_id;
            const user_id = state.payload.user_id;
            const url = API.BASE_URL +
                API.ENDPOINT.GET_PRODUCT_DETAIL +
                `?user_id=${user_id}&id_product=${product_id}`
            console.log("beres url")
            const _response = yield call(
                apiService.GET,
                url,
                HeaderAuth(token))
            if (_response.status === 200) {
                // yield put(detailProductAction.onSuccessGetDetail(_response.data.data))
                const payload = _response.data.data;
                const market = _response.data.market[0];
                console.log("success")
                let avatar = payload.avatar;
                let second_avatar = payload.second_avatar;
                let third_avatar = payload.third_avatar;
                let fourth_avatar = payload.fourth_avatar;
                const image = []
                // if (second_avatar === "" && third_avatar === "" && fourth_avatar === ""){
                //     image.push(avatar);
                // }
                // if (second_avatar =! "") {
                //     image.push(avatar, second_avatar);
                // }
                // if(third_avatar =! ""){
                //     image.push(third_avatar, avatar)
                // }
                // if(fourth_avatar =! ""){
                //     image.push(fourth_avatar, avatar)
                // }
                console.log("pushing image")
                image.push(avatar)
                console.log("selesai")
                console.log("------------------------------------")
                yield put(detailProductAction.setProductOnReducer(payload, image));
                yield put(detailProductAction.setMarketOnReducer(market));
                yield put(detailProductAction.hideLoading());
            }
        } catch (error) {
            yield put(detailProductAction.hideLoading());
            setTimeout(() => {
                Alert.alert('Keeponic', "Error saat menerima data");
            }, 200);
        }
    }else{
        yield put(detailProductAction.hideLoading());
        setTimeout(() => {
            Alert.alert('Keeponic', "Token Tidak Tersedia");
        }, 200);
    }

}
