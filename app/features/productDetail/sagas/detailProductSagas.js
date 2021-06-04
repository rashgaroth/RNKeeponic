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
    yield put(detailProductAction.clearProduct());
    const loginState = yield select(loginReducer);
    const productState = yield select(detailProductReducer);
    const token = loginState.user.token
    const userId = loginState.user.user_id

        console.log(state)
        try {
            const product_id = state.payload.product_id;

            const url = API.BASE_URL +
                API.ENDPOINT.GET_PRODUCT_DETAIL +
                `?id_product=${product_id}`;
                console.log(url)

            const urlFavorite = API.BASE_URL +
                API.ENDPOINT.WISHLIST+`/order_list/favorite/${userId}`;

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
                const payload = productDetail.data.data;
                const market = productDetail.data.market;
                const category = productDetail.data.category;
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
                if (productFavorite.status === 200) {
                    const productId = payload.id;
                    const favData: Array = productFavorite.data.data;

                    const isFavorite = favData.filter((v, i, a) => {
                        if(v.t_product_id){
                            if (v.t_product_id === productId){
                                return v.t_product_id === productId
                            }else{
                                return null
                            }
                        }else{
                            return null
                        }
                    });

                    if (isFavorite) {
                        yield put(detailProductAction.getProductLoves(isFavorite[0].is_favorite))
                    }else{
                        console.log("tidak ada favorite")
                    }

                } else {
                    setTimeout(() => {
                        Alert.alert('Keeponic', "Server Tidak Dapat Mengambil Disukai");
                    }, 200);
                }
            }else{
                setTimeout(() => {
                    Alert.alert('Keeponic', "Server Tidak Dapat Mengambil Data");
                }, 200);
            }
        } catch (error) {
            console.log(error)
            yield put(detailProductAction.hideLoading());
            setTimeout(() => {
                Alert.alert('Keeponic', "Error saat menerima data");
            }, 200);
        }
}
