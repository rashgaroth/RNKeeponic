/* Redux saga class
 * logins the user into the app
 * requires username and password.
 * un - username
 * pwd - password
 */
import { put, select, call, all } from 'redux-saga/effects';

import API from '../../../api/ApiConstants';
import * as apiService from "../../../services/index";

import { Alert } from 'react-native';
// import loginUser from 'app/api/methods/loginUser';
import * as detailProductAction from '../actions';

import { HeaderAuth } from '../../../services/header';

let loginReducer = state => state.loginReducer;
let detailProductReducer = state => state.detailProductReducer;

// Our worker Saga that logins the user
export default function* getProductDetail(state) {
    const loginState = yield select(loginReducer);
    console.log("mulai")
    // yield put(detailProductAction.clearProduct());
    const token = loginState.user.token
    const userId = loginState.user.user_id
    yield put(detailProductAction.showLoading());
        try {
            const product_id = state.payload.product_id;

            const url = API.BASE_URL +
                API.ENDPOINT.GET_PRODUCT_DETAIL +
                `?id_product=${product_id}`;
                console.log(url)

            const urlFavorite = API.BASE_URL +
                API.ENDPOINT.WISHLIST + `/order_list/favorite/${userId}/${product_id}`;

            const [productDetail, productFavorite] = yield all([
                call(
                    apiService.GET,
                    url,
                    HeaderAuth(token)),
                call(
                    apiService.GET,
                    urlFavorite,
                    HeaderAuth(token)
                )
            ]);
            if (productDetail.status === 200) {
                yield put(detailProductAction.hideLoading());
                const market = productDetail.data.market;
                const category = productDetail.data.category;
                const marketAddress = productDetail.data.marketAddressData;
                yield put(detailProductAction.setMarketOnReducer(market));
                yield put(detailProductAction.setCategory(category));
                yield put(detailProductAction.setMarketAddress(marketAddress));
            }else{
                setTimeout(() => {
                    Alert.alert('Tidak Ada Internet', "Server Tidak Dapat Mengambil Data");
                }, 200);
            }
            if (productFavorite.status === 200) {
                const isFavorite: Array = productFavorite.data.data;
                yield put(detailProductAction.getProductLoves(isFavorite))
            }
        } catch (error) {
            console.log(error)
            yield put(detailProductAction.hideLoading());
        }
}
