import { all, takeEvery, put, select, call, fork } from 'redux-saga/effects';

import API from '../../../api/ApiConstants';
import * as apiService from "../../../services/index";

import { Alert } from 'react-native';
// import loginUser from 'app/api/methods/loginUser';
import * as types from '../types'
import * as homeAction from '../actions';

import { HeaderAuth } from '../../../services/header';
import { ICategory, IHome, IData, IMarket, IWishList, IProductWishList, IOrderState } from "../../interfaces";

const orderStorage = state => state.orderReducer;
const homeStorage = state => state.homeReducer;
const loginStorage = state => state.loginReducer;

function* getHotProducts(state) {
    const homeState: IHome = yield select(homeStorage)
    const loginState = yield select(loginStorage)
    const token = loginState.user.token
    const userId = loginState.user.user_id
    try {
        const page = state.data.page;
        const size = state.data.size;
        const _fetchData = yield call(apiService.GET, API.BASE_URL + API.ENDPOINT.GET_PRODUCT + `/findAll?page=0&size=10`, HeaderAuth(token))
        if (_fetchData.status === 200 && _fetchData.data.error < 1) {
            const data = _fetchData.data.response.product;
            yield put(homeAction.onSuccessGetHot(data));
        }
    } catch (error) {
        console.log(error, "ERROR")
    }
}

function* getMediaTanam(state) {
    const loginState = yield select(loginStorage)
    const token = loginState.user.token
    try {
        const _fetchData = yield call(apiService.GET, API.BASE_URL + API.ENDPOINT.GET_PRODUCT + "/category/1?page=0&size=10", HeaderAuth(token))
        if (_fetchData.status === 200 && _fetchData.data.error < 1) {
            const data = _fetchData.data.response.product;
            // console.log(data, "DATA ----- ")
            yield put(homeAction.onSuccessGetMediaTanam(data))
        }
    } catch (error) {
        console.log(error, "ERROR")
    }
}

function* getGreenHouse(state) {
    const loginState = yield select(loginStorage)
    const token = loginState.user.token
    try {
        const _fetchData = yield call(apiService.GET, API.BASE_URL + API.ENDPOINT.GET_PRODUCT + "/category/2?page=0&size=10", HeaderAuth(token))
        if (_fetchData.status === 200 && _fetchData.data.error < 1) {
            const data = _fetchData.data.response.product;
            // console.log(data, "DATA ----- ")
            yield put(homeAction.onSuccessGetGreenHouse(data))
        }
    } catch (error) {
        console.log(error, "ERROR")
    }
}

function* getBibit(state) {
    const loginState = yield select(loginStorage)
    const token = loginState.user.token
    try {
        const _fetchData = yield call(apiService.GET, API.BASE_URL + API.ENDPOINT.GET_PRODUCT + "/category/3?page=0&size=10", HeaderAuth(token))
        if (_fetchData.status === 200 && _fetchData.data.error < 1) {
            const data = _fetchData.data.response.product;
            // console.log(data, "DATA BIBIT ----- ")
            yield put(homeAction.onSuccessGetBibit(data))
        }
    } catch (error) {
        console.log(error, "ERROR")
    }
}

function* getAllProducts(state) {
    const loginState = yield select(loginStorage)
    const homeState:IHome = yield select(homeStorage)
    const token = loginState.user.token
    try {
        const page = homeState.category.page;
        const size = homeState.category.size;
        console.log(page, "PAGE")
        const _fetchData = yield call(apiService.GET, API.BASE_URL + API.ENDPOINT.GET_PRODUCT + `/findAll?page=${page}&size=${size}`, HeaderAuth(token))
        if (_fetchData.status === 200 && _fetchData.data.error < 1) {
            yield put(homeAction.setPagination("loadingCategory", false))
            const data = _fetchData.data.response.product;
            for(let i in data){
                yield put(homeAction.onSuccessGetAllProducts(data[i]))
            }
        }
    } catch (error) {
        console.log(error, "ERROR")
    }
}

export function* getHotProductsSagas() {
    yield takeEvery(types.CATEGORY_GET_HOT_PRODUCTS, getHotProducts);
}

export function* getMediaTanamSagas() {
    yield takeEvery(types.CATEGORY_GET_MEDIA_TANAM, getMediaTanam);
}

export function* getGreenHouseSagas() {
    yield takeEvery(types.CATEGORY_GET_GREEN_HOUSE, getGreenHouse);
}

export function* getBibitSagas() {
    yield takeEvery(types.CATEGORY_GET_BIBIT, getBibit);
}

export function* getAllProductsSagas() {
    yield takeEvery(types.CATEGORY_GET_ALL_PRODUCTS, getAllProducts);
}

function* categoryProducts() {
    yield all([
        fork(getHotProductsSagas),
        fork(getMediaTanamSagas),
        fork(getGreenHouseSagas),
        fork(getBibitSagas),
        fork(getAllProductsSagas),
    ])
}

export default categoryProducts;