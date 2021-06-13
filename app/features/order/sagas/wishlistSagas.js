import { all, takeEvery, put, select, call, fork } from 'redux-saga/effects';

import API from '../../../api/ApiConstants';
import * as apiService from "../../../services/index";

import { Alert } from 'react-native';
// import loginUser from 'app/api/methods/loginUser';
import * as orderActions from '../actions';
import * as types from '../types'
import * as homeAction from '../../home/actions';

import { HeaderAuth } from '../../../services/header';
import { ICategory, IHome, IData, IMarket, IWishList, IProductWishList, IOrderState } from "../../interfaces";

const orderStorage = state => state.orderReducer;
const homeStorage = state => state.homeReducer;
const loginStorage = state => state.loginReducer;

function* getWishList(state) {
    const homeState:IHome = yield select(homeStorage)
    const loginState = yield select(loginStorage)
    const token = loginState.user.token
    const userId = loginState.user.user_id
    yield put(orderActions.setLoading(true))
    try {
        const _fetchData = yield call(apiService.GET, API.BASE_URL + API.ENDPOINT.WISHLIST + `/order_list/${userId}`, HeaderAuth(token))
        if (_fetchData.status === 200 && _fetchData.data.error < 1) {
            yield put(orderActions.setLoading(false))
            const _wishlist = _fetchData.data.data;
            for(let i in _wishlist) {
                yield put(orderActions.setWishlistData('cart', _wishlist[i]))
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
                API.ENDPOINT.ORDER_BETWEEN +
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
                yield put(homeAction.hideLoading())
            }
        } catch (error) {
            yield put(homeAction.hideLoading())
            yield put(orderActions.setLoading(false))
            console.log(error, "error get order")
        }
    }else{
        try {
            yield put(orderActions.setLoading(true))
            const _fetchData = yield call(apiService.GET,
                API.BASE_URL +
                API.ENDPOINT.ORDER_BETWEEN +
                `/get_order?shipment_status=0&between_status=2&user_id=${userId}`,
                HeaderAuth(token))
            if (_fetchData.status === 200 && _fetchData.data.error < 1) {
                yield put(orderActions.setLoading(false))
                const _data = _fetchData.data.data
                for (let i in _data) {
                    yield put(orderActions.setWishlistData('ordered', _data[i]))
                }
            } else {
                yield put(homeAction.hideLoading())
                yield put(orderActions.setLoading(false))
            }
        } catch (error) {
            yield put(homeAction.hideLoading())
            yield put(orderActions.setLoading(false))
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

function* postRating(state) {
    const orderState: IOrderState = yield select(orderStorage)
    const loginState = yield select(loginStorage)
    const token = loginState.user.token
    const userId = loginState.user.user_id
    yield put(orderActions.setLoadingModal(true))
    console.log(state, "statenya")
    const param = {
        rating: state.rating,
        userId: userId,
        invoiceId: state.invoice
    }
    try {
        console.log(param, "param")
        const _fetchData = yield call(apiService.POST,
            API.BASE_URL +
            API.ENDPOINT.GET_PRODUCT + "/rating",
            param,
            HeaderAuth(token))
        if (_fetchData.status === 200) {
            console.log(_fetchData.data.data, "GETTTTT")
            const _data = _fetchData.data.data
            console.log(_data, "data")
            yield put(orderActions.getOrderedList(3, 4))
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

export function* postRatingSagas() {
    yield takeEvery(types.POST_RATINGS, postRating)
}

function* wishlistSagas() {
    yield all([
        fork(getWishlistSagas),
        fork(updateWishlistSagas),
        fork(getOrderedListSagas),
        fork(getTrackerSagas),
        fork(postRatingSagas),
    ])
}

export default wishlistSagas;