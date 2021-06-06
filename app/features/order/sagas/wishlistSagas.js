import { all, takeEvery, put, select, call, fork } from 'redux-saga/effects';

import API from '../../../api/ApiConstants';
import * as apiService from "../../../services/index";

import { Alert } from 'react-native';
// import loginUser from 'app/api/methods/loginUser';
import * as orderActions from '../actions';
import * as types from '../types'

import { HeaderAuth } from '../../../services/header';
import { ICategory, IHome, IData, IMarket, IWishList, IProductWishList, IOrderState } from "../../interfaces";

const orderStorage = state => state.orderReducer;
const homeStorage = state => state.homeReducer;
const loginStorage = state => state.loginReducer;

function* getWishList(state) {

    const orderState = yield select(orderStorage)
    const homeState:IHome = yield select(homeStorage)
    const loginState = yield select(loginStorage)
    const token = loginState.user.token
    const userId = loginState.user.user_id
    yield put(orderActions.setLoading(true))
    try {
        const _fetchData = yield call(apiService.GET, API.BASE_URL + API.ENDPOINT.WISHLIST + `/order_list?user_id=${userId}`, HeaderAuth(token))
        if (_fetchData.status === 200 && _fetchData.data.error < 1) {
            const wishList: IWishList[] = _fetchData.data.data
            const productList: IProductWishList[] = _fetchData.data.product
            const marketList: IMarket[] = _fetchData.data.market
            const categoryList: ICategory[] = _fetchData.data.category
            // console.log(productList, "ARRAY2")
            // ======================================================== //
            let dataArr: IData[] = [];
            if (wishList && productList && marketList && categoryList) {
                const wishListFiltered = wishList.filter((v, i, a) => {
                    return v.status === 1
                })
                const wishListOrdered = wishList.filter((v, i, a) => {
                    return v.status === 4
                })
                const productListOrdered = productList.filter((v, i, a) => {
                    return wishList[i].t_product_id === a[i].id
                })
                const productListFiltered = productList.filter((v, i, a) => {
                    if (wishList[i].status === 1) {
                        return wishList[i].t_product_id === a[i].id
                    }
                })
                for (let i in wishListFiltered) {
                    let dataObj: IData = {}
                    dataObj.id = wishListFiltered[i].id
                    dataObj.product_id = wishListFiltered[i].t_product_id
                    dataObj.t_category_product_id = wishListFiltered[i].t_category_product_id
                    dataObj.quantity = wishListFiltered[i].quantity
                    dataObj.isFavorite = wishListFiltered[i].is_favorite
                    dataObj.owner_market_id = wishListFiltered[i].owner_market_id
                    dataObj.owner_market_subdistrict = wishListFiltered[i].owner_market_subdistrict
                    dataObj.owner_market_city = wishListFiltered[i].owner_market_city
                    dataObj.owner_market_subdistrict_name = wishListFiltered[i].owner_market_subdistrict_name
                    dataObj.owner_market_city_name = wishListFiltered[i].owner_market_city_name
                    // product
                    dataObj.productTitle = productListFiltered[i].name
                    dataObj.avatar = productListFiltered[i].avatar
                    dataObj.price = productListFiltered[i].price * wishListFiltered[i].quantity
                    // market
                    dataObj.marketName = marketList[i].market_name
                    dataObj.category = categoryList[i].name
                    dataObj.sec_market_id = wishListFiltered[i].sec_market_id
                    dataObj.address = homeState.userAddress.subdistrict ? homeState.userAddress.subdistrict : ""
                    yield put(orderActions.setWishlistData('cart', dataObj))
                }

                // for (let i in wishListOrdered) {
                //     let dataOrderObj: IData = {}
                //     dataOrderObj.id = wishListOrdered[i].id
                //     dataOrderObj.product_id = wishListOrdered[i].t_product_id
                //     dataOrderObj.t_category_product_id = wishListOrdered[i].t_category_product_id
                //     dataOrderObj.quantity = wishListOrdered[i].quantity
                //     dataOrderObj.isFavorite = wishListOrdered[i].is_favorite
                //     dataOrderObj.owner_market_id = wishListOrdered[i].owner_market_id
                //     dataOrderObj.owner_market_subdistrict = wishListOrdered[i].owner_market_subdistrict
                //     dataOrderObj.owner_market_city = wishListOrdered[i].owner_market_city
                //     dataOrderObj.owner_market_subdistrict_name = wishListOrdered[i].owner_market_subdistrict_name
                //     dataOrderObj.owner_market_city_name = wishListOrdered[i].owner_market_city_name
                //     // product
                //     dataOrderObj.productTitle = productListOrdered[i].name
                //     dataOrderObj.avatar = productListOrdered[i].avatar
                //     dataOrderObj.price = productListOrdered[i].price * wishListOrdered[i].quantity
                //     // market
                //     dataOrderObj.marketName = marketList[i].market_name
                //     dataOrderObj.category = categoryList[i].name
                //     dataOrderObj.sec_market_id = wishListOrdered[i].sec_market_id
                //     dataOrderObj.address = homeState.userAddress.subdistrict ? homeState.userAddress.subdistrict : ""
                //     console.log("sukses sampai sini")
                //     yield put(orderActions.setWishlistData('ordered', dataOrderObj))
                //     console.log("tidak masuk")
                // }

                if (dataArr.length < 1) {
                    yield put(orderActions.setEmpty(true))
                } else {
                    yield put(orderActions.setEmpty(false))
                }
                yield put(orderActions.setLoading(false))
            }
        }
    } catch (error) {
        yield put(orderActions.setLoading(false))
        console.log(error, "ERROR")
    }
}

