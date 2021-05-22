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
    // if(token){
        console.log(state)
        try {
            const product_id = state.payload.product_id;
            // const user_id = state.payload.user_id;
            const url = API.BASE_URL +
                API.ENDPOINT.GET_PRODUCT_DETAIL +
                `?id_product=${product_id}`
            console.log("beres url")
            const _response = yield call(
                apiService.GET,
                url,
                HeaderAuth(token))
            if (_response.status === 200) {
                const payload = _response.data.data;
                const market = _response.data.market;
                const category = _response.data.category;
                let avatar = payload.avatar;
                let second_avatar = payload.second_avatar;
                let third_avatar = payload.third_avatar;
                let fourth_avatar = payload.fourth_avatar;
                const image = []
                image.push(avatar)
                if(second_avatar){
                    image.push(second_avatar)
                }
                if(third_avatar){
                    image.push(third_avatar)
                }
                if(fourth_avatar){
                    image.push(fourth_avatar)
                }
                yield put(detailProductAction.setProductOnReducer(payload, image));
                yield put(detailProductAction.setMarketOnReducer(market));
                yield put(detailProductAction.setCategory(category));
                yield put(detailProductAction.hideLoading());
            }
        } catch (error) {
            console.log(error)
            yield put(detailProductAction.hideLoading());
            setTimeout(() => {
                Alert.alert('Keeponic', "Error saat menerima data");
            }, 200);
        }
}