function* updateWishlist(state) {
    const productId = state.productId
    const loginState = yield select(loginStorage)
    const token = loginState.user.token
    const userId = loginState.user.user_id

    const param = {
        user_id: userId,
        productId: productId
    }

    try {
        const _fetchData = yield call(apiService.POST, API.BASE_URL + API.ENDPOINT.WISHLIST + `/order_list/change`, param ,HeaderAuth(token))
        if (_fetchData.status === 200 && _fetchData.data.error < 1){
        }
    } catch (error) {
        console.log(error)
    }
}

function *getOrderedList(state) {
    const orderState = yield select(orderStorage)
    const loginState = yield select(loginStorage)
    const token = loginState.user.token
    const userId = loginState.user.user_id
    yield put(orderActions.setLoading(true))
    console.log(state, "state get ordered")
    if(state.status && state.status_between){
        try {
            const _fetchData = yield call(apiService.GET,
                API.BASE_URL +
                API.ENDPOINT.ORDER +
                `/get_order?shipment_status=${state.status}&between_status=${state.status_between}&user_id=${userId}`,
                HeaderAuth(token))
            if (_fetchData.status === 200 && _fetchData.data.error < 1) {
                yield put(orderActions.setLoading(false))
                const _data = _fetchData.data.data
                for (let i in _data) {
                    yield put(orderActions.setWishlistData('sended', _data[i]))
                }
            } else {
                yield put(orderActions.setLoading(false))
            }
        } catch (error) {
            console.log(error, "error get order")
        }
    }else{
        try {
            const _fetchData = yield call(apiService.GET,
                API.BASE_URL +
                API.ENDPOINT.ORDER +
                `/get_order?shipment_status=0&between_status=2&user_id=${userId}`,
                HeaderAuth(token))
            if (_fetchData.status === 200 && _fetchData.data.error < 1) {
                yield put(orderActions.setLoading(false))
                const _data = _fetchData.data.data
                for (let i in _data) {
                    yield put(orderActions.setWishlistData('ordered', _data[i]))
                }
            } else {
                yield put(orderActions.setLoading(false))
            }
        } catch (error) {
            console.log(error, "error get order")
        }
    }
}

function* getTracker(state) {
    const orderState: IOrderState = yield select(orderStorage)
    const loginState = yield select(loginStorage)
    const token = loginState.user.token
    const userId = loginState.user.user_id
    yield put(orderActions.setLoadingModal(true))
    console.log(state, "statenya")

    try {
        const _fetchData = yield call(apiService.GET,
            API.BASE_URL +
            API.ENDPOINT.TRACKING +
            `?kurir=jne&awb=${state.shipmentCode}`,
            HeaderAuth(token))
        if (_fetchData.status === 200) {
            console.log(_fetchData.data.data, "GETTTTT")
            const _data = _fetchData.data.data
            yield put(orderActions.getTrackingSuccess(_data))
            yield put(orderActions.setLoadingModal(false))
        } else {
            yield put(orderActions.setLoadingModal(false))
        }
    } catch (error) {
        console.log(error, "error get order")
    }
}

export function* getTrackerSagas() {
    yield takeEvery(types.GET_TRACKING, getTracker);
}

export function* getWishlistSagas() {
    yield takeEvery(types.GET_WISHLIST, getWishList);
}

export function* updateWishlistSagas() {
    yield takeEvery(types.UPDATE_STATUS_WISHLIST, updateWishlist)
}

export function* getOrderedListSagas(){
    yield takeEvery(types.GET_ORDERED_LIST, getOrderedList)
}

function* wishlistSagas() {
    yield all([
        fork(getWishlistSagas),
        fork(updateWishlistSagas),
        fork(getOrderedListSagas),
        fork(getTrackerSagas),
    ])
}

export default wishlistSagas;